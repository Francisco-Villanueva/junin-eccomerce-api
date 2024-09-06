import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAuthResponse, IPayloadToken } from './interface/auth.interface';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schema/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(user: CreateUserDTO) {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${user.email} already exists`,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    const data: CreateUserDTO = {
      ...user,
      password: hashPassword,
    };

    return await this.userService.createUser(data);
  }
  public async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) return user;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
  }): string {
    return jwt.sign(payload, secret, { noTimestamp: true });
  }

  public async generateJWT(user: User): Promise<IAuthResponse> {
    const getUser = await this.userService.getById(user.id);

    const payload: IPayloadToken = {
      id: getUser.id,
      name: getUser.name,
      email: getUser.email,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
      }),
      user: payload,
    };
  }

  public async me(token: string) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }

  async getTenantFromHeaders(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const { tenantName } = payload;

      if (!tenantName) {
        throw new NotFoundException('Tenant does not exist');
      }
      return tenantName;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

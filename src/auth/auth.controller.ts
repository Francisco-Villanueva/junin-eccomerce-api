import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDTO, MeDTO } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginAuthDto) {
    const { email, password } = data;
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new UnauthorizedException('Invalid Credenteials!');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return {
      user: jwt.user,
      backendTokens: {
        accessToken: jwt.accessToken,
      },
    };
  }
  @Post('register')
  async register(@Body() user: CreateUserDTO) {
    try {
      const newUser = this.authService.register(user);

      return newUser;
    } catch (error) {
      return error;
    }
  }
  @Post('me')
  me(@Body() { token }: MeDTO) {
    return this.authService.me(token);
  }
}

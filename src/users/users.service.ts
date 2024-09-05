import { Injectable, Inject } from '@nestjs/common';

import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { USER_REPOSITORY } from 'src/database/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userModel: typeof User,
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    return await this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getById(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { id } });
  }

  // Otros métodos según necesidad
}

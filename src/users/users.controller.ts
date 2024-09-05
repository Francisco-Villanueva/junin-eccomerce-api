import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, CreateUserSchema } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDTO) {
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errors: parsed.error.errors,
      };
    }

    parsed.data;
    const user = await this.usersService.createUser(body);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  // Otros endpoints según necesidad
}

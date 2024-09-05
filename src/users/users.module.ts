import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './schema/user.schema';
import { userProvider } from './user.provider';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersService, ...userProvider, JwtService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}

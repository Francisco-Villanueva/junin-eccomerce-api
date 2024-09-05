import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { userProvider } from 'src/users/user.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, ...userProvider],
})
export class AuthModule {}

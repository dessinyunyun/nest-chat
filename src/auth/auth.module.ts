import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt-config';
import { LocalStrategy } from './local.strategy';
import { JwtStategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register(jwtConfig), PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStategy],
  exports: [AuthService],
})
export class AuthModule {}

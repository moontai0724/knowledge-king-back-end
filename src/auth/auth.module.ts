import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModelModule } from '../models/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessStrategy, RefreshStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { ResetPasswordStrategy } from './local/reset-password.strategy';

@Module({
  imports: [UserModelModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessStrategy,
    RefreshStrategy,
    ResetPasswordStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

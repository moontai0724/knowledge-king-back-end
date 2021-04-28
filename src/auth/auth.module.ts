import { Module } from '@nestjs/common';
import { UserModelModule } from '../models/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModelModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

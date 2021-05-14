import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { UserModelModule } from '../../models/user/user.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserModelModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}

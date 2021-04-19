import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { UserModelService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [UserModelService],
  exports: [UserModelService],
})
export class UserModelModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModelModule } from '../user/user.module';
import { HistorySchema } from './history.schema';
import { HistoryModelService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySchema]), UserModelModule],
  providers: [HistoryModelService],
  exports: [HistoryModelService],
})
export class HistoryModelModule {}

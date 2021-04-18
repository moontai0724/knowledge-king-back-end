import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryDetailSchema } from './history-detail.schema';
import { HistoryDetailModelService } from './history-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryDetailSchema])],
  providers: [HistoryDetailModelService],
})
export class HistoryDetailModelModule {}

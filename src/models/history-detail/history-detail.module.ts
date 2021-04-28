import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModelModule } from '../history/history.module';
import { QuestionModelModule } from '../question/question.module';
import { HistoryDetailSchema } from './history-detail.schema';
import { HistoryDetailModelService } from './history-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryDetailSchema]),
    HistoryModelModule,
    QuestionModelModule,
  ],
  providers: [HistoryDetailModelService],
  exports: [HistoryDetailModelService],
})
export class HistoryDetailModelModule {}

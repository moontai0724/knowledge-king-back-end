import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorySchema } from './history.schema';
import { HistoryModelService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySchema])],
  providers: [HistoryModelService],
  exports: [HistoryModelService],
})
export class HistoryModelModule {}

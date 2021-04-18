import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionSchema } from './question.schema';
import { QuestionModelService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionSchema])],
  providers: [QuestionModelService],
})
export class QuestionModelModule {}

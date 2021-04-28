import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModelModule } from '../topic/topic.module';
import { UserModelModule } from '../user/user.module';
import { QuestionSchema } from './question.schema';
import { QuestionModelService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionSchema]),
    UserModelModule,
    TopicModelModule,
  ],
  providers: [QuestionModelService],
  exports: [QuestionModelService],
})
export class QuestionModelModule {}

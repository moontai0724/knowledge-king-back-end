import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModelModule } from '../group/group.module';
import { TopicSchema } from './topic.schema';
import { TopicModelService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicSchema]), GroupModelModule],
  providers: [TopicModelService],
  exports: [TopicModelService],
})
export class TopicModelModule {}

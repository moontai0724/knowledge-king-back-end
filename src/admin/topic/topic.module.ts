import { Module } from '@nestjs/common';
import { GroupModelModule } from 'src/models/group/group.module';
import { TopicModelModule } from 'src/models/topic/topic.module';
import { TopicController } from './topic.controller';

@Module({
  imports: [TopicModelModule, GroupModelModule],
  controllers: [TopicController],
})
export class TopicModule {}

import { Module } from '@nestjs/common';
import { GroupModelModule } from '../../models/group/group.module';
import { TopicModelModule } from '../../models/topic/topic.module';
import { TopicController } from './topic.controller';

@Module({
  imports: [TopicModelModule, GroupModelModule],
  controllers: [TopicController],
})
export class TopicModule {}

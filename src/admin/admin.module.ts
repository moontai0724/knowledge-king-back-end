import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [GroupModule, TopicModule],
})
export class AdminModule {}

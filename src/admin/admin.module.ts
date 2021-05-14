import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GroupModule, TopicModule, UserModule],
})
export class AdminModule {}

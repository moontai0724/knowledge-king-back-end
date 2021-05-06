import { Module } from '@nestjs/common';
import { GroupModelModule } from '../../models/group/group.module';
import { GroupController } from './group.controller';

@Module({
  imports: [GroupModelModule],
  controllers: [GroupController],
})
export class GroupModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSchema } from './group.schema';
import { GroupModelService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupSchema])],
  providers: [GroupModelService],
  exports: [GroupModelService],
})
export class GroupModelModule {}

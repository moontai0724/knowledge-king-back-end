import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicSchema } from './topic.schema';
import { TopicModelService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicSchema])],
  providers: [TopicModelService],
  exports: [TopicModelService],
})
export class TopicModelModule {}

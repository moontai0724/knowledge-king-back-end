import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Topic } from '../../models/topic/topic.entity';

export class CreateTopicDto extends PickType(Topic, ['title'] as const) {
  @IsNumber()
  @Type(() => Number)
  group_id: number;
}

export class PatchTopicDto extends PartialType(CreateTopicDto) {}

import { PickType } from '@nestjs/mapped-types';
import { Topic } from './topic.entity';

export class FindOneTopicParam extends PickType(Topic, ['id'] as const) {}

import { PickType } from '@nestjs/mapped-types';
import { Group } from './group.entity';

export class FindOneGroupParam extends PickType(Group, ['id'] as const) {}

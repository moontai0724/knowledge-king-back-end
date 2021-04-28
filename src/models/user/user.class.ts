import { PartialType, PickType } from '@nestjs/mapped-types';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

export class SearchOneUserParam extends PartialType(
  PickType(User, ['id', 'email', 'account'] as const),
) {}

export class CreateUserParam extends PickType(User, [
  'name',
  'email',
  'account',
  'password',
  'profile_photo',
  'permission',
] as const) {
  constructor(partial: Partial<CreateUserParam>) {
    super(partial);
    Object.assign(this, plainToClass(CreateUserParam, partial));
  }
}

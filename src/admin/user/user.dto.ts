import { OmitType } from '@nestjs/mapped-types';
import { CreateUserParam, UpdateUserParam } from '../../models/user/user.class';

export class CreateUserDto extends OmitType(CreateUserParam, [
  'profile_photo' as const,
]) {}

export class UpdateUserDto extends OmitType(UpdateUserParam, [
  'profile_photo' as const,
]) {}

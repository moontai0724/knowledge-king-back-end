import { OmitType } from '@nestjs/swagger';
import { CreateUserParam } from '../models/user/user.class';

export class RegisterDto extends OmitType(CreateUserParam, [
  'permission',
  'profile_photo',
] as const) {}

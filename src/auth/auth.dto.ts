import { PickType } from '@nestjs/swagger';
import { CreateUserParam } from '../models/user/user.class';

export class RegisterDto extends PickType(CreateUserParam, [
  'name',
  'email',
  'account',
  'password',
] as const) {}

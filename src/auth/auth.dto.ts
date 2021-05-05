import { PickType } from '@nestjs/swagger';
import { User } from 'src/models/user/user.entity';
import { CreateUserParam } from '../models/user/user.class';

export class RegisterDto extends PickType(CreateUserParam, [
  'name',
  'email',
  'account',
  'password',
] as const) {}

export class ForgotPasswordDto extends PickType(User, ['email'] as const) {}

export class ResetPasswordDto extends PickType(User, ['password'] as const) {}

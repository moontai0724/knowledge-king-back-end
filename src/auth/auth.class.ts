import { Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { User } from '../models/user/user.entity';
import { UserPublicOwn } from '../models/user/user.class';
import { JWTInfo } from './jwt/jwt.class';
import { PickType } from '@nestjs/mapped-types';

export class ResetPasswordPayload extends PickType(User, [
  'email',
  'password',
] as const) {}

export class LoggedInUser extends UserPublicOwn {
  constructor(user: User, jwtInfo: JWTInfo) {
    super(user);
    this.token = jwtInfo;
  }

  @Expose()
  @ValidateNested()
  token: JWTInfo;
}

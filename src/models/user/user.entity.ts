import { Expose, plainToClass } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateBy,
} from 'class-validator';
import { AccountValidator } from '../../validators/account.validator';
import { History } from '../history/history.entity';

export enum Role {
  ADMIN = 3,
  AUDITOR = 2,
  USER = 1,
  DISABLED = 0,
}

export class User {
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ValidateBy({
    name: 'ACCOUNT_VALIDATOR',
    validator: new AccountValidator(),
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  account: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

  @IsDate()
  @Expose()
  registered_at: Date;

  @IsOptional()
  @IsString()
  @Expose()
  profile_photo: string | null = null;

  @IsEnum(Role)
  @Expose()
  permission: Role = Role.USER;

  @IsArray()
  @Expose()
  histories: History[];

  constructor(partial: Partial<User>) {
    Object.assign(this, plainToClass(User, partial));
  }
}

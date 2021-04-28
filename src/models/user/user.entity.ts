import { plainToClass } from 'class-transformer';
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
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateBy({
    name: 'ACCOUNT_VALIDATOR',
    validator: new AccountValidator(),
  })
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDate()
  registered_at: Date;

  @IsOptional()
  @IsString()
  profile_photo: string | null = null;

  @IsEnum(Role)
  permission: Role = Role.USER;

  @IsArray()
  histories: History[];

  constructor(partial: Partial<User>) {
    Object.assign(this, plainToClass(User, partial));
  }
}

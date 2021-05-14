import { Expose, plainToClass, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateBy,
  ValidateNested,
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
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @MaxLength(40)
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @Type(() => String)
  email: string;

  @ValidateBy({
    name: 'ACCOUNT_VALIDATOR',
    validator: new AccountValidator(),
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  @MaxLength(20)
  @Type(() => String)
  account: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @Type(() => String)
  password: string;

  @IsDate()
  @Expose()
  @Type(() => Date)
  registered_at: Date;

  @IsOptional()
  @IsString()
  @Expose()
  @Type(() => String)
  profile_photo: string | null = null;

  @IsEnum(Role)
  @Expose()
  permission: Role = Role.USER;

  @IsArray()
  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => History)
  histories?: History[];

  constructor(partial: Partial<User>) {
    Object.assign(this, plainToClass(User, partial));
  }
}

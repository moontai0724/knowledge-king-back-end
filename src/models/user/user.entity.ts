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
  @Expose()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @Type(() => String)
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @ValidateBy({
    name: 'ACCOUNT_VALIDATOR',
    validator: new AccountValidator(),
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Type(() => String)
  account: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  password: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  registered_at: Date;

  @Expose()
  @IsString()
  @IsOptional()
  @Type(() => String)
  profile_photo: string | null = null;

  @Expose()
  @IsEnum(Role)
  permission: Role = Role.USER;

  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => History)
  histories?: History[];

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_question_distincted?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_answered_distincted?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_question?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_answered?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_correct?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_time_limit?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  total_time_used?: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, plainToClass(User, partial));
  }
}

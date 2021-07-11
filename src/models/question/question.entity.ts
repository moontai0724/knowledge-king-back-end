import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Expose, plainToClass, Type } from 'class-transformer';

export class Question {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  question: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  option_1: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  option_2: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  option_3: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  option_4: string;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  answer: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  time_limit: number;

  @Expose()
  @IsBoolean()
  @Type(() => Boolean)
  disabled: boolean;

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  author: User;

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => Topic)
  topic: Topic;
}

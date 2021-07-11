import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
  IsArray,
  IsObject,
} from 'class-validator';
import { Group } from '../group/group.entity';
import { Question } from '../question/question.entity';

export class Topic {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  title: string;

  @Expose()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Group)
  group: Group;

  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => Question)
  questions: Question[];
}

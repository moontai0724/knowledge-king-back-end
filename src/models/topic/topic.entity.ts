import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Group } from '../group/group.entity';
import { Question } from '../question/question.entity';

export class Topic {
  @IsNumber()
  @Expose()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @Type(() => String)
  title: string;

  @Expose()
  @ValidateNested()
  @Type(() => Group)
  group: Group;

  @Type(() => Question)
  questions: Question[];
}

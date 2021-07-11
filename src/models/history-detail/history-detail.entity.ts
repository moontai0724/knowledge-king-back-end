import { Question } from '../question/question.entity';
import { History } from '../history/history.entity';
import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class HistoryDetail {
  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  selected: number | null;

  @Expose()
  @IsBoolean()
  @Type(() => Boolean)
  correctness: boolean;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  time_used: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  score: number;

  @Expose()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at: Date | null;

  @Expose()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => History)
  history: History;

  @Expose()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Question)
  question: Question;
}

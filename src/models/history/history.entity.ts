import { User } from '../user/user.entity';
import { HistoryDetail } from '../history-detail/history-detail.entity';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class History {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  score: number;

  @Expose()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @Expose()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDetail)
  details: HistoryDetail[];

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
}

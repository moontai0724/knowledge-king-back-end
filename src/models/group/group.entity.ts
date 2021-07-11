import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Group {
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
  @IsString()
  @IsOptional()
  @Type(() => String)
  image_path: string | null;
}

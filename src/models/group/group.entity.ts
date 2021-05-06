import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Group {
  @IsNumber()
  @Expose()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @Type(() => String)
  title: string;

  @IsString()
  @Expose()
  @Type(() => String)
  image_path: string | null;
}

import { plainToClass } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsFQDN,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateBy,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Production;

  @ValidateBy({
    name: 'IS_VALIDATE_HOST',
    validator: (value) => IsFQDN(value) || IsIP(value),
  })
  @IsNotEmpty()
  HOST: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_TIMEZONE: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  MAIL_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  MAIL_PORT: number;

  @IsString()
  @IsNotEmpty()
  MAIL_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MAIL_PASSWORD: string;

  @IsBooleanString()
  @IsNotEmpty()
  MAIL_TLS_ENABLED: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate, Environment } from 'src/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        timezone: configService.get('database.timezone'),
        synchronize:
          configService.get('environment') === Environment.Production,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MainModule {}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate, Environment } from './env.validation';
import { GroupSchema } from './models/group/group.schema';
import { HistorySchema } from './models/history/history.schema';
import { HistoryDetailSchema } from './models/history-detail/history-detail.schema';
import { LeaderboardSchema } from './models/leaderboard/leaderboard.schema';
import { QuestionSchema } from './models/question/question.schema';
import { TopicSchema } from './models/topic/topic.schema';
import { UserSchema } from './models/user/user.schema';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { NormalResponseInterceptor } from './interceptors/normal-response.interceptor';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AdminModule } from './admin/admin.module';
import { RolesGuard } from './guards/roles.guard';
import { JwtAccessGuard } from './auth/jwt/jwt.guard';

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
          configService.get('environment') !== Environment.Production,
        autoLoadEntities: false,
        entities: [
          GroupSchema,
          HistorySchema,
          HistoryDetailSchema,
          LeaderboardSchema,
          QuestionSchema,
          TopicSchema,
          UserSchema,
        ],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          port: +configService.get('mail.port'),
          secureConnection: configService.get('mail.tls'),
          auth: {
            user: configService.get('mail.username'),
            pass: configService.get('mail.password'),
          },
        },
        defaults: {
          from: `"Knowledge King System" <${configService.get(
            'mail.username',
          )}>`,
        },
        template: {
          dir: process.cwd() + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: NormalResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

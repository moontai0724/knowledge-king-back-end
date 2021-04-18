import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate, Environment } from 'src/env.validation';
import { GroupSchema } from './models/group/group.schema';
import { HistorySchema } from './models/history/history.schema';
import { HistoryDetailSchema } from './models/history-detail/history-detail.schema';
import { LeaderboardSchema } from './models/leaderboard/leaderboard.schema';
import { QuestionSchema } from './models/question/question.schema';
import { TopicSchema } from './models/topic/topic.schema';
import { UserSchema } from './models/user/user.schema';

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
        autoLoadEntities: true,
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
  ],
})
export class MainModule {}

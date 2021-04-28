import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModelModule } from '../history/history.module';
import { TopicModelModule } from '../topic/topic.module';
import { UserModelModule } from '../user/user.module';
import { LeaderboardSchema } from './leaderboard.schema';
import { LeaderboardModelService } from './leaderboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaderboardSchema]),
    HistoryModelModule,
    UserModelModule,
    TopicModelModule,
  ],
  providers: [LeaderboardModelService],
  exports: [LeaderboardModelService],
})
export class LeaderboardModelModule {}

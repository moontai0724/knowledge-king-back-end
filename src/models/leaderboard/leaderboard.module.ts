import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardSchema } from './leaderboard.schema';
import { LeaderboardModelService } from './leaderboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaderboardSchema])],
  providers: [LeaderboardModelService],
})
export class LeaderboardModelModule {}

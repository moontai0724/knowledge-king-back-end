import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardSchema } from './leaderboard.schema';

@Injectable()
export class LeaderboardModelService {
  constructor(
    @InjectRepository(LeaderboardSchema)
    private repository: Repository<Leaderboard>,
  ) {}

  findAll(): Promise<Leaderboard[]> {
    return this.repository.find();
  }
}

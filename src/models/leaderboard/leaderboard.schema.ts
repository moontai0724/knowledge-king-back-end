import { EntitySchema } from 'typeorm';
import { Leaderboard } from './leaderboard.entity';

export const LeaderboardSchema = new EntitySchema<Leaderboard>({
  name: 'leaderboard',
  columns: {
    score: {
      type: 'float',
      comment: '分數',
    },
  },
  relations: {
    history: {
      type: 'many-to-one',
      target: 'history',
      primary: true,
      joinColumn: {
        name: 'history_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      primary: true,
      joinColumn: {
        name: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    topic: {
      type: 'many-to-one',
      target: 'topic',
      primary: true,
      joinColumn: {
        name: 'topic_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
});

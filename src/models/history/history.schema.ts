import { EntitySchema } from 'typeorm';
import { History } from './history.entity';

export const HistorySchema = new EntitySchema<History>({
  name: 'history',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      comment: '歷史紀錄流水號',
    },
    score: {
      type: 'float',
      default: 0,
      comment: '分數',
    },
    created_at: {
      type: Date,
      default: () => 'CURRENT_TIMESTAMP',
      update: false,
      comment: '創立時間',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    details: {
      type: 'one-to-many',
      target: 'history_detail',
      inverseSide: 'history',
    },
  },
});

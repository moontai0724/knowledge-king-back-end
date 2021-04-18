import { EntitySchema } from 'typeorm';
import { HistoryDetail } from './history-detail.entity';

export const HistoryDetailSchema = new EntitySchema<HistoryDetail>({
  name: 'history_detail',
  columns: {
    selected: {
      type: 'enum',
      nullable: true,
      enum: [1, 2, 3, 4],
      default: null,
      comment: '選取的答案',
    },
    correctness: {
      type: Boolean,
      default: false,
      comment: '選取的答案正確與否',
    },
    time_used: {
      type: 'float',
      comment: '答題耗時',
    },
    score: {
      type: 'float',
      default: 0,
      comment: '分數',
    },
    updated_at: {
      type: Date,
      nullable: true,
      default: null,
      onUpdate: 'CURRENT_TIMESTAMP',
      update: false,
      comment: '作答時間',
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
    question: {
      type: 'many-to-one',
      target: 'question',
      primary: true,
      joinColumn: {
        name: 'question_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
});

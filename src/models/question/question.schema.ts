import { EntitySchema } from 'typeorm';
import { Question } from './question.entity';

export const QuestionSchema = new EntitySchema<Question>({
  name: 'question',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      comment: '問題流水號',
    },
    question: {
      type: String,
      comment: '題目',
    },
    option_1: {
      type: String,
      comment: '答案一',
    },
    option_2: {
      type: String,
      comment: '答案二',
    },
    option_3: {
      type: String,
      comment: '答案三',
    },
    option_4: {
      type: String,
      comment: '答案四',
    },
    answer: {
      type: 'enum',
      enum: [1, 2, 3, 4],
      comment: '正確答案編號',
    },
    time_limit: {
      type: 'float',
      comment: '作答時間限制',
    },
    disabled: {
      type: Boolean,
      default: true,
      comment: '1 為未審核，即為禁用。0 為已審核，即為啟用。',
    },
  },
  relations: {
    author: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'author_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    topic: {
      type: 'many-to-one',
      target: 'topic',
      joinColumn: {
        name: 'topic_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
});

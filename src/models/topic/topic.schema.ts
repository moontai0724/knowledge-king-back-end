import { EntitySchema } from 'typeorm';
import { Topic } from './topic.entity';

export const TopicSchema = new EntitySchema<Topic>({
  name: 'topic',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      comment: '主題流水號',
    },
    title: {
      type: String,
      comment: '主題名',
    },
  },
  relations: {
    group: {
      type: 'many-to-one',
      target: 'group',
      joinColumn: {
        name: 'group_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    questions: {
      type: 'one-to-many',
      target: 'question',
      inverseSide: 'topic',
    },
  },
});

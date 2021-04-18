import { EntitySchema } from 'typeorm';
import { Group } from './group.entity';

export const GroupSchema = new EntitySchema<Group>({
  name: 'group',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      comment: '組別流水號',
    },
    title: {
      type: String,
      comment: '組別名',
    },
    image_path: {
      type: String,
      nullable: true,
      comment: '組別照片位置',
    },
  },
});

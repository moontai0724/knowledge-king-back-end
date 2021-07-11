import { EntitySchema } from 'typeorm';
import { Role, User } from './user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      comment: '使用者流水號',
    },
    name: {
      type: String,
      comment: '名稱',
    },
    email: {
      type: String,
      unique: true,
      comment: '信箱',
    },
    account: {
      type: String,
      unique: true,
      comment: '帳號',
    },
    password: {
      type: 'char',
      length: 60,
      comment: '密碼',
    },
    registered_at: {
      type: Date,
      default: () => 'CURRENT_TIMESTAMP',
      update: false,
      comment: '註冊時間',
    },
    profile_photo: {
      type: String,
      nullable: true,
      comment: '大頭貼位置',
    },
    permission: {
      type: 'enum',
      enum: Role,
      default: Role.USER,
      comment:
        '使用者權限（0 - 禁用的使用者 / 1 - 一般使用者 / 2 - 題目審核員 / 3 - 管理員）',
    },
  },
  relations: {
    histories: {
      type: 'one-to-many',
      target: 'history',
      inverseSide: 'user',
    },
  },
});

import { History } from '../history/history.entity';

export enum Role {
  ADMIN = 3,
  AUDITOR = 2,
  USER = 1,
  DISABLED = 0,
}

export class User {
  id: number;
  name: string;
  email: string;
  account: string;
  password: string;
  registered_at: Date;
  profile_photo: string | null;
  permission: Role = Role.USER;
  histories: History[];
}

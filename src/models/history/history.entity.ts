import { User } from '../user/user.entity';
import { HistoryDetail } from '../history-detail/history-detail.entity';

export class History {
  id: number;
  score: number;
  created_at: Date;
  user: User;
  details: HistoryDetail[];
}

import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';
import { History } from '../history/history.entity';

export class Leaderboard {
  score: number;
  history: History;
  user: User;
  topic: Topic;
}

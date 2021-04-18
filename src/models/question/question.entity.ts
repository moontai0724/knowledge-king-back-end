import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';

export class Question {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  answer: number;
  time_limit: number;
  disabled: boolean;
  author: User;
  topic: Topic;
}

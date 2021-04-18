import { Group } from '../group/group.entity';
import { Question } from '../question/question.entity';

export class Topic {
  id: number;
  title: string;
  group: Group;
  questions: Question[];
}

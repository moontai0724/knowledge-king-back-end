import { Question } from '../question/question.entity';
import { History } from '../history/history.entity';

export class HistoryDetail {
  selected: number | null;
  correctness: boolean;
  time_used: number;
  score: number;
  updated_at: Date | null;
  history: History;
  question: Question;
}

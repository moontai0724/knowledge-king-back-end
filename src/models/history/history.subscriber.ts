import { EventSubscriber, EntitySubscriberInterface } from 'typeorm';
import { History } from './history.entity';

@EventSubscriber()
export class HistorySubscriber implements EntitySubscriberInterface<History> {
  /**
   * Indicates that this subscriber only listen to History events.
   */
  listenTo() {
    return 'history';
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(history: History) {
    if (!history.details) return;
    history.total_question = history.details.length;
    history.total_answered = history.details.filter((v) => v.selected).length;
    history.total_correct = history.details.filter((v) => v.correctness).length;
    const { limit, used } = history.details
      .map((v) => ({
        limit: v.question.time_limit,
        used: v.time_used,
      }))
      .reduce((previous, current) => ({
        limit: previous.limit + current.limit,
        used: previous.used + current.used,
      }));
    history.total_time_limit = limit;
    history.total_time_used = used;
  }
}

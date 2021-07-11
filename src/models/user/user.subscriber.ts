import { EventSubscriber, EntitySubscriberInterface } from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo() {
    return 'user';
  }

  /**
   * Called after entity is loaded.
   */
  afterLoad(user: User) {
    if (!user.histories) return;
    const result = user.histories
      .map((history) => ({
        total_question: history.total_question,
        total_answered: history.total_answered,
        total_correct: history.total_correct,
        total_time_limit: history.total_time_limit,
        total_time_used: history.total_time_used,
      }))
      .reduce(
        (previous, current) => ({
          total_question: previous.total_question + current.total_question,
          total_answered: previous.total_answered + current.total_answered,
          total_correct: previous.total_correct + current.total_correct,
          total_time_limit:
            previous.total_time_limit + current.total_time_limit,
          total_time_used: previous.total_time_used + current.total_time_used,
        }),
        {
          total_question: 0,
          total_answered: 0,
          total_correct: 0,
          total_time_limit: 0,
          total_time_used: 0,
        },
      );
    Object.assign(user, result);
  }
}

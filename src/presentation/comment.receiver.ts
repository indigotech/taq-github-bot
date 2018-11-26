import { Context } from 'probot';
import { Service } from 'typedi';
import {
  DeveloperInput, HasFinishedUseCase, IncrementDeveloperProgressUseCase, ShouldIncrementDevProgressUseCase,
} from '@domain';
import { PayloadMapper } from './payload.mapper';
import { Receiver } from './receiver';

@Service()
export class CommentReceiver extends Receiver {
  constructor(
    private readonly hasFinishedUseCase: HasFinishedUseCase,
    private readonly incrementProgressUseCase: IncrementDeveloperProgressUseCase,
    private readonly shouldIncrementDevProgressUseCase: ShouldIncrementDevProgressUseCase,
  ) {
    super();
  }

  onReceive = async (context: Context) => {
    if (context.isBot) {
      return;
    }

    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
    const hasAlreadyFinished = await this.hasFinishedUseCase.execute(devInput.developerId);

    if (hasAlreadyFinished) {
      context.log(`Developer ${devInput.name} has already finished onboard, nothing to do here...`);
      return;
    }

    const comment = context.payload.comment;

    const shouldIncrementProgress =
      await this.shouldIncrementDevProgressUseCase
        .execute(devInput.developerId, context.payload.issue.id, comment.body);

    if (shouldIncrementProgress) {
      this.incrementProgress(context, devInput);
    }
  }

  private async incrementProgress(context, devInput: DeveloperInput) {
    const developer = await this.incrementProgressUseCase.execute(devInput.developerId);

    this.eventsSender.openEvent(context, developer);
  }
}

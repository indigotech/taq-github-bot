import { Context } from 'probot';
import { Service } from 'typedi';
import {
  CommentInfo, HasFinishedUseCase, IncrementDeveloperProgressUseCase, ShouldIncrementDevProgressUseCase
} from '@domain';
import { DeveloperInput } from '@domain/developer.model';
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

    const payload = context.payload;
    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(payload);

    const { developerId, name } = devInput;
    const hasAlreadyFinished = await this.hasFinishedUseCase.execute(devInput.developerId);

    if (hasAlreadyFinished) {
      context.log.info(`Developer ${name} (${developerId}) has already finished onboard, nothing to do here...`);
      return;
    }

    const comment: string = payload.comment && payload.comment.body;
    const commentInfo: CommentInfo = { developerId, issueId: payload.issue.id, comment };

    const shouldIncrementProgress: boolean = await this.shouldIncrementDevProgressUseCase.execute(commentInfo);

    if (shouldIncrementProgress) {
      await this.incrementProgress(context, devInput);
    } else {
      context.log.info(`No reason to increment developer ${name} (${developerId}) detected`);
    }
  }

  private async incrementProgress(context, devInput: DeveloperInput) {
    const developer = await this.incrementProgressUseCase.execute(devInput.developerId);
    return this.eventsSender.openEvent(context, developer);
  }
}

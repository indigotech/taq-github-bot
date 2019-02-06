import { Context } from 'probot';
import { Service } from 'typedi';
import {
  CommentInfo, DeveloperInput, HasFinishedUseCase, IncrementDeveloperProgressUseCase, ShouldIncrementDevProgressUseCase
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
    console.log('AAAAA');

    if (context.isBot) {
      return;
    }

    const payload = context.payload;
    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(payload);
    const hasAlreadyFinished = await this.hasFinishedUseCase.execute(devInput.developerId);

    if (hasAlreadyFinished) {
      context.log(`Developer ${devInput.name} has already finished onboard, nothing to do here...`);
      return;
    }

    const comment: string = payload.comment && payload.comment.body;
    const commentInfo: CommentInfo = { developerId: devInput.developerId, issueId: payload.issue.id, comment };
    const shouldIncrementProgress: boolean = await this.shouldIncrementDevProgressUseCase.execute(commentInfo);

    console.log('Should increment', shouldIncrementProgress);
    if (shouldIncrementProgress) {
      this.incrementProgress(context, devInput);
    }
  }

  private async incrementProgress(context, devInput: DeveloperInput) {
    const developer = await this.incrementProgressUseCase.execute(devInput.developerId);

    this.eventsSender.openEvent(context, developer);
  }
}

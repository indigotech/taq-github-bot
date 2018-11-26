import { Context } from 'probot';
import { Service } from 'typedi';
import { DeveloperInput, HasFinishedUseCase, IncrementDeveloperProgressUseCase } from '@domain';
import { PayloadMapper } from './payload.mapper';
import { Receiver } from './receiver';

@Service()
export class CommentReceiver extends Receiver {
  constructor(
    private readonly hasFinishedUseCase: HasFinishedUseCase,
    private readonly incrementProgressUseCase: IncrementDeveloperProgressUseCase,
  ) {
    super();
  }

  onReceive = async (context: Context) => {
    if (context.isBot) {
      return;
    }

    const comment = context.payload.comment;
    const isFinishComment: boolean = comment && comment.body.match(/finish|next*/i);

    if (isFinishComment) {
      this.incrementProgress(context);
    }
  }

  private async incrementProgress(context: Context) {
    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
    const hasAlreadyFinished = await this.hasFinishedUseCase.execute(devInput.developerId);

    if (hasAlreadyFinished) {
      context.log(`Developer ${devInput.name} has already finished onboard, nothing to do here...`);
      return;
    }

    const developer = await this.incrementProgressUseCase.execute(devInput.developerId, context.payload.issue.id);

    if (developer) { // will be null if wrong issue
      this.eventsSender.openEvent(context, developer);
    }
  }
}

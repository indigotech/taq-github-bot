import { Service } from 'typedi';
import { DeveloperInput, Track } from '@domain/entities';
import { NextStepUseCase } from '@domain/usecases';
import { mapToWebhookToDeveloper } from '@presentation/mappers';
import { mapTrackToEvent } from './mappers';
import { Event } from './models';

const acceptedComments = ['Finish', 'finish', 'Finished', 'finished', 'I give up!', 'I give up'];

@Service()
export class Events {
  constructor(private readonly useCase: NextStepUseCase) {}

  async onCommentCreated(context): Promise<Event> {
    const isFinishComment: boolean = acceptedComments.some(it => it === context.payload.comment.body);

    if (!isFinishComment) {
      return null;
    }

    const dev: DeveloperInput = mapToWebhookToDeveloper(context.payload);
    const track: Track = await this.useCase.execute(dev);

    return mapTrackToEvent(track);
  }
}

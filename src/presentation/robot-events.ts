import { Service } from 'typedi';
import { DeveloperInput, Track } from '@domain/entities';
import { NextStepUseCase } from '@domain/usecases';
import { mapFromWebhookToDeveloper, mapTrackToEvent } from '@presentation/mappers';
import { Event } from '@presentation/models';

const acceptedComments = ['finish', 'finished', 'next'];

@Service()
export class RobotEvents {
  constructor(private readonly useCase: NextStepUseCase) {}

  async onCommentCreated(context): Promise<Event> {
    const isFinishComment: boolean = acceptedComments.some(it => it === context.payload.comment.body.toLowerCase());

    if (!isFinishComment) {
      return null;
    }

    const dev: DeveloperInput = mapFromWebhookToDeveloper(context.payload);
    const track: Track = await this.useCase.execute(dev);

    return mapTrackToEvent(track);
  }
}

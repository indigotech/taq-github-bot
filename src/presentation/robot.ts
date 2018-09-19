import { Application } from 'probot';
import { Container } from 'typedi';
import { DeveloperInput, NextStepUseCase, Track } from '@domain';
import { GithubEventSender } from './events-sender.service';
import { GithubEvents } from './github-events.constants';
import { PayloadMapper } from './payload.mapper';

export const robot = (app: Application) => {
  const eventsSender: GithubEventSender = Container.get(GithubEventSender);
  const useCase: NextStepUseCase = Container.get(NextStepUseCase);

  app.on(GithubEvents.Installation.Created, async context => {

    const dev: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
    console.log('Dev', dev);
    const track: Track = await useCase.execute(dev);
    console.log('Track', track);

    eventsSender.openEvent(context, track);
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    if (context.isBot) {
      return;
    }

    const comment = context.payload.comment;
    const isFinishComment: boolean = comment && comment.body.match(/finish|next*/i);

    if (isFinishComment) {
      const dev: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
      const track: Track = await useCase.execute(dev);

      eventsSender.openEvent(context, track);
    }
  });
};

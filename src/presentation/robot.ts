import { Application, Context } from 'probot';
import { GithubEvents } from '@data/mappers/github-events';
import { Container } from 'typedi';
import { GithubPayloadMapper } from '@presentation/mappers/github-payload.mapper';
import { TrackUseCase } from '@domain/usecases/track.usecases';

export const robot = (app: Application) => {
  const trackUseCase = Container.get(TrackUseCase);
  const payloadMapper = Container.get(GithubPayloadMapper);

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async (context: Context) => {
    if (context.payload.comment.body === 'terminei') {
      const dev = payloadMapper.mapUser(context.payload);
      // const nextTrack = await trackUseCase.getNextTrack(dev);
      createComment(context, 'teste');
      trackUseCase.onNextTrackOpened(dev);
    }
  });
};

const createComment = (context: Context, text: string) => {
  context.payload.issues.createComment(context.issue({ body: text })); // It's not working... :(
};

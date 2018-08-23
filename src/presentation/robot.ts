import { Application, Context } from 'probot';
import { GithubEvents } from '@data/mappers/github-events';
import { Container } from 'typedi';
import { GithubPayloadMapper } from '@presentation/mappers/github-payload.mapper';
import { TrackUseCase } from '@domain/usecases/track.usecases';
import { Track } from '@domain/entities/track.model';

const trackUseCase = Container.get(TrackUseCase);

export const robot = (app: Application) => {
  const payloadMapper = Container.get(GithubPayloadMapper);

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async (context: Context) => {
    if (context.payload.comment.body === 'terminei') {
      const dev = payloadMapper.mapUser(context.payload);
      const nextTrack = await trackUseCase.getNextTrack(dev);
      openTrack(context, nextTrack);
      trackUseCase.onNextTrackOpened(dev);
    }
  });
};

const openTrack = (context: Context, track: Track) => {
  context.payload.issues.createComment(context.issue({ body: track.body })); // It's not working... :(
};

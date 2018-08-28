import { Application, Context } from 'probot';
import { Container } from 'typedi';
import { GithubEvents } from '@data/mappers/github-events';
import { Events } from './events';

export const robot = (app: Application) => {
  const events: Events = Container.get(Events);

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    await events.onCommentCreated(context);
  });
};

import { Application, Context } from 'probot';
import { Container } from 'typedi';
import { GithubEvents } from '@data/mappers/github-events';
import { GithubEventSender } from '@presentation/github-interaction';
import { RobotEvents } from '@presentation/robot-events';

const events: RobotEvents = Container.get(RobotEvents);
const githubEvents: GithubEventSender = Container.get(GithubEventSender);

export const robot = (app: Application) => {

  app.on(GithubEvents.Installation.Created, async (context: Context) => {
    const event = await events.onAppInstalled(context);
    githubEvents.openEvent(context, event);
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    if (context.isBot) {
      return;
    }

    const event = await events.onCommentCreated(context);
    githubEvents.openEvent(context, event);
  });
};

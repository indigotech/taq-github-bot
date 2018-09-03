import { Application, Context } from 'probot';
import { Container } from 'typedi';
import { GithubEvents } from '@data/mappers/github-events';
import { RobotEvents } from '@presentation/robot-events';
import { GithubEventSender } from '@presentation/github-interaction';

const events: RobotEvents = Container.get(RobotEvents);
const githubEvents: GithubEventSender = Container.get(GithubEventSender);

export const robot = (app: Application) => {

  app.on(GithubEvents.Installation.Created, async (context: Context) => {
    app.log('Taqbot was installed!');
    app.log(context);
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    if (context.isBot) {
      return;
    }
    const event = await events.onCommentCreated(context);
    console.log(event);
    githubEvents.openEvent(context, event);
  });
};

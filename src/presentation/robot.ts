import { Application, Context } from 'probot';
import { Container } from 'typedi';
import { GithubEvents } from '@data/mappers/github-events';
import { RobotEvents } from '@presentation/robot-events';
import { Event, EventType } from '@presentation/models';

export const robot = (app: Application) => {
  const events: RobotEvents = Container.get(RobotEvents);

  app.on(GithubEvents.Installation.Created, async (context: Context) => {
    app.log('Taqbot was installed!');
  });

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    if (context.isBot) {
      return;
    }

    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async context => {
    if (context.isBot) {
      return;
    }
    const event = await events.onCommentCreated(context);
    console.log(event);
    openEvent(context, event);

  });
};

const openEvent = (context: Context, event: Event) => {
  if (!event) {
    createComment(context, 'Algo deu errado :(');
    return;
  }
  createIssue(context, event.data.title, event.data.body);
  switch (event.type) {
    case EventType.CreateComment:
      createComment(context, event.data.body);
      break;

    case EventType.CreateIssue:
      createIssue(context, event.data.title, event.data.body);
      break;

    default:
      createComment(context, 'Algo deu errado :(');
      break;

  }
};

const createIssue = async (context: Context, title: string, body: string) => {
  const params = context.issue(Object.assign(context.event, { title: title || 'Issue', body }));
  const createdIssue = await context.github.issues.create(params);
  createComment(context, nextIssueText(createdIssue.data.html_url));
};

const createComment = (context: Context, body: string) => {
  const params = context.issue(Object.assign(context.event, { body }));

  context.github.issues.createComment(params);
};

function nextIssueText(link: string) {
  return `[Clique neste link](${link}) para ir para a próxima tarefa`;
}

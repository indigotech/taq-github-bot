import { Application, Context } from 'probot';
import { GithubEvents } from '@data/mappers/github-events';

export const robot = (app: Application) => {
  app.log('Yay, the app was loaded!');

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async (context: Context) => {
    if (context.payload.comment.body === 'terminei') {
      context.payload.issue.createComment(context.issue({ body: 'WOW, funcionou!' }));
    }
  });
};

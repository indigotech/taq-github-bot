import { Application, Context } from 'probot';
import { GithubEvents } from '@data/mappers/github-events';
import { Container } from 'typedi';
import { DeveloperUseCase } from '@domain/usecases/developer.usecases';
import { GithubPayloadMapper } from '@presentation/mappers/github-payload.mapper';

export const robot = (app: Application) => {
  const developerUseCase = Container.get(DeveloperUseCase);
  const payloadMapper = Container.get(GithubPayloadMapper);

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!');
  });

  app.on(GithubEvents.IssueComment.Created, async (context: Context) => {
    if (context.payload.comment.body === 'terminei') {
      // context.payload.issue.createComment(context.issue({ body: 'WOW, funcionou!' })); Não está funcionando :(
    }
  });
};

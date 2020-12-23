import { Probot } from 'probot';
import 'reflect-metadata';
import Container, { Service } from 'typedi';
import { GithubEvents } from './github-events.constants';
import { CommentReceiver, InstallationReceiver } from './presentation';

@Service()
export class Robot {
  private readonly installationReceiver = Container.get(InstallationReceiver);
  private readonly commentReceiver = Container.get(CommentReceiver);

  webhookReceiver = (app: Probot) => {
    app.on(GithubEvents.Installation.Created, this.installationReceiver.onReceive);
    app.on(GithubEvents.Installation.Added, this.installationReceiver.onReceive);
    app.on(GithubEvents.Member.Added, this.installationReceiver.onReceive);
    app.on(GithubEvents.IssueComment.Created, this.commentReceiver.onReceive);
  };
}

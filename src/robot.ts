import { Application } from 'probot';
import { Service } from 'typedi';
import { CommentReceiver, InstallationReceiver } from '@presentation';
import { GithubEvents } from './github-events.constants';

@Service()
export class Robot {
  constructor(
    private readonly installationReceiver: InstallationReceiver,
    private readonly commentReceiver: CommentReceiver,
  ) { }

  webhookReceiver = (app: Application) => {
    app.on(GithubEvents.Installation.Created, this.installationReceiver.onReceive);
    app.on(GithubEvents.IssueComment.Created, this.commentReceiver.onReceive);
  }
}

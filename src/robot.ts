import { Application } from 'probot';
import { Service } from 'typedi';
import { GithubEvents } from './github-events.constants';
import { CommentReceiver, InstallationReceiver, PushReceiver } from './presentation';

@Service()
export class Robot {
  constructor(
    private readonly installationReceiver: InstallationReceiver,
    private readonly commentReceiver: CommentReceiver,
    private readonly pushReceiver: PushReceiver,
  ) { }

  webhookReceiver = (app: Application) => {
    app.on(GithubEvents.Installation.Created, this.installationReceiver.onReceive);
    app.on(GithubEvents.IssueComment.Created, this.commentReceiver.onReceive);
    app.on(GithubEvents.Push, this.pushReceiver.onReceive);
  }
}

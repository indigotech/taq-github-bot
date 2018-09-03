import { Service } from 'typedi';
import { Event, EventType } from '@presentation/models';
import { Context } from 'probot';

@Service()
export class GithubEventSender {
  public openEvent(context: Context, event: Event) {
    if (!event) {
      return;
    }

    switch (event.type) {
      case EventType.CreateComment:
        this.createComment(context, event.data.body);
        break;

      case EventType.CreateIssue:
        this.createIssue(context, event.data.title, event.data.body);
        break;

      default:
        break;
    }
  }

  private async createIssue(context: Context, title: string, body: string) {
    const params = context.issue(Object.assign(context.event, { title: title || 'Issue', body }));
    const createdIssue = await context.github.issues.create(params);
    this.createComment(context, this.getNextIssueText(createdIssue.data.html_url));
  }

  private createComment(context: Context, body: string) {
    const params = context.issue(Object.assign(context.event, { body }));

    context.github.issues.createComment(params);
  }

  private getNextIssueText(link: string) {
    return `[Click here](${link}) to your next track`;
  }
}

import { Service } from 'typedi';
import { Event, EventType } from '@presentation/models';

@Service()
export class GithubEventSender {
  public openEvent(context, event: Event) {
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

      case EventType.CreateFirstIssue:
        this.createFirstIssue(context, event.data.title, event.data.body);
        break;

      default:
        break;
    }
  }

  private async createIssue(context, title: string, body: string) {
    const params = context.issue(Object.assign(context.event, { title: title || 'Issue', body }));

    const createdIssue = await context.github.issues.create(params);
    this.createComment(context, this.getNextIssueText(createdIssue.data.html_url));
  }

  private createComment(context, body: string) {
    const params = context.issue(Object.assign(context.event, { body }));

    context.github.issues.createComment(params);
  }

  private async createFirstIssue(context, title: string, body: string) {
    const fullNameSplit = context.payload.repositories[0].full_name.split('/');
    const params = { owner: fullNameSplit[0], repo: fullNameSplit[1], title, body };

    await context.github.issues.create(params);
  }

  private getNextIssueText(link: string) {
    return `[Click here](${link}) for your next track`;
  }
}

import { Service } from 'typedi';
import { Track } from '@domain';

const NextIssueText = link => `[Click here](${link}) for your next track`;

@Service()
export class GithubEventSender {
  private context;

  async openEvent(context, track: Track) {
    this.context = context;
    console.log(this.context);

    const isFirstTrackAndStep = track.number === 0 && track.steps.length === 1;
    if (isFirstTrackAndStep) {
      await this.createFirstIssue(track.title, track.steps[0].body);
    }

    const isNewTrack = track.steps.length === 1;
    if (isNewTrack) {
      const createdIssue = await this.createIssue(track.title, track.steps[0].body);
      this.createComment(NextIssueText(createdIssue.data.html_url));
    }

    const isNewStep = track.steps.length > 1;
    if (isNewStep) {
      this.createComment(track.steps[track.steps.length - 1].body);
    }
  }

  private createIssue(title: string, body: string) {
    const params = this.context.issue(Object.assign(this.context.event, { title: title || 'Issue', body }));

    return this.context.github.issues.create(params);
  }

  private createComment(body: string) {
    const params = this.context.issue(Object.assign(this.context.event, { body }));

    this.context.github.issues.createComment(params);
  }

  private createFirstIssue(title: string, body: string) {
    const fullNameSplit = this.context.payload.repositories[0].full_name.split('/');
    const params = { owner: fullNameSplit[0], repo: fullNameSplit[1], title, body };

    return this.context.github.issues.create(params);
  }
}

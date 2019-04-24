import { Context } from 'probot';
import { Service } from 'typedi';
import {
  Developer, DeveloperProgress, GetTracksUseCase, IncrementProgressUseCase, Track, UpdateDeveloperIssueUseCase
} from '@domain';
import { RobotStrings } from './robot.strings';

@Service()
export class GithubEventSender {
  constructor(
    private readonly getTracksUseCase: GetTracksUseCase,
    private readonly nextProgressUseCase: IncrementProgressUseCase,
    private readonly updateDeveloperIssue: UpdateDeveloperIssueUseCase,
  ) { }

  async openEvent(context: Context, developer: Developer) {
    const tracks = await this.getTracksUseCase.exec();
    const progress: DeveloperProgress = developer.progress;
    let trackToSend: Track;

    const isNewUser: boolean = !progress;
    if (isNewUser) {
      context.log(`Creating first track for ${developer.name}...`);
      trackToSend = tracks[0];
      const createdIssue = await this.createFirstIssue(context, trackToSend.title, trackToSend.steps[0].body);
      await this.updateDeveloperIssue.execute(developer.developerId, createdIssue.data.id);
      return;
    }

    const justFinished: boolean = progress.completed >= 1;
    if (justFinished) {
      context.log(`Congratulating ${developer.name} for finishing tutorial...`);
      await this.createComment(context, RobotStrings.FinishOnboard);
      return;
    }

    const nextProgress: DeveloperProgress = await this.nextProgressUseCase.execute(progress);

    const isNewTrack = nextProgress.step === 0;
    if (isNewTrack) {
      context.log(`Creating new track for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      const createdIssue = await this.createIssue(context, trackToSend.title, trackToSend.steps[0].body);
      await this.updateDeveloperIssue.execute(developer.developerId, createdIssue.data.id);
      await this.createComment(context, RobotStrings.NextTrack(createdIssue.data.html_url));
      return;
    }

    const isNewStep = nextProgress.step > 0;
    if (isNewStep) {
      context.log(`Incrementing step for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      await this.createComment(context, trackToSend.steps[nextProgress.step].body);
    }
  }

  private createIssue(context: Context, title: string, body: string) {
    const params = context.issue(Object.assign(context.event, { title: title || 'Issue', body }));

    return context.github.issues.create(params);
  }

  private createComment(context: Context, body: string) {
    const params = context.issue(Object.assign(context.event, { body }));

    return context.github.issues.createComment(params);
  }

  private createFirstIssue(context: Context, title: string, body: string) {
    const fullNameSplit = context.payload.repositories[0].full_name.split('/');
    const params = { owner: fullNameSplit[0], repo: fullNameSplit[1], title, body };

    return context.github.issues.create(params);
  }
}

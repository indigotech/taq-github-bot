import { GetTracksUseCase, IncrementProgressUseCase, UpdateDeveloperIssueUseCase } from '@domain';
import { Developer, DeveloperProgress } from '@domain/developer.model';
import { Track } from '@domain/track.model';
import { Context } from 'probot';
import Container, { Service } from 'typedi';
import { Payload } from './payload.body';
import { RobotStrings } from './robot.strings';

@Service()
export class GithubEventSender {
  private readonly getTracksUseCase = Container.get(GetTracksUseCase);
  private readonly nextProgressUseCase = Container.get(IncrementProgressUseCase);
  private readonly updateDeveloperIssue = Container.get(UpdateDeveloperIssueUseCase);

  async openEvent(context: Context<Payload>, developer: Developer) {
    const { tracks, totalSteps } = await this.getTracksUseCase.exec();
    const progress: DeveloperProgress = developer.progress;
    let trackToSend: Track;

    const isNewUser = !progress;
    if (isNewUser) {
      context.log.info(`Creating first track for ${developer.name}...`);
      trackToSend = tracks[0];
      try {
        const createdIssue = await this.createFirstIssue(context, trackToSend.title, trackToSend.steps[0].body);
        await this.updateDeveloperIssue.execute(developer.developerId, createdIssue.data.id);
      } catch (error) {
        context.log.error(`Error creating issue:`, error);
        return;
      }

      return;
    }

    const justFinished: boolean = developer.progress.completedStepsOverall === totalSteps;
    if (justFinished) {
      context.log.info(`Congratulating ${developer.name} for finishing tutorial...`);
      await this.createComment(context, RobotStrings.FinishOnboard);
      return;
    }

    const nextProgress: DeveloperProgress = await this.nextProgressUseCase.execute(progress);
    const isNewTrack = nextProgress.step === 0;
    if (isNewTrack) {
      context.log.info(`Creating new track for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      const createdIssue = await this.createIssue(context, trackToSend.title, trackToSend.steps[0].body);
      await this.updateDeveloperIssue.execute(developer.developerId, createdIssue.data.id);
      await this.createComment(context, RobotStrings.NextTrack(createdIssue.data.html_url));
      return;
    }

    const isNewStep = nextProgress.step > 0;
    if (isNewStep) {
      context.log.info(`Incrementing step for ${developer.name}...`);
      trackToSend = tracks[nextProgress.track];
      await this.createComment(context, trackToSend.steps[nextProgress.step].body);
    }
  }

  private createIssue(context: Context<Payload>, title: string, body: string) {
    const params = context.issue({ title: title || 'Issue', body });
    return context.octokit.issues.create(params);
  }

  private createComment(context: any, body: string) {
    const issueWithComment = context.issue({ body });
    return context.octokit.issues.createComment(issueWithComment);
  }

  private createFirstIssue(context: Context<Payload>, title: string, body: string) {
    const repository = context.payload.repository || context.payload.repositories[0];
    const fullNameSplit = repository.full_name.split('/');
    const params = { owner: fullNameSplit[0], repo: fullNameSplit[1], title, body };

    return context.octokit.issues.create(params);
  }
}

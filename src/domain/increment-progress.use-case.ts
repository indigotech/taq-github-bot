import Container, { Service } from 'typedi';
import { RobotError } from '@core';
import { TrackDataSource } from '@data/local';
import { DeveloperProgress } from './developer.model';

@Service()
export class IncrementProgressUseCase {
  private readonly trackDataSource: TrackDataSource = Container.get(TrackDataSource);

  execute(progress: DeveloperProgress): Promise<DeveloperProgress> {
    progress = { ...progress };
    const tracks = this.trackDataSource.tracks;

    const totalStepsForCurrentTrack = tracks[progress.track].steps.length;
    const hasNextStep: boolean = progress.step + 1 < totalStepsForCurrentTrack;
    const hasNextTrack: boolean = progress.track + 1 < tracks.length;

    if (hasNextStep) {
      progress.step = progress.step + 1;
    } else if (hasNextTrack) {
      progress.track = progress.track + 1;
      progress.step = 0;
    } else {
      throw new RobotError(500, 'Error getting next progress.');
    }

    progress.completedStepsOverall++;

    return Promise.resolve(progress);
  }
}

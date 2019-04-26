import { Service } from 'typedi';
import { RobotError } from '@core';
import { MathUtils } from '@core/math.utils';
import { TrackDataSource } from '@data/local';
import { DeveloperProgress } from './developer.model';

@Service()
export class IncrementProgressUseCase {
  constructor(private readonly trackDataSource: TrackDataSource) {}

  execute(progress: DeveloperProgress): Promise<DeveloperProgress> {
    const tracks = this.trackDataSource.tracks;

    const hasNextStep: boolean = progress.step + 1 < tracks[progress.track].steps.length;
    const hasNextTrack: boolean = progress.track + 1 < tracks.length;

    if (hasNextStep) {
      progress.step = progress.step + 1;
    } else if (hasNextTrack) {
      progress.track = progress.track + 1;
      progress.step = 0;
    } else {
      throw new RobotError(500, 'Error getting next progress.');
    }

    progress.completed = MathUtils.round(progress.completed + this.trackDataSource.incrementProgressStep, 4);

    return Promise.resolve(progress);
  }
}

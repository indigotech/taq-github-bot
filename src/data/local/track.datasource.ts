import Container, { Service } from 'typedi';
import { MathUtils } from '@core';
import { Track } from '@domain/track.model';
import { TRACKS } from './track.configure';

@Service()
export class TrackDataSource {
  readonly tracks: ReadonlyArray<Track> = Object.freeze(Container.get(TRACKS));
  readonly totalSteps: number;
  readonly incrementProgressStep: number;

  constructor() {
    this.totalSteps = this.calculateTotalSteps();
    this.incrementProgressStep = MathUtils.round(1 / this.totalSteps, 4);
  }

  private calculateTotalSteps(): number {
    const sumSteps = (totalStepsAcc: number, currentTrack: Track) => totalStepsAcc + currentTrack.steps.length;
    return this.tracks.reduce<number>(sumSteps, 0);
  }
}

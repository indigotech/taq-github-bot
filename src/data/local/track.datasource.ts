import { Service } from 'typedi';
import { Track } from '@domain';
import { createTracksFromFolder } from './track-reader';

@Service()
export class TrackDataSource {
  readonly tracks: ReadonlyArray<Track>;
  readonly totalSteps: number;
  readonly incrementProgressStep: number;

  constructor() {
    this.tracks = Object.freeze(createTracksFromFolder());
    this.totalSteps = this.calculateTotalSteps();
    this.incrementProgressStep = Math.round(1 / this.totalSteps * 10000) / 10000;
  }

  private calculateTotalSteps(): number {
    const sumSteps = (totalStepsAcc: number, currentTrack: Track) => totalStepsAcc + currentTrack.steps.length;
    return this.tracks.reduce<number>(sumSteps, 0);
  }
}

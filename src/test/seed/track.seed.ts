import { Container } from 'typedi';
import { TRACKS } from '@data/local/track.configure';
import { Step, Track } from '@domain/track.model';

export class TrackSeed {
  tracks: Track[];

  createTracks(stepsPerTrack: number[]) {
    this.tracks = stepsPerTrack.map((stepsNumber: number, i: number) => {
      return createTrack(i, stepsNumber);
    });

    Container.set(TRACKS, this.tracks);
  }
}

export function createTrack(n: number, stepsNumber = 3) {
  const stepPrefix = `Step ${n} - `;
  const steps: Step[] = new Array(stepsNumber).fill(null).map((_, i: number) => ({
    body: `${stepPrefix}${i}`,
  }));

  return {
    title: `Title ${n}`,
    number: n,
    steps,
  };
}

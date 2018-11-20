import { Container } from 'typedi';
import { TRACKS } from '@data/local/track.configure';
import { Step, Track } from '@domain';

export class TrackSeed {
  createTracks() {
    const tracks: Track[] = [createTrack(0), createTrack(1, 2), createTrack(2)];
    Container.set(TRACKS, tracks);
  }
}

function createTrack(n: number, stepsNumber: number = 3) {
  const stepPrefix = 'Step ' + n + '-';
  const steps: Step[] = new Array(stepsNumber).fill(null).map((_, i: number) => ({
    body: stepPrefix + i,
  }));

  return {
    title: 'Title ' + n,
    number: n,
    steps,
  };
}

import { Container, Inject, Service } from 'typedi';
import { Step, Track } from '@domain/track.model';
import { readAllFiles, readFile, readFolder } from './file.utils';

export const TRACKS = 'TRACKS';
export const ONBOARD_STACK = 'ONBOARD_STACK';

export enum OnboardStack {
  React = 'React',
  Node = 'Node',
}

@Service()
export class TrackConfigure {
  private readonly stepsFolderName = '/steps';
  private readonly tracksFolder;

  constructor(@Inject(ONBOARD_STACK) stack: string) {
    this.tracksFolder = stack === OnboardStack.Node ? 'tracks-node' : 'tracks-react';
  }

  configure() {
    console.info('Creating tracks...');
    Container.set(TRACKS, this.createTracksFromFolder());
  }

  private tracksFolderPath = (trackname?: string) => `${__dirname}/github/${this.tracksFolder}/${trackname || ''}`;

  private createTracksFromFolder(): Track[] {
    try {
      const trackNames = readFolder(this.tracksFolderPath())
        .filter(dirname => dirname.startsWith('track-'));

      const tracks = trackNames.map(trackName => ({
        ...JSON.parse(readFile(this.tracksFolderPath(trackName), trackName.concat('.json'))),
        steps: this.createSteps(trackName),
      }));

      return tracks;
    } catch (error) {
      console.error('Create track error: ', error);
      return [];
    }
  }

  private createSteps(trackName: string): Step[] {
    try {
      const stepsBasePath = this.tracksFolderPath(trackName) + this.stepsFolderName;
      const steps = readAllFiles(stepsBasePath)
        .map(body => ({ body }));

      return steps;
    } catch (error) {
      console.error('Create step error: ', error);
      return [];
    }
  }
}

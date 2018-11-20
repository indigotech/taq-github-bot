import { Container } from 'typedi';
import { Step, Track } from '@domain';
import { readAllFiles, readFile, readFolder } from './file.utils';

export const TRACKS = 'TRACKS';

export function configureTracks() {
  Container.set(TRACKS, createTracksFromFolder());
}

const TRACKS_FOLDER_PATH = (trackname?: string) => `src/data/local/github/tracks/${trackname || ''}`;
const STEPS_FOLDER_NAME = '/steps';

function createTracksFromFolder(): Track[] {
  try {
    const trackNames = readFolder(TRACKS_FOLDER_PATH())
      .filter(dirname => dirname.startsWith('track-'));

    const tracks = trackNames.map(trackname => ({
      ...JSON.parse(readFile(TRACKS_FOLDER_PATH(trackname), trackname.concat('.json'))),
      steps: createStepsFromTrackFolder(TRACKS_FOLDER_PATH(trackname)),
    }));

    return tracks;
  } catch (error) {
    console.error('Create track error: ', error);
    return [];
  }
}

function createStepsFromTrackFolder(trackFolder: string): Step[] {
  try {
    const stepsBasePath = trackFolder + STEPS_FOLDER_NAME;
    const steps = readAllFiles(stepsBasePath)
      .map(body => ({ body }));

    return steps;
  } catch (error) {
    console.error('Create step error: ', error);
    return [];
  }
}

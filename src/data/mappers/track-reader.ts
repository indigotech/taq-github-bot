import { Step, Track } from '@domain/entities';
import { readdirSync } from 'fs';
import { read } from '@domain/utils/file';

const TRACK_FOLDER_PATH = '../taq-github-bot/src/data/github/tracks/';
const STEPS_FOLDER_NAME = '/steps';

export function createTracksFromFolder(): Track[] {
    const trackFolders = readdirSync(TRACK_FOLDER_PATH);
    const tracks = trackFolders.map(trackFolder => ({
      ...read<Track>(trackFolder, trackFolder.concat('.json')),
      steps: createStepsFromTrackFolder(trackFolder) ,
    }));

    return tracks;
}

function createStepsFromTrackFolder(trackFolder: string): Step[] {
    const stepsBasePath = TRACK_FOLDER_PATH + trackFolder;
    const steps = readdirSync(TRACK_FOLDER_PATH.concat(trackFolder).concat(STEPS_FOLDER_NAME))
        .map(stepFile => read<Step>(stepsBasePath, stepFile));

    return steps;
}

import { Step } from '@domain/entities/step.model';
import { Track } from '@domain/entities/track.model';
import { read, readAllFromFolder, readJson } from '@domain/utils/file';
import { TrackInfo } from '@data/entities/track-info.model';

const TRACK_FOLDER_PATH = '../github/tracks/';
const STEPS_FOLDER_NAME = 'steps';

export class TrackMapper {
  fromFolder(trackFolderName: string): Track {
    const trackFolderPath = TRACK_FOLDER_PATH.concat(trackFolderName);
    const stepsFolderPath = trackFolderPath.concat(STEPS_FOLDER_NAME);

    const trackInfo = readJson<TrackInfo>(trackFolderPath, trackFolderName.concat('.json'));
    const trackBody = read(trackFolderPath, trackInfo.bodyPath.concat('.md'));
    const steps: Step[] = readAllFromFolder(stepsFolderPath).map(stepBody => ({ body: stepBody }));

    return {
      title: trackInfo.title,
      body: trackBody,
      steps,
      openStrategy: trackInfo.openStrategy,
      openStepStrategy: trackInfo.openStepStrategy,
    };
  }
}

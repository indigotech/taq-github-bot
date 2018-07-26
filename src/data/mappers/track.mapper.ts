import { Step, Track } from "domain/entities/track.entity";
import { read } from "domain/utils/file";

const TRACK_FOLDER_PATH = '../github/tracks/';
// const STEPS_FOLDER_NAME = 'steps';

export class TrackMapper {
  fromFolder(trackFolderName: string, trackTitle: string): Track {
    const trackFolderPath = TRACK_FOLDER_PATH.concat(trackFolderName);
    // const stepsFolderPath = trackFolderPath.concat(STEPS_FOLDER_NAME);

    const trackContent = read(trackFolderPath, trackFolderName.concat(".md"));
    // const steps: Step[] = readAllFromFolder(stepsFolderPath).map(stepBody => ({ body: stepBody }));
    const steps: Step[] = [];

    return {
      title: trackTitle,
      description: trackContent,
      steps: steps
    };
  }

}

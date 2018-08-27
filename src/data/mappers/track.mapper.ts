import { TrackInfo } from '@data/entities/track-info.model';
import { Step } from '@domain/entities/step.model';
import { Track } from '@domain/entities/track.model';
import { read, readAllFromFolder } from '@domain/utils/file';
import { TrackInfo } from '@data/entities/track-info.model';
import { Service } from 'typedi';

const TRACK_FOLDER_PATH = '../taq-github-bot/src/data/github/tracks/';
const STEPS_FOLDER_NAME = '/steps';

export function mapTrackerfromFolder(trackFolderName: string): Track {
  const trackFolderPath = TRACK_FOLDER_PATH.concat(trackFolderName);
  const stepsFolderPath = trackFolderPath.concat(STEPS_FOLDER_NAME);

  const trackInfo = read<TrackInfo>(trackFolderPath, trackFolderName.concat('.json'));
  const trackBody = read(trackFolderPath, trackInfo.bodyPath);
  const steps = readAllFromFolder<Step>(stepsFolderPath);

  return {
    title: trackInfo.title,
    body: trackBody,
    steps,
    openStrategy: trackInfo.openStrategy,
    openStepStrategy: trackInfo.openStepStrategy,
  };
}

import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';
import { ConditionType } from './track.model';

export interface EventInfo {
  eventType: ConditionType;
  ref: string;
}

@Service()
export class CheckConditionTypeUseCase {
  constructor(
    private readonly trackDataSource: TrackDataSource,
    private readonly developerDataSource: DeveloperDataSource,
  ) { }

  async execute(developerId: number, conditionType: ConditionType): Promise<boolean> {
    const developer = await this.developerDataSource.get(developerId);
    const currentTrackIndex = developer.progress.track;
    const currentStepIndex = developer.progress.step;
    const tracks = await this.trackDataSource.tracks;

    const currentTrack = tracks[currentTrackIndex];
    const currentCondition = currentTrack.conditions && currentTrack.conditions[currentStepIndex];
    return !!currentCondition && currentCondition.type === conditionType;
  }
}

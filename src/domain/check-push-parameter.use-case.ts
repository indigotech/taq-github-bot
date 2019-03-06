import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';

@Service()
export class CheckPushParameterUseCase {
  constructor(
    private readonly trackDataSource: TrackDataSource,
    private readonly developerDataSource: DeveloperDataSource,
  ) { }

  async execute(developerId: number, refString: string): Promise<boolean> {
    const developer = await this.developerDataSource.get(developerId);
    const currentTrack = developer.progress.track;
    const currentStep = developer.progress.step;
    const tracks = await this.trackDataSource.tracks;
    const currentCondition = tracks[currentTrack].conditions[currentStep];
    return !!currentCondition && refString.search(currentCondition.parameter) !== -1;
  }
}

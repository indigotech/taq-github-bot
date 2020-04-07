import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';

@Service()
export class HasFinishedUseCase {
  constructor(
    private readonly developerDataSource: DeveloperDataSource,
    private readonly tracksDatasource: TrackDataSource,
  ) { }

  async execute(developerId: number): Promise<boolean> {
    const developer = await this.developerDataSource.get(developerId);
    return developer.progress?.completedStepsOverall === this.tracksDatasource.totalSteps;
  }
}

import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';
import Container, { Service } from 'typedi';

@Service()
export class HasFinishedUseCase {
  private readonly developerDataSource = Container.get(DeveloperDataSource);
  private readonly tracksDatasource = Container.get(TrackDataSource);

  async execute(developerId: number): Promise<boolean> {
    const developer = await this.developerDataSource.get(developerId);
    return developer.progress?.completedStepsOverall === this.tracksDatasource.totalSteps;
  }
}

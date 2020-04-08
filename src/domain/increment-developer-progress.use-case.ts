import { RobotError } from '@core';
import { DeveloperDataSource } from '@data/db';
import { Developer } from './developer.model';
import { Service } from 'typedi';
import { IncrementProgressUseCase } from './increment-progress.use-case';

@Service()
export class IncrementDeveloperProgressUseCase {
  constructor(
    private readonly developerDataSource: DeveloperDataSource,
    private readonly nextProgressUseCase: IncrementProgressUseCase,
  ) { }

  async execute(developerId: number): Promise<Developer> {
    const developer: Developer = await this.developerDataSource.get(developerId);

    if (!developer) {
      throw new RobotError(404, `Developer ${developer.developerId} not found`);
    }

    const firstProgress: boolean = !developer.progress;
    const progress = firstProgress ? this.firstProgress() : await this.nextProgressUseCase.execute(developer.progress);

    await this.developerDataSource.update(developerId, { progress });

    return { ...developer, progress };
  }

  private firstProgress() {
    return {
      track: 0,
      step: 0,
      completedStepsOverall: 1,
    };
  }
}

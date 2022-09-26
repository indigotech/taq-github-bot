import { RobotError } from '@core';
import { DeveloperDataSource } from '@data/db';
import Container, { Service } from 'typedi';
import { Developer } from './developer.model';
import { IncrementProgressUseCase } from './increment-progress.use-case';

@Service()
export class IncrementDeveloperProgressUseCase {
  private readonly developerDataSource = Container.get(DeveloperDataSource);
  private readonly nextProgressUseCase = Container.get(IncrementProgressUseCase);

  async execute(developerId: number): Promise<Developer> {
    const developer: Developer = await this.developerDataSource.get(developerId);

    if (!developer) {
      throw new RobotError(404, `Developer ${developer.developerId} not found`);
    }

    const firstProgress = !developer.progress;
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

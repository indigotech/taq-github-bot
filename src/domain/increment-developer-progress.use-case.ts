import { Service } from 'typedi';
import { MathUtils, RobotError } from '@core';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';
import { Developer, DeveloperProgress } from '@domain';
import { IncrementProgressUseCase } from './increment-progress.use-case';

@Service()
export class IncrementDeveloperProgressUseCase {
  constructor(
    private readonly developerDataSource: DeveloperDataSource,
    private readonly trackDataSource: TrackDataSource,
    private readonly nextProgressUseCase: IncrementProgressUseCase,
  ) { }

  async execute(developerId: number): Promise<Developer> {
    const developer: Developer = await this.developerDataSource.get(developerId);

    if (!developer) {
      throw new RobotError(404, 'Developer not found');
    }

    const isFirstProgress: boolean = !developer.progress;

    const progress = isFirstProgress ?
      this.createFirstProgress() :
      await this.nextProgressUseCase.execute(developer.progress);

    await this.developerDataSource.update(developerId, { progress });

    return { ...developer, progress };
  }

  private createFirstProgress(): DeveloperProgress {
    return {
      track: 0,
      step: 0,
      completed: MathUtils.round(this.trackDataSource.incrementProgressStep, 4),
    };
  }
}

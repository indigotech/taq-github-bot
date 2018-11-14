import { Service } from 'typedi';
import { RobotError } from '@core';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';
import { Developer, DeveloperProgress } from '@domain';
import { NextProgressUseCase } from './next-progress.use-case';

@Service()
export class IncrementDevProgressUseCase {
  constructor(
    private readonly developerDataSource: DeveloperDataSource,
    private readonly trackDataSource: TrackDataSource,
    private readonly nextProgressUseCase: NextProgressUseCase,
  ) { }

  async execute(developerId: number): Promise<Developer> {
    const developer: Developer = await this.developerDataSource.get(developerId);

    if (!developer) {
      throw new RobotError(404, 'Developer not found');
    }

    const isFirstProgress: boolean = !developer.progress;
    if (isFirstProgress) {
      developer.progress = this.createFirstProgress();
    } else {
      developer.progress = await this.nextProgressUseCase.execute(developer.progress);
    }

    await this.developerDataSource.createOrUpdate(developer);

    return developer;
  }

  private createFirstProgress(): DeveloperProgress {
    return {
      track: 0,
      step: 0,
      completed: this.trackDataSource.incrementProgressStep,
    };
  }
}

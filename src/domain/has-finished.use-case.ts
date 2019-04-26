import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

@Service()
export class HasFinishedUseCase {
  constructor(private readonly developerDataSource: DeveloperDataSource) {}

  async execute(developerId: number): Promise<boolean> {
    const developer = await this.developerDataSource.get(developerId);
    return developer.progress && developer.progress.completed >= 1;
  }
}

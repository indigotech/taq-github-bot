import { Developer } from '@domain/entities/developer.model';
import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/developer.datasource';

@Service()
export class DeveloperUseCase {

  constructor(
    private developerDataSource: DeveloperDataSource, // Not injecting...
  ) { }

  async saveAsync(developer: Developer): Promise<void> {
    await this.developerDataSource.createAsync(developer);
  }

  async updateAsync(developer: Developer): Promise<void> {
    const updatedDeveloper = await this.getByGithubIdAsync(developer.githubId);
    updatedDeveloper.name = developer.name;
    updatedDeveloper.currentTrack = developer.currentTrack;
    updatedDeveloper.currentStep = developer.currentStep;

    return await this.developerDataSource.updateAsync(updatedDeveloper);
  }

  async getByGithubIdAsync(githubId: number): Promise<Developer> {
    return await this.developerDataSource.getByGithubIdAsync(githubId);
  }
}

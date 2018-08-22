import { TrackDataSource } from '@data/track.datasource';
import { Developer } from '@domain/entities/developer.model';
import { Track } from '@domain/entities/track.model';
import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/developer.datasource';

@Service()
export class DeveloperUseCase {

  constructor(
    private trackDataSource: TrackDataSource,
    private developerDataSource: DeveloperDataSource, // Not injecting...
  ) { }

  async saveAsync(developer: Developer): Promise<void> {
    await this.developerDataSource.createAsync(developer);
  }

  async getByGithubIdAsync(githubId: number): Promise<Developer> {
    return await this.developerDataSource.getByGithubId(githubId);
  }

  getNextTrack(developer: Developer): Track {
    return this.trackDataSource.getTrack(developer.currentTrack + 1);
  }
}

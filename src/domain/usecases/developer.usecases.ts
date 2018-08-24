import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/developer.datasource';
import { TrackDataSource } from '@data/track.datasource';
import { Developer } from '@domain/entities/developer.model';
import { Track } from '@domain/entities/track.model';

@Service()
export class DeveloperUseCase {

  constructor(
    private readonly trackDataSource: TrackDataSource,
    private readonly developerDataSource: DeveloperDataSource,
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

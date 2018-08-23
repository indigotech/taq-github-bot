import { Developer } from '@domain/entities/developer.model';
import { Service } from 'typedi';
import { TrackDataSource } from '@data/track.datasource';
import { DeveloperUseCase } from '@domain/usecases/developer.usecases';
import { Track } from '@domain/entities/track.model';

@Service()
export class TrackUseCase {

  constructor(
    private trackDataSource: TrackDataSource, // Not injecting...
    private developerUseCase: DeveloperUseCase,
  ) { }

  async getNextTrack(developer: Developer): Promise<Track> {
    // TODO: What should we do when there's no more tracks to open?
    return this.trackDataSource.getTrackByIndex(developer.currentTrack + 1);
  }

  async onNextTrackOpened(developer: Developer): Promise<void> {
    const updatedDeveloper = await this.developerUseCase.getByGithubIdAsync(developer.githubId);
    updatedDeveloper.currentTrack++;

    return await this.developerUseCase.updateAsync(updatedDeveloper);
  }

  async onNextStepOpened(developer: Developer): Promise<void> {
    const updatedDeveloper = await this.developerUseCase.getByGithubIdAsync(developer.githubId);
    updatedDeveloper.currentTrack++;

    return await this.developerUseCase.updateAsync(updatedDeveloper);
  }
}

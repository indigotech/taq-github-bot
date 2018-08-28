import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { TrackDataSource } from '@data/local';
import { Developer, DeveloperInput, getDeveloper, Track } from '@domain/entities';

@Service()
export class NextStepUseCase {
  constructor(
    private readonly developerDataSource: DeveloperDataSource,
    private readonly trackDataSource: TrackDataSource,
  ) { }

  async execute(input: DeveloperInput): Promise<Track> {
    const developer: Developer = await this.developerDataSource.get(input.githubId);

    if (!developer) {
      await this.developerDataSource.createOrUpdate(getDeveloper(input));
      return this.trackDataSource.getFirstTrack();
    }

    const tracks: Track[] = this.trackDataSource.getAllTracks();
    const currentTrackIndex: number = developer.currentTrack;
    const currentStepIndex: number = developer.currentStep;
    const currentTrack: Track = tracks[developer.currentTrack];

    const newStepIndex = currentStepIndex + 1;
    const hasMoreSteps: boolean = currentTrack.steps.length > newStepIndex;

    if (hasMoreSteps) {
      await this.developerDataSource.createOrUpdate(getDeveloper(developer, currentTrackIndex, newStepIndex));
      currentTrack.steps = currentTrack.steps.slice(0, newStepIndex + 1);
      return currentTrack;
    }

    const newTrackIndex = currentTrackIndex + 1;
    const hasMoreTracks: boolean = tracks.length > newTrackIndex;

    if (hasMoreTracks) {
      await this.developerDataSource.createOrUpdate(getDeveloper(developer, newTrackIndex, 0));
      return this.trackDataSource.initiateTrack(newTrackIndex);
    }

    return null;
  }
}

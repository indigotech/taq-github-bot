import { TrackDataSource } from '@data/track.datasource';
import { Developer } from '@domain/entities/developer.model';
import { Track } from '@domain/entities/track.model';

export class DeveloperUseCases {

  constructor(
    private trackDataSource: TrackDataSource,
  ) { }

  getNextTrack(developer: Developer): Track {
    return this.trackDataSource.getTrack(developer.currentTrack);
  }
}

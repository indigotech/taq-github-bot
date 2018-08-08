import { TrackDataSource } from "data/track.datasource";
import { Track } from "domain/entities/track.model";
import { Developer } from "domain/entities/developer.model";

export class DeveloperUseCases {

  constructor(
    private trackDataSource: TrackDataSource,
  ) { }

  getNextTrack(developer: Developer): Track {
    return this.trackDataSource.getTrack(developer.currentTrack);
  }
}

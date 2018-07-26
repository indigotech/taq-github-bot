import { Track } from "domain/entities/track.entity";
import { TrackMapper } from "./mappers/track.mapper";

export class OnboardDataSource {
  private readonly tracks: Track[];

  constructor(private trackMapper: TrackMapper) {
    this.tracks = this.createTracks();
    console.log(this.tracks);
  }

  private createTracks() {
    return [
      this.trackMapper.fromFolder('track-1', '[Track 1]: Teste'),
    ];
  }

  getTrack(trackIndex: number): Track {
    try {
      return this.tracks[trackIndex];
    } catch (error) {
      return {} as Track;
    }
  }
}

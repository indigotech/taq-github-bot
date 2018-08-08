import { Track } from 'domain/entities/track.model';
import { TrackMapper } from './mappers/track.mapper';

export class TrackDataSource {
  private readonly tracks: Track[];

  constructor(private trackMapper: TrackMapper) {
    this.tracks = this.createTracksFromFolder();
  }

  getTrack(trackIndex: number): Track {
    try {
      return this.tracks[trackIndex];
    } catch (error) {
      return {} as Track;
    }
  }

  getAll() {
    return this.tracks;
  }

  private createTracksFromFolder(): Track[] {
    const trackFolders = ['track-1'];

    return trackFolders.map(trackFolder => this.trackMapper.fromFolder(trackFolder));
  }
}

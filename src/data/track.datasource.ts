import { Service } from 'typedi';
import { Track } from '@domain/entities/track.model';
import { createTracksFromFolder } from '@data/github/track-reader';

@Service()
export class TrackDataSource {
  private readonly tracks: Track[];

  constructor() {
    this.tracks = createTracksFromFolder();
  }

  getTrackByIndex(trackIndex: number): Track {
    try {
      return this.tracks[trackIndex];
    } catch (error) {
      return {} as Track;
    }
  }

  getAll() {
    return this.tracks;
  }
}

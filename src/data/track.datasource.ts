import { Service } from 'typedi';
import { createTracksFromFolder } from '@data/track.utils';
import { Track } from '@domain/entities/track.model';

@Service()
export class TrackDataSource {
  private readonly tracks: Track[];

  constructor() {
    this.tracks = createTracksFromFolder();
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
}

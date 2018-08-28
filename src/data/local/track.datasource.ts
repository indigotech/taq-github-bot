import { Service } from 'typedi';
import { copyDeep } from '@data/local/track.utils';
import { Track } from '@domain/entities';
import { createTracksFromFolder } from './github';

@Service()
export class TrackDataSource {
  private readonly tracks: Track[];

  constructor() {
    this.tracks = createTracksFromFolder();
  }

  getFirstTrack(): Track {
    return this.initiateTrack(0);
  }

  initiateTrack(index: number): Track {
    const track = copyDeep<Track>(this.tracks[index]);
    track.steps = track.steps.slice(0, 1);
    return track;
  }

  getAllTracks(): Track[] {
    return copyDeep<Track[]>(this.tracks);
  }
}

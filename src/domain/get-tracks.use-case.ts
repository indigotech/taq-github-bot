import { Service } from 'typedi';
import { TrackDataSource } from '@data/local';
import { Track } from './track.model';

@Service()
export class GetTracksUseCase {
  constructor(private readonly dataSource: TrackDataSource) {}

  exec(): Promise<{ tracks: ReadonlyArray<Track>; totalSteps: number }> {
    return Promise.resolve({ tracks: this.dataSource.tracks, totalSteps: this.dataSource.totalSteps });
  }
}

import { Service } from 'typedi';
import { TrackDataSource } from '@data/local';
import { Track } from './track.model';

@Service()
export class GetTracksUseCase {
  constructor(private readonly dataSource: TrackDataSource) {}

  exec(): Promise<ReadonlyArray<Track>> {
    return Promise.resolve(this.dataSource.tracks);
  }
}

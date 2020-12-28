import { TrackDataSource } from '@data/local';
import Container, { Service } from 'typedi';
import { Track } from './track.model';

@Service()
export class GetTracksUseCase {
  private readonly dataSource = Container.get(TrackDataSource);

  exec(): Promise<{ tracks: ReadonlyArray<Track>; totalSteps: number }> {
    return Promise.resolve({ tracks: this.dataSource.tracks, totalSteps: this.dataSource.totalSteps });
  }
}

import { expect } from 'chai';
import { createTrack } from 'test/seed/track.seed';
import { TrackDataSource } from '@data/local';
import { IncrementProgressUseCase } from '@domain/increment-progress.use-case';

describe('IncrementProgressUseCase', () => {
  let incrementProgressUseCase: IncrementProgressUseCase;

  before(() => {
    const tracks = [3, 5, 4].map((stepsNumber: number, i: number) => {
      return createTrack(i, stepsNumber);
    });
    incrementProgressUseCase = new IncrementProgressUseCase(new TrackDataSource(tracks));
  });

  it('should increment first progress possible', async () => {
    const result = await incrementProgressUseCase.execute({ track: 0, step: 0, completedStepsOverall: 1 });
    expect(result).to.be.deep.eq({ track: 0, step: 1, completedStepsOverall: 2 });
  });

  it('should increment track', async () => {
    const result = await incrementProgressUseCase.execute({ track: 0, step: 2, completedStepsOverall: 3 });
    expect(result).to.be.deep.eq({ track: 1, step: 0, completedStepsOverall: 4 });
  });

  it('should increment middle progress', async () => {
    const result = await incrementProgressUseCase.execute({ track: 1, step: 2, completedStepsOverall: 6 });
    expect(result).to.be.deep.eq({ track: 1, step: 3, completedStepsOverall: 7 });
  });

  it('should throw error if there are no more tracks', async () => {
    try {
      await incrementProgressUseCase.execute({ track: 2, step: 3, completedStepsOverall: 12 });
      throw new Error('Should not pass here');
    } catch (error) {
      expect(error.code).to.be.eq(500);
    }
  });
});

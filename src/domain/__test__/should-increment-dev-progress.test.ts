import { DeveloperDataSource } from '@data/db';
import { Developer } from '@domain/developer.model';
import { CommentInfo, ShouldIncrementDevProgressUseCase } from '@domain/should-increment-dev-progress.use-case';

describe('Comment received', () => {
  let shouldIncrementUseCase: ShouldIncrementDevProgressUseCase;
  let developerId: number;
  let issueId: number;

  beforeAll(() => {
    shouldIncrementUseCase = new ShouldIncrementDevProgressUseCase(new DeveloperDataSource(null));

    developerId = 123;
    issueId = 456;
    const developer: Developer = { developerId, issueId, name: null, progress: null };
    DeveloperDataSource.prototype.get = jest.fn<Developer>(() => developer);
  });

  it('should validate "finish" anywhere on sentence, and its variations', async () => {
    const commentCases: string[] = [
      'finish',
      'Finish',
      'FINISH',
      'finished',
      'I have finished.',
      'Finished I have, master Yoda.',
    ];

    const commentInfo: CommentInfo[] = commentCases.map(comment => ({ developerId, issueId, comment }));

    await Promise.all(commentInfo.map(async info => {
      const shouldIncrement: boolean = await shouldIncrementUseCase.execute(info);
      expect(shouldIncrement).toBe(true);
    }));
  });

  it('should validate "next" anywhere on sentence, and its variations', async () => {
    const commentCases: string[] = [
      'next',
      'Next',
      'NEXT',
      'finished',
      'I want to go next.',
      'Next I want to go, master Yoda.',
    ];

    const commentInfo: CommentInfo[] = commentCases.map(comment => ({ developerId, issueId, comment }));

    await Promise.all(commentInfo.map(async info => {
      const shouldIncrement: boolean = await shouldIncrementUseCase.execute(info);
      expect(shouldIncrement).toBe(true);
    }));
  });

  it('should not validate other sentences', async () => {
    const commentCases: string[] = [
      'Any sentence.',
      'Wrong Finis h',
      'Wrong Nex t',
      '',
    ];

    const commentInfo: CommentInfo[] = commentCases.map(comment => ({ developerId, issueId, comment }));

    await Promise.all(commentInfo.map(async info => {
      const shouldIncrement: boolean = await shouldIncrementUseCase.execute(info);
      expect(shouldIncrement).not.toBe(true);
    }));
  });
});

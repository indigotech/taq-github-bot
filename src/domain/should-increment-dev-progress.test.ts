import { expect } from 'chai';
import * as sinon from 'sinon';
import Container from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { Developer } from './developer.model';
import { CommentInfo, ShouldIncrementDevProgressUseCase } from './should-increment-dev-progress.use-case';
import { FirestoreClientMock } from 'test/webhook-simulations/firestore-client-mock.test';
import { FirestoreClient } from '@data/db/firestore.client';

// tslint:disable: no-unused-expression

describe('ShouldIncrementDevProgressUseCase', () => {
  let shouldIncrementUseCase: ShouldIncrementDevProgressUseCase;
  let developerId: number;
  let issueId: number;

  before(() => {
    Container.set(FirestoreClient, new FirestoreClientMock());
    const datasource = Container.get(DeveloperDataSource);
    shouldIncrementUseCase = Container.get(ShouldIncrementDevProgressUseCase);

    developerId = 123;
    issueId = 456;
    const developer: Developer = { developerId, issueId, name: null, progress: null };
    sinon.stub(datasource, 'get').callsFake(async () => developer);
  });

  after(() => {
    Container.reset();
    sinon.restore();
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
      expect(shouldIncrement).to.be.true;
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
      expect(shouldIncrement).to.be.true;
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
      expect(shouldIncrement).not.to.be.true;
    }));
  });
});

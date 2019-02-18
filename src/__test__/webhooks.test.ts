import { DBClient, REDIS } from '@data/db';
import { TrackDataSource } from '@data/local';
import { TRACKS } from '@data/local/track.configure';
import { Developer, Track } from '@domain';
import IORedis from 'ioredis';
import nock from 'nock';
import { Application, Probot } from 'probot';
import 'reflect-metadata';
import Container from 'typedi';
import myProbotApp from '../';
import { GithubEvents } from '../github-events.constants';
import { DeveloperSeed } from './seed';

// tslint:disable:max-line-length

const installationPayload = require('./webhook-simulations/installation.payload.json');
const commentFinishPayload = require('./webhook-simulations/comment-finish.payload.json');

nock.disableNetConnect();

describe('Webhooks', () => {
  let db: IORedis.Redis;
  let developerSeed: DeveloperSeed;
  let probot: Probot;
  let app: Application;
  let defaultUserId: number;

  beforeAll(() => {
    process.env.REDIS_URL = '6380';
    Container.get(DBClient);

    developerSeed = new DeveloperSeed();

    db = Container.get(REDIS);

    defaultUserId = installationPayload.sender.id;
  });

  afterAll(() => {
    developerSeed.disconnect();
    Container.reset();
  });

  beforeEach(async () => {
    await developerSeed.reset();

    probot = new Probot({});
    app = probot.load(myProbotApp);
    app.app = () => 'test';
  });

  describe('Installation', () => {

    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/318098/access_tokens').reply(200, { token: 'test' });
    });

    describe('New user', () => {
      it('should create user on database with no progress', async () => {
        const mockResponse = require('./mocks/CreateIssueMockResponse.json');
        nock('https://api.github.com').post('/repos/alanraso/teste-probot-2/issues', _ => true).reply(201, mockResponse);

        await probot.receive({ name: GithubEvents.Installation.Created, payload: installationPayload });
        const devDb = await db.get(defaultUserId.toString());
        const developer = JSON.parse(devDb);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toBeNull();
      });

      it('should create first issue', async () => {
        const firstTrack: Track = Container.get<Track[]>(TRACKS)[0];
        const firstIssueData = { title: firstTrack.title, body: firstTrack.steps[0].body };

        nock('https://api.github.com').post('/repos/alanraso/teste-probot-2/issues', reqBody => {
          expect(reqBody).toMatchObject(firstIssueData);
          return true;
        }).reply(201);

        await probot.receive({ name: GithubEvents.Installation.Created, payload: installationPayload });
      });
    });

    describe('Existing user', () => {
      it('should do nothing', async () => {
        const context = { name: GithubEvents.Installation.Created, payload: installationPayload };

        await developerSeed.createNewUser(defaultUserId);

        const devDbBefore = await db.get(defaultUserId.toString());
        await probot.receive(context);
        const devDbAfter = await db.get(defaultUserId.toString());

        expect(devDbBefore).toBe(devDbAfter);
      });
    });
  });

  describe('Comment', () => {
    beforeAll(() => {
      defaultUserId = commentFinishPayload.sender.id;
    });

    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/645396/access_tokens').reply(200, { token: 'test' });
    });

    describe('First task completed', () => {

      it('should create a progress for developer', async () => {
        const issueId = commentFinishPayload.issue.id;
        await developerSeed.createNewUser(defaultUserId, issueId);
        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);
        const trackDataSource: TrackDataSource = Container.get(TrackDataSource);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track: 0, step: 0, completed: trackDataSource.incrementProgressStep });
      });

      it('should post comment with next step', async () => {
        const issueId = commentFinishPayload.issue.id;
        await developerSeed.createNewUser(defaultUserId, issueId);
        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track: 0, step: 0, completed: trackDataSource.incrementProgressStep });
      });
    });

    it('should increment only step', async () => {
      const issueId = commentFinishPayload.issue.id;
      await developerSeed.createNewUser(defaultUserId, issueId);
      await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

      const devDb: string = await db.get(defaultUserId.toString());
      const developer: Developer = JSON.parse(devDb);
      const trackDataSource: TrackDataSource = Container.get(TrackDataSource);

      expect(developer.developerId).toBe(defaultUserId);
      expect(developer.issueId).not.toBeNull();
      expect(developer.progress).toMatchObject({ track: 0, step: 0, completed: trackDataSource.incrementProgressStep });
    });
  });
});

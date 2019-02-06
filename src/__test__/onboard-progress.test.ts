import 'reflect-metadata';
import IORedis from 'ioredis';
import nock from 'nock';
import { Application, Probot } from 'probot';
import Container from 'typedi';
import { DBClient, REDIS } from '@data/db';
import myProbotApp from '../';
import { GithubEvents } from '../github-events.constants';
import { DeveloperSeed, TrackSeed } from './seed';

const commentFinishPayload = require('./webhook-simulations/comment-finish.payload.json');

nock.disableNetConnect();

describe('Onboard progress', () => {
  let db: IORedis.Redis;
  let developerSeed: DeveloperSeed;
  let trackSeed: TrackSeed;
  let probot: Probot;
  let app: Application;
  let defaultUserId: number;

  const TracksNumber = 3;
  const StepsPerTrack = [2, 5, 3];
  const ProgressIncrement = 0.1; // (1 / Total steps)

  beforeAll(() => {
    process.env.REDIS_URL = '6380';
    Container.get(DBClient);

    developerSeed = new DeveloperSeed();
    trackSeed = new TrackSeed();
    db = Container.get(REDIS);

    defaultUserId = commentFinishPayload.sender.id;
  });

  afterAll(() => {
    developerSeed.disconnect();
    Container.reset();
  });

  beforeEach(async (): Promise<void> => {
    await developerSeed.reset();
    trackSeed.createTracks(TracksNumber, StepsPerTrack);

    probot = new Probot({});
    app = probot.load(myProbotApp);
    app.app = () => 'test';

    nock('https://api.github.com').post('/app/installations/645396/access_tokens').reply(200, { token: 'test' });

    return;
  });

  it('should create progress on first task completed', async () => {
    await developerSeed.createNewUser(defaultUserId);

    console.log('111111');
    try {
      await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
    } catch (error) {
      console.error('ERRRRRROU');
      console.error(error);
    }

    console.log('2222222');
    const devDb = await db.get(defaultUserId.toString());
    const developer = JSON.parse(devDb);

    console.log('33333333');
    expect(developer.developerId).toBe(defaultUserId);
    expect(developer.issueId).not.toBeNull();
    expect(developer.progress).toMatchObject({ track: 0, step: 0, completed: ProgressIncrement });
  });
});

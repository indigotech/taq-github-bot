import 'reflect-metadata';
import IORedis from 'ioredis';
import * as nock from 'nock';
import { Probot } from 'probot';
import Container from 'typedi';
import myProbotApp from '../src';
import { DeveloperSeed, REDIS_CLIENT_TEST, TrackSeed } from './seed';

nock.disableNetConnect();

describe('Installation', () => {
  let developerSeed: DeveloperSeed;
  let probot: Probot;

  beforeAll(() => {
    process.env.REDIS_DB_PARAM_TEST = '6380';
    Container.set(REDIS_CLIENT_TEST, new IORedis(process.env.REDIS_DB_PARAM_TEST));

    developerSeed = new DeveloperSeed();
    new TrackSeed().createTracks();
  });

  afterAll(() => {
    developerSeed.disconnect();
  });

  beforeEach(async () => {
    await developerSeed.reset();
    probot = new Probot({});
    const app = probot.load(myProbotApp);
    app.app = () => 'test';
  });

  // TODO: Run bot and tests with yarn test
  test('should test', async () => {
    expect(1).toBe(1);
  });
});

import 'reflect-metadata';
import IORedis from 'ioredis';
import nock from 'nock';
import { Application, Probot } from 'probot';
import Container from 'typedi';
import { DBClient, REDIS } from '@data/db';
import myProbotApp from '../';
import { GithubEvents } from '../github-events.constants';
import { DeveloperSeed } from './seed';

const installationPayload = require('./webhook-simulations/installation.payload.json');

nock.disableNetConnect();

describe('Installation', () => {
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

  beforeEach(async (): Promise<void> => {
    await developerSeed.reset();

    probot = new Probot({});
    app = probot.load(myProbotApp);
    app.app = () => 'test';

    nock('https://api.github.com').post('/app/installations/318098/access_tokens').reply(200, { token: 'test' });

    return;
  });

  it('should create new user with no progress', async () => {
    await probot.receive({ name: GithubEvents.Installation.Created, payload: installationPayload });
    const devDb = await db.get(defaultUserId.toString());
    const developer = JSON.parse(devDb);

    expect(developer.developerId).toBe(defaultUserId);
    expect(developer.issueId).not.toBeNull();
    expect(developer.progress).toBeNull();
  });

  it('should do nothing if user exists', async () => {
    const context = { name: GithubEvents.Installation.Created, payload: installationPayload };

    await developerSeed.createNewUser(defaultUserId);

    const devDbBefore = await db.get(defaultUserId.toString());
    await probot.receive(context);
    const devDbAfter = await db.get(defaultUserId.toString());

    expect(devDbBefore).toBe(devDbAfter);
  });
});

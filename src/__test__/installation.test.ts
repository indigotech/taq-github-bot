import 'reflect-metadata';
import nock from 'nock';
import { Application, Probot } from 'probot';
import Container from 'typedi';
import { DBClient } from '@data/db';
import { Developer } from '@domain';
import myProbotApp from '../';
import { GithubEvents } from '../github-events.constants';
import { DeveloperSeed, TrackSeed } from './seed';

const installationPayload = require('./webhook-simulations/installation.payload.json');

nock.disableNetConnect();

describe('Installation', () => {
  let db: DBClient;
  let developerSeed: DeveloperSeed;
  let trackSeed: TrackSeed;
  let probot: Probot;
  let app: Application;
  let defaultUserId: number;

  beforeAll(() => {
    process.env.REDIS_URL = '6380';
    db = Container.get(DBClient);

    developerSeed = Container.get(DeveloperSeed);
    trackSeed = new TrackSeed();
    defaultUserId = installationPayload.sender.id;
  });

  afterAll(() => {
    developerSeed.disconnect();
    Container.reset();
  });

  beforeEach(async (): Promise<void> => {
    await developerSeed.reset();
    trackSeed.createTracks();

    probot = new Probot({});
    app = probot.load(myProbotApp);
    app.app = () => 'test';

    return;
  });

  it('should create new user with no progress', async () => {
    nock('https://api.github.com').post('/app/installations/318098/access_tokens').reply(200, { token: 'test' });

    await probot.receive({ name: GithubEvents.Installation.Created, payload: installationPayload });
    const developer: Developer = await db.getObject<Developer>(defaultUserId.toString());

    expect(developer.developerId).toBe(defaultUserId);
    expect(developer.progress).toBeNull();
  });

  it('should do nothing if user exists', async () => {
    nock('https://api.github.com').post('/app/installations/318098/access_tokens').reply(200, { token: 'test' });
    const context = { name: GithubEvents.Installation.Created, payload: installationPayload };

    await developerSeed.createNewUser(defaultUserId);
    await probot.receive(context);

    const users: string[] = await developerSeed.getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toBe(defaultUserId.toString());
  });
});

import 'reflect-metadata';
import IORedis from 'ioredis';
import nock from 'nock';
import { Application, Probot } from 'probot';
import Container from 'typedi';
import { REDIS } from '@data/db';
import { TRACKS } from '@data/local/track.configure';
import { Developer, Track } from '@domain';
import { CommentReceiver, InstallationReceiver } from '@presentation';
import { RobotStrings } from '@presentation/robot.strings';
import { GithubEvents } from '../github-events.constants';
import { Robot } from '../robot';
import { DeveloperSeed } from './seed';
import { TrackSeed } from './seed/track.seed';

// tslint:disable:max-line-length

const installationPayload = require('./webhook-simulations/installation.payload.json');
const commentFinishPayload = require('./webhook-simulations/comment-finish.payload.json');

nock.disableNetConnect();

describe('Webhooks', () => {
  let db: IORedis.Redis;
  let developerSeed: DeveloperSeed;
  let trackSeed: TrackSeed;
  let probot: Probot;
  let app: Application;
  let taqBot: Robot;

  let defaultUserId: number;
  let stepsPerTrack: number[];
  let stepProgress: number;

  beforeAll(() => {
    Container.set(REDIS, new IORedis('6380'));
    db = Container.get(REDIS);

    trackSeed = new TrackSeed();
    developerSeed = new DeveloperSeed(db);

    defaultUserId = installationPayload.sender.id;
    stepsPerTrack = [2, 5, 3];
    stepProgress = 0.1;
  });

  beforeEach(async () => {
    Container.set(REDIS, db);

    trackSeed.createTracks(stepsPerTrack);
    await developerSeed.reset();

    taqBot = new Robot(Container.get(InstallationReceiver), Container.get(CommentReceiver));

    probot = new Probot({});
    probot.logger.level('fatal');
    app = probot.load(taqBot.webhookReceiver);
    app.app = () => 'test';
  });

  afterEach(() => {
    Container.reset();
  });

  afterAll(() => {
    db.disconnect();
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

      it('should do nothing if developer is already created', async () => {
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

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track: 0, step: 0, completed: stepProgress });
      });

      it('should post comment with next step', async () => {
        const issueId = commentFinishPayload.issue.id;
        await developerSeed.createNewUser(defaultUserId, issueId);

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).toBe(trackSeed.tracks[0].steps[1].body);
          return true;
        }).reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await developerSeed.createNewUser(defaultUserId, lastId);
        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Intermediary step of task completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const track = 1;
      const stepBefore = 2;
      const progressPercentageBefore: number = 0.5;
      const progressPercentageAfter: number = 0.6;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track, step: stepBefore, completed: progressPercentageBefore },
        });
      });

      it('should increment only step', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track, step: stepBefore + 1, completed: progressPercentageAfter });
      });

      it('should post comment with next step to be done', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).toBe(trackSeed.tracks[1].steps[stepBefore + 2].body);
          return true;
        }).reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Last step of an intermediary task completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const trackBefore = 1;
      const stepBefore = 3;
      const progressPercentageBefore: number = 0.6;
      const progressPercentageAfter: number = 0.7;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track: trackBefore, step: stepBefore, completed: progressPercentageBefore },
        });
      });

      it('should increment track', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues').reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track: trackBefore, step: stepBefore + 1, completed: progressPercentageAfter });
      });

      it('should post finished track comment and create new issue (track)', async () => {
        const issueUrl = 'http://www.github.com/new-track-url';

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues', data => {
          expect(data.title).toBe(trackSeed.tracks[trackBefore + 1].title);
          expect(data.body).toBe(trackSeed.tracks[trackBefore + 1].steps[0].body);
          return true;
        }).reply(201, { html_url: issueUrl });

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).toBe(RobotStrings.NextTrack(issueUrl));
          return true;
        }).reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Last step of entire onboard completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const track = 2;
      const stepBefore = 1;
      const progressPercentageBefore: number = 0.9;
      const progressPercentageAfter: number = 1;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track, step: stepBefore, completed: progressPercentageBefore },
        });
      });

      it('should increment developer and have 100% progress', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).toBe(defaultUserId);
        expect(developer.issueId).not.toBeNull();
        expect(developer.progress).toMatchObject({ track, step: stepBefore + 1, completed: progressPercentageAfter });
      });

      it('should comment congratulating user for finishing', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).toBe(RobotStrings.FinishOnboard);
          return true;
        }).reply(201);

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('After onboard compeleted', () => {
      it('should do nothing', async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId: 123,
          progress: { track: 2, step: 3, completed: 1 },
        });

        const devDbBefore = await db.get(defaultUserId.toString());
        await probot.receive({ name: GithubEvents.Installation.Created, payload: installationPayload });
        const devDbAfter = await db.get(defaultUserId.toString());

        expect(devDbBefore).toBe(devDbAfter);
      });
    });
  });
});

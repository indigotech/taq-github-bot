import 'reflect-metadata';
import { expect } from 'chai';
import nock from 'nock';
import { createProbot, Probot } from 'probot';
import * as redis from 'redis';
import { Container } from 'typedi';
import { DBClient, REDIS } from '@data/db';
import { TRACKS } from '@data/local/track.configure';
import { Developer } from '@domain/developer.model';
import { Track } from '@domain/track.model';
import { RobotStrings } from '@presentation/robot.strings';
import { GithubEvents } from '../github-events.constants';
import { Robot } from '../robot';
import { DeveloperSeed } from './seed';
import { TrackSeed } from './seed/track.seed';

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

const installationPayload = require('./webhook-simulations/installation.payload.json');
const installationWithRequesterPayload = require('./webhook-simulations/installation-with-requester.payload.json');
const commentFinishPayload = require('./webhook-simulations/comment-finish.payload.json');

describe('Webhooks', () => {
  const defaultId = '2ad1ce00-75d8-11ea-8f0b-8dd55d1cefec';
  const totalSteps = 10;

  let db: redis.RedisClient;
  let developerSeed: DeveloperSeed;
  let trackSeed: TrackSeed;
  let probot: Probot;
  let taqBot: Robot;

  let defaultUserId: number;
  let stepsPerTrack: number[];

  before(async () => {
    db = redis.createClient({ port: 6380 });
    Container.set(REDIS, db);
    console.log('No teste:', Container.get(DBClient));
    trackSeed = new TrackSeed();
    developerSeed = new DeveloperSeed(db);

    await developerSeed.reset();

    defaultUserId = installationPayload.sender.id;
    stepsPerTrack = [2, 5, 3];
    trackSeed.createTracks(stepsPerTrack);

    taqBot = Container.get(Robot);
    probot = createProbot({ id: 1, cert: 'test', githubToken: 'test' });
    probot.load(taqBot.webhookReceiver);
    probot.logger.level('fatal');
  });

  beforeEach(async () => {
    nock.disableNetConnect();
  });

  afterEach(async () => {
    await developerSeed.reset();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  after(() => {
    db.disconnect();
  });

  describe('Installation', () => {
    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/7749501/access_tokens').reply(200, { token: 'test' });
    });

    describe('New user', () => {
      it('should create sender user on database with no progress', async () => {
        const mockResponse = require('./mocks/CreateIssueMockResponse.json');
        nock('https://api.github.com').post('/repos/alanraso/teste-probot-2/issues', _ => true).reply(201, mockResponse);

        console.log('------------------');
        await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload });
        console.log('------------------');
        const devDb = await db.get(defaultUserId.toString());
        const developer = JSON.parse(devDb);

        expect(developer.developerId).to.be.eq(defaultUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.null;
      });

      it('should create requester user on database with no progress', async () => {
        const mockResponse = require('./mocks/CreateIssueMockResponse.json');
        nock('https://api.github.com').post('/repos/alanraso/teste-probot-2/issues', _ => true).reply(201, mockResponse);
        const requesterUserId: number = 12345678;

        await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationWithRequesterPayload });
        const devDb = await db.get(requesterUserId.toString());
        const developer = JSON.parse(devDb);

        expect(developer.developerId).to.be.eq(requesterUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.null;
      });

      it('should create first issue', async () => {
        const firstTrack: Track = Container.get<Track[]>(TRACKS)[0];
        const firstIssueData = { title: firstTrack.title, body: firstTrack.steps[0].body };

        nock('https://api.github.com').post('/repos/alanraso/teste-probot-2/issues', reqBody => {
          expect(reqBody).to.be.deep.eq(firstIssueData);
          return true;
        }).reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload });
      });

      it('should do nothing if developer is already created', async () => {
        const context = { id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload };

        await developerSeed.createNewUser(defaultUserId);

        const devDbBefore = await db.get(defaultUserId.toString());
        await probot.receive(context);
        const devDbAfter = await db.get(defaultUserId.toString());

        expect(devDbBefore).to.be.eq(devDbAfter);
      });
    });
  });

  describe('Comment', () => {
    before(() => {
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

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).to.be.eq(defaultUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.deep.eq({ track: 0, step: 0, completedStepsOverall: 1 });
      });

      it('should post comment with next step', async () => {
        const issueId = commentFinishPayload.issue.id;
        await developerSeed.createNewUser(defaultUserId, issueId);

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).to.be.eq(trackSeed.tracks[0].steps[1].body);
          return true;
        }).reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await developerSeed.createNewUser(defaultUserId, lastId);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Intermediary step of task completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const track = 1;
      const stepBefore = 2;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track, step: stepBefore, completedStepsOverall: 5 },
        });
      });

      it('should increment only step', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).to.be.eq(defaultUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.deep.eq({ track, step: stepBefore + 1, completedStepsOverall: 6 });
      });

      it('should post comment with next step to be done', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).to.be.eq(trackSeed.tracks[1].steps[stepBefore + 2].body);
          return true;
        }).reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Last step of an intermediary task completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const trackBefore = 1;
      const stepBefore = 3;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track: trackBefore, step: stepBefore, completedStepsOverall: 6 },
        });
      });

      it('should increment track', async () => {
        const issueUrl = 'http://www.github.com/new-track-url';

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues').reply(201, { id: '24', html_url: issueUrl });
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).to.be.eq(RobotStrings.NextTrack(issueUrl));
          return true;
        }).reply(201);
        console.log('TESTE');
        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        console.log('AAA');
        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);
        console.log('BBBBBBBBBB');
        expect(developer.developerId).to.be.eq(defaultUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.deep.eq({ track: trackBefore, step: stepBefore + 1, completedStepsOverall: 7 });
      });

      it('should post finished track comment and create new issue (track)', async () => {
        console.log('OUTRO TESTE');
        const issueUrl = 'http://www.github.com/new-track-url';

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues', data => {
          expect(data.title).to.be.eq(trackSeed.tracks[trackBefore + 1].title);
          expect(data.body).to.be.eq(trackSeed.tracks[trackBefore + 1].steps[0].body);
          return true;
        }).reply(201, { id: '24', html_url: issueUrl });

        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).to.be.eq(RobotStrings.NextTrack(issueUrl));
          return true;
        }).reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('Last step of entire onboard completed', () => {
      const issueId = commentFinishPayload.issue.id;
      const track = 2;
      const stepBefore = 1;

      beforeEach(async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId,
          progress: { track, step: stepBefore, completedStepsOverall: 9 },
        });
      });

      it('should increment developer and have 100% progress', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments').reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

        const devDb: string = await db.get(defaultUserId.toString());
        const developer: Developer = JSON.parse(devDb);

        expect(developer.developerId).to.be.eq(defaultUserId);
        expect(developer.issueId).not.to.be.null;
        expect(developer.progress).to.be.deep.eq({ track, step: stepBefore + 1, completedStepsOverall: 10 });
      });

      it('should comment congratulating user for finishing', async () => {
        nock('https://api.github.com').post('/repos/alanraso/teste-probot/issues/24/comments', data => {
          expect(data.body).to.be.eq(RobotStrings.FinishOnboard);
          return true;
        }).reply(201);

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      });

      it('should do nothing if commented on a different issue', async () => {
        const lastId = commentFinishPayload.issue.id;
        commentFinishPayload.issue.id = '12345';

        await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
        commentFinishPayload.issue.id = lastId;
      });
    });

    describe('After onboard compeleted', () => {
      it('should do nothing', async () => {
        await developerSeed.createUser({
          developerId: defaultUserId,
          issueId: 123,
          progress: { track: 2, step: 3, completedStepsOverall: totalSteps },
        });

        const devDbBefore = await db.get(defaultUserId.toString());
        await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload });
        const devDbAfter = await db.get(defaultUserId.toString());

        expect(devDbBefore).to.be.eq(devDbAfter);
      });
    });
  });
});

import 'reflect-metadata';
import { FirestoreClient } from '@data/db/firestore.client';
import { TRACKS } from '@data/local/track.configure';
import { Track } from '@domain/track.model';
import { GithubEventSender } from '@presentation/events-sender.service';
import { RobotStrings } from '@presentation/robot.strings';
import { expect } from 'chai';
import nock from 'nock';
import { Probot, ProbotOctokit } from 'probot';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { GithubEvents } from '../github-events.constants';
import { Robot } from '../robot';
import { DeveloperSeed } from './seed';
import { TrackSeed } from './seed/track.seed';
import { FirestoreClientMock } from './webhook-simulations/firestore-client-mock.test';

describe('Webhooks', () => {
  const defaultId = '2ad1ce00-75d8-11ea-8f0b-8dd55d1cefec';
  const totalSteps = 10;

  let installationPayload;
  let installationWithRequesterPayload;
  let memberAddedPayload;
  let commentFinishPayload;

  let db: FirestoreClientMock;
  let developerSeed: DeveloperSeed;
  let trackSeed: TrackSeed;
  let probot: Probot;
  let taqBot: Robot;

  let defaultUserId: number;
  let stepsPerTrack: number[];

  before(async () => {
    installationPayload = require('./webhook-simulations/installation.payload.json');
    installationWithRequesterPayload = require('./webhook-simulations/installation-with-requester.payload.json');
    memberAddedPayload = require('./webhook-simulations/member-added-as-admin.payload.json');
    commentFinishPayload = require('./webhook-simulations/comment-finish.payload.json');

    db = new FirestoreClientMock();
    Container.set(FirestoreClient, db);

    defaultUserId = installationPayload.sender.id;

    trackSeed = new TrackSeed();
    stepsPerTrack = [2, 5, 3];
    trackSeed.createTracks(stepsPerTrack);

    developerSeed = new DeveloperSeed(db);
    await developerSeed.reset();

    taqBot = Container.get(Robot);
    probot = new Probot({
      githubToken: 'test',
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
      logLevel: 'fatal',
    });
    probot.load(taqBot.webhookReceiver);
  });

  beforeEach(async () => {
    nock.disableNetConnect();
  });

  afterEach(async () => {
    nock.cleanAll();
    nock.enableNetConnect();
    sinon.restore();
    await developerSeed.reset();
  });

  after(() => {
    Container.reset();
  });

  describe('Installation', () => {
    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/7749501/access_tokens').reply(200, { token: 'test' });
    });

    it('should create sender user on database with no progress', async () => {
      const mockResponse = require('./mocks/CreateIssueMockResponse.json');
      const firstTrack: Track = Container.get<Track[]>(TRACKS)[0];
      const firstIssueData = { title: firstTrack.title, body: firstTrack.steps[0].body };
      sinon
        .stub(GithubEventSender.prototype as any, 'createFirstIssue')
        .callsFake(async (_, title: string, body: string) => {
          expect(title).to.be.deep.eq(firstIssueData.title);
          expect(body).to.be.deep.eq(firstIssueData.body);
          return { data: mockResponse };
        });
      await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).to.be.undefined;
      expect(devDb.progress).to.be.null;
    });

    it('should create requester user on database with no progress', async () => {
      const mockResponse = require('./mocks/CreateIssueMockResponse.json');
      const firstTrack: Track = Container.get<Track[]>(TRACKS)[0];
      const firstIssueData = { title: firstTrack.title, body: firstTrack.steps[0].body };
      sinon
        .stub(GithubEventSender.prototype as any, 'createFirstIssue')
        .callsFake(async (_, title: string, body: string) => {
          expect(title).to.be.deep.eq(firstIssueData.title);
          expect(body).to.be.deep.eq(firstIssueData.body);
          return { data: mockResponse };
        });
      const requesterUserId: number = 12345678;

      await probot.receive({
        id: defaultId,
        name: GithubEvents.Installation.Created,
        payload: installationWithRequesterPayload,
      });

      const devDb = await db.getObject(requesterUserId.toString());
      expect(devDb.developerId).to.be.eq(requesterUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.null;
    });

    it('should do nothing if developer is already created', async () => {
      const context = { id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload };
      await developerSeed.createNewUser(defaultUserId);
      const devDbBefore = await db.getObject(defaultUserId.toString());

      await probot.receive(context);
      const devDbAfter = await db.getObject(defaultUserId.toString());
      expect(devDbBefore).to.be.deep.eq(devDbAfter);
    });
  });

  describe('Member added as admin', () => {
    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/8287662/access_tokens').reply(200, { token: 'test' });
    });

    it('should create member user on database with no progress', async () => {
      const mockResponse = require('./mocks/CreateIssueMockResponse.json');
      const firstTrack: Track = Container.get<Track[]>(TRACKS)[0];
      const firstIssueData = { title: firstTrack.title, body: firstTrack.steps[0].body };
      sinon
        .stub(GithubEventSender.prototype as any, 'createFirstIssue')
        .callsFake(async (_, title: string, body: string) => {
          expect(title).to.be.deep.eq(firstIssueData.title);
          expect(body).to.be.deep.eq(firstIssueData.body);
          return { data: mockResponse };
        });
      await probot.receive({ id: defaultId, name: GithubEvents.Member.Added, payload: memberAddedPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.null;
    });

    it('should do nothing if developer is already created', async () => {
      const context = { id: defaultId, name: GithubEvents.Member.Added, payload: memberAddedPayload };
      await developerSeed.createNewUser(defaultUserId);
      const devDbBefore = await db.getObject(defaultUserId.toString());

      await probot.receive(context);

      const devDbAfter = await db.getObject(defaultUserId.toString());
      expect(devDbBefore).to.be.deep.eq(devDbAfter);
    });
  });

  describe('Comment', () => {
    let issueId: number;

    before(() => {
      defaultUserId = commentFinishPayload.sender.id;
      issueId = commentFinishPayload.issue.id;
    });

    beforeEach(() => {
      nock('https://api.github.com').post('/app/installations/645396/access_tokens').reply(200, { token: 'test' });
    });

    it('should create a progress for developer on first track completed', async () => {
      const expectedBody = trackSeed.tracks[0].steps[1].body;
      await developerSeed.createNewUser(defaultUserId, issueId);

      sinon.stub(GithubEventSender.prototype as any, 'createComment').callsFake(async (_, body: string) => {
        expect(body).to.be.eq(expectedBody);
      });

      await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.deep.eq({ track: 0, step: 0, completedStepsOverall: 1 });
    });

    it('should increment developer intermediary step', async () => {
      const track = 1;
      const stepBefore = 2;
      await developerSeed.createUser({
        developerId: defaultUserId,
        issueId,
        progress: { track, step: stepBefore, completedStepsOverall: 5 },
      });

      sinon.stub(GithubEventSender.prototype as any, 'createComment').callsFake(async (_, body: string) => {
        expect(body).to.be.eq(trackSeed.tracks[1].steps[4].body);
      });

      await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.deep.eq({ track, step: stepBefore + 1, completedStepsOverall: 6 });
    });

    it('should increment developer track', async () => {
      const trackBefore = 1;
      const stepBefore = 3;
      await developerSeed.createUser({
        developerId: defaultUserId,
        issueId,
        progress: { track: trackBefore, step: stepBefore, completedStepsOverall: 6 },
      });
      const issueUrl = 'http://www.github.com/new-track-url';
      sinon
        .stub(GithubEventSender.prototype as any, 'createIssue')
        .callsFake(async (_, title: string, body: string) => {
          expect(title).to.be.eq(trackSeed.tracks[2].title);
          expect(body).to.be.eq(trackSeed.tracks[2].steps[0].body);
          return { data: { id: '24', html_url: issueUrl } };
        });
      sinon.stub(GithubEventSender.prototype as any, 'createComment').callsFake(async (_, body: string) => {
        expect(body).to.be.eq(RobotStrings.NextTrack(issueUrl));
      });

      await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.deep.eq({ track: trackBefore, step: stepBefore + 1, completedStepsOverall: 7 });
    });

    it('should increment developer and detect onboard finish', async () => {
      const track = 2;
      const stepBefore = 1;
      await developerSeed.createUser({
        developerId: defaultUserId,
        issueId,
        progress: { track, step: stepBefore, completedStepsOverall: 9 },
      });
      sinon.stub(GithubEventSender.prototype as any, 'createComment').callsFake(async (_, body: string) => {
        expect(body).to.be.eq(RobotStrings.FinishOnboard);
      });

      await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });

      const devDb = await db.getObject(defaultUserId.toString());
      expect(devDb.developerId).to.be.eq(defaultUserId);
      expect(devDb.issueId).not.to.be.null;
      expect(devDb.progress).to.be.deep.eq({ track, step: stepBefore + 1, completedStepsOverall: 10 });
    });

    it('should do nothing if onboard was already finished by that developer', async () => {
      await developerSeed.createUser({
        developerId: defaultUserId,
        issueId: 123,
        progress: { track: 2, step: 3, completedStepsOverall: totalSteps },
      });
      const devDbBefore = await db.getObject(defaultUserId.toString());

      await probot.receive({ id: defaultId, name: GithubEvents.Installation.Created, payload: installationPayload });

      const devDbAfter = await db.getObject(defaultUserId.toString());
      expect(devDbBefore).to.be.deep.eq(devDbAfter);
    });

    it('should do nothing if commented on a different issue', async () => {
      const lastId = commentFinishPayload.issue.id;
      commentFinishPayload.issue.id = '12345';

      await developerSeed.createNewUser(defaultUserId, lastId);

      await probot.receive({ id: defaultId, name: GithubEvents.IssueComment.Created, payload: commentFinishPayload });
      commentFinishPayload.issue.id = lastId;
    });
  });
});

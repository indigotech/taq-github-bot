import 'reflect-metadata';
import IORedis from 'ioredis';
import Container from 'typedi';
import { DeveloperSeed, REDIS_CLIENT_TEST } from './seed';

describe('Installation', () => {
  let developerSeed: DeveloperSeed;

  beforeAll(async done => {
    process.env.REDIS_DB_PARAM_TEST = '6780';
    Container.set(REDIS_CLIENT_TEST, new IORedis(process.env.REDIS_DB_PARAM_TEST));
    developerSeed = new DeveloperSeed();

    console.log('OLOLO');
    const aaa = await developerSeed.createDeveloper({
      developerId: 1234,
      name: 'eeeeu',
      progress: null,
    });

    console.log('AAAA', aaa);
    done();
  });

  it('Should test', () => {
    expect(1).toBe(1);
  });
});

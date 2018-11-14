import IORedis from 'ioredis';
import Container from 'typedi';

export const REDIS_CLIENT_TEST = 'REDIS_CLIENT_TEST';

export class DbSeed {
  readonly redisClient: IORedis.Redis = Container.get(REDIS_CLIENT_TEST);
}

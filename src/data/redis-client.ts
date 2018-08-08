import * as Redis from 'ioredis';

const redisConfig: Redis.RedisOptions = {
  host: 'localhost',
  port: 5432,
};

export const redisClient = new Redis(redisConfig);

import * as Redis from 'ioredis';

const redisConfig: Redis.RedisOptions = {
  host: 'localhost',
  port: 6379,
};

export const redisClient = new Redis(redisConfig);

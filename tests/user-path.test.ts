import 'reflect-metadata';
import * as Redis from 'ioredis';

describe('Finish comment event', () => {
  const testUser = '6992731';
  const redisClient = new Redis(process.env.REDIS_URL);

  beforeAll(async () => {
    await redisClient.del(testUser);
  });

  afterAll(async () => {
    await redisClient.del(testUser);
    redisClient.quit();
  });

  describe('Testao', async () => {
    it('should test', async () => {
      expect(1).toBeLessThanOrEqual(1);
    });
  });
});

import 'reflect-metadata';
import { redisClient } from '@data/db/redis-client';

describe('Finish comment event', () => {
  const testUser = '6992731';
  const simulatedFinishComment = { payload: require('./webhook-simulations/comment-finish.payload.json') };
  const simulatedinstallation = { payload: require('./webhook-simulations/installation.json') };

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

import * as redis from 'redis';
import { Inject, Service } from 'typedi';

export const REDIS = 'REDIS';

@Service()
export class DBClient {
  constructor(@Inject(REDIS) private readonly redisClient: redis.RedisClient) { }

  async setObject(key: string, obj: any): Promise<boolean> {
    return new Promise(resolve => {
      this.redisClient.set(key, JSON.stringify(obj), error => {
        if (error) {
          console.error(`Error inserting on REDIS: `, error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  async getObject<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (error, value) => {
        if (error) {
          console.error(`Error getting from REDIS: `, error);
          reject(error);
        }

        resolve(JSON.parse(value));
      });
    });
  }
}

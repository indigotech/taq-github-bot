import { Redis } from 'ioredis';
import Container, { Service } from 'typedi';

export const REDIS = 'REDIS';

@Service()
export class DBClient {
  private readonly redisClient: Redis = Container.get(REDIS);

  async setObject(key: string, obj: any): Promise<boolean> {
    try {
      await this.redisClient.set(key, JSON.stringify(obj));
      return true;
    } catch (error) {
      console.error(`Error inserting on REDIS: `, error);
      return false;
    }
  }

  async getObject<T>(key: string): Promise<T> {
    return JSON.parse(await this.redisClient.get(key));
  }
}

import { Inject, Service } from 'typedi';

export const REDIS = 'REDIS';

@Service()
export class DBClient {
  constructor(@Inject(REDIS) private readonly redisClient) {}

  async setObject(key: string, obj: any): Promise<boolean> {
    try {
      await this.redisClient.set(key, JSON.stringify(obj));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getObject<T>(key: string): Promise<T> {
    const data: string = await this.redisClient.get(key);
    return JSON.parse(data);
  }
}

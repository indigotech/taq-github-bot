import { DbSeed } from './db.seed';

export class DeveloperSeed extends DbSeed {
  async reset(): Promise<number> {
    const keys = await this.redisClient.keys('*');
    console.log(keys);
    await Promise.all(keys.map(key => this.redisClient.del(key)));
    return keys.length;
  }
}

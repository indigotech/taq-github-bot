import { Developer } from '@domain';
import { DbSeed } from './db.seed';

export class DeveloperSeed extends DbSeed {
  reset() {
    this.redisClient.del();
  }

  createDeveloper(developer: Developer): Promise<string> {
    const key = developer.developerId.toString();
    return this.redisClient.set(key, JSON.stringify(developer));
  }
}

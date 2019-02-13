import * as Faker from 'faker';
import IORedis from 'ioredis';
import Container from 'typedi';
import { REDIS } from '@data/db';
import { Developer } from '@domain';

export class DeveloperSeed {
  private readonly redisClient: IORedis.Redis = Container.get(REDIS);

  async reset(): Promise<number> {
    const keys = await this.redisClient.keys('*');
    await Promise.all(keys.map(key => this.redisClient.del(key)));
    return keys.length;
  }

  createNewUser(id: number, issueId?: number): Promise<string> {
    const newDeveloper: Developer = {
      developerId: id,
      issueId,
      name: Faker.name.findName(),
      progress: null,
    };

    return this.redisClient.set(newDeveloper.developerId.toString(), JSON.stringify(newDeveloper));
  }

  getAllUsers(): Promise<string[]> {
    return this.redisClient.keys('*');
  }

  disconnect() {
    this.redisClient.disconnect();
  }
}

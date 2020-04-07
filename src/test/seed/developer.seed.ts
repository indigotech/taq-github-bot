import * as Faker from 'faker';
import IORedis from 'ioredis';
import { Developer } from '@domain/developer.model';

export class DeveloperSeed {
  constructor(private readonly redisClient: IORedis.Redis) { }

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

    return this.createUser(newDeveloper);
  }

  createUser(developer: Partial<Developer>): Promise<string> {
    developer.name = Faker.name.findName();
    return this.redisClient.set(developer.developerId.toString(), JSON.stringify(developer));
  }

  getAllUsers(): Promise<string[]> {
    return this.redisClient.keys('*');
  }
}

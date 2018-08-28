import { Service } from 'typedi';
import { Developer } from '@domain/entities/developer.model';
import { redisClient } from './redis-client';

@Service()
export class DeveloperDataSource {
  async createOrUpdate(developer: Developer): Promise<boolean> {
    try {
      await redisClient.set(developer.githubId.toString(), JSON.stringify(developer));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async get(githubId: number): Promise<Developer> {
    const devData = await redisClient.get(githubId.toString());
    return JSON.parse(devData);
  }
}

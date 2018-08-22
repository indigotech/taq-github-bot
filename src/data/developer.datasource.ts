import { redisClient } from './redis-client';
import { Developer } from '@domain/entities/developer.model';
import { Service } from 'typedi';
import { fromJson } from '@domain/utils/json';

@Service()
export class DeveloperDataSource {

  async createAsync(developer: Developer): Promise<void> {
    // Using GithubId as developer key
    await redisClient.set(developer.githubId.toString(), developer);
  }

  async getByGithubId(githubId: number): Promise<Developer> {
    const devData = await redisClient.get(githubId.toString());
    return fromJson<Developer>(devData);
  }
}

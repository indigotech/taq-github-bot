import { redisClient } from './redis-client';
import { Developer } from '@domain/entities/developer.model';
import { Service } from 'typedi';

@Service()
export class DeveloperDataSource {

  async createAsync(developer: Developer): Promise<void> {
    // Using GithubId as developer key
    await redisClient.set(developer.githubId.toString(), developer);
  }

  async getByGithubId(githubId: number) {
    return await redisClient.get(githubId.toString());
  }
}

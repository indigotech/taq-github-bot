import { redisClient } from './redis-client'
import { Developer } from 'domain/entities/developer.entity';

export class DeveloperDataSource {

  async create(developer: Developer) {
    // const devString = JSON.stringify(developer);
    redisClient.set(developer.githubId.toString(), developer);
  }
}

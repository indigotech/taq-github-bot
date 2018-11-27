import { Service } from 'typedi';
import { DBClient } from '@data/db/db.client';
import { Developer } from '@domain';

@Service()
export class DeveloperDataSource {
  constructor(private readonly db: DBClient) {}

  createOrUpdate(developer: Developer): Promise<boolean> {
    return this.db.setObject(developer.developerId.toString(), developer);
  }

  get(githubId: number): Promise<Developer> {
    return this.db.getObject(githubId.toString());
  }
}

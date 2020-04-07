import { Service } from 'typedi';
import { DBClient } from '@data/db/db.client';
import { Developer } from '@domain/developer.model';

@Service()
export class DeveloperDataSource {
  constructor(private readonly db: DBClient) { }

  create(developer: Developer): Promise<boolean> {
    return this.db.setObject(developer.developerId.toString(), developer);
  }

  async update(devId: number, developer: Partial<Developer>): Promise<boolean> {
    const currentDev = await this.get(devId);
    return this.db.setObject(devId.toString(), {...currentDev, ...developer});
  }

  get(githubId: number): Promise<Developer> {
    return this.db.getObject(githubId.toString());
  }
}

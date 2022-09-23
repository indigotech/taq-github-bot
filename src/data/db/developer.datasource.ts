import { Developer } from '@domain/developer.model';
import Container, { Service } from 'typedi';
import { FirestoreClient } from './firestore.client';

@Service()
export class DeveloperDataSource {
  private readonly db: FirestoreClient = Container.get(FirestoreClient);

  create(developer: Developer) {
    return this.db.setObject(developer.developerId.toString(), developer);
  }

  async update(devId: number, developer: Partial<Developer>) {
    const currentDev = await this.get(devId);
    console.log('currentDev:', currentDev);
    console.log('developer:', developer);
    return this.db.setObject(devId.toString(), { ...currentDev, ...developer });
  }

  get(githubId: number): Promise<Developer> {
    return this.db.getObject(githubId.toString());
  }
}

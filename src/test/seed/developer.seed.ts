import { Developer } from '@domain/developer.model';
import * as Faker from 'faker';
import { FirestoreClientMock } from 'test/webhook-simulations/firestore-client-mock.test';

export class DeveloperSeed {
  constructor(private readonly client: FirestoreClientMock) {}

  async reset(): Promise<number> {
    const keys = Object.keys(this.client.firestoreMock);
    this.client.firestoreMock = {};
    return keys.length;
  }

  createNewUser(id: number, issueId?: number) {
    const newDeveloper: Developer = {
      developerId: id,
      issueId,
      name: Faker.name.findName(),
      progress: null,
    };

    return this.createUser(newDeveloper);
  }

  async createUser(developer: Partial<Developer>) {
    developer.name = Faker.name.findName();
    await this.client.setObject(developer.developerId.toString(), developer as Developer);
  }
}

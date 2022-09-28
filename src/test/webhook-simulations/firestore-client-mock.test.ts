import { Developer } from '@domain/developer.model';

export class FirestoreClientMock {
  firestoreMock: Record<string, Developer> = {};

  async setObject(documentName: string, value: Developer) {
    this.firestoreMock[documentName] = value;
  }

  async getObject(documentName: string): Promise<Developer> {
    const object = this.firestoreMock[documentName];
    return object && JSON.parse(JSON.stringify(object));
  }
}

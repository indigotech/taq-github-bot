import { RobotError } from '@core';
import { Firestore } from '@google-cloud/firestore';

const FIRESTORE_COLLECTION = 'taqGithubBot';

export class FirestoreClient {
  private readonly firestore = new Firestore();

  async setObject(documentName: string, value: Record<string, any>) {
    console.log('AAAAAAA');
    const document = this.firestore.collection(FIRESTORE_COLLECTION).doc(documentName);

    try {
      await document.set(value);
    } catch (error) {
      console.error({
        location: 'FirestoreClient.setObject',
        error,
      });

      throw new RobotError(500, 'Error setting document on database');
    }
  }

  async getObject<T>(documentName: string): Promise<T> {
    console.log('BBBBBB');
    const document = this.firestore.collection(FIRESTORE_COLLECTION).doc(documentName);

    try {
      const snapshot = await document.get();
      return snapshot.data() as T;
    } catch (error) {
      console.error({
        location: 'FirestoreClient.getObject',
        error,
      });

      throw new RobotError(500, 'Error getting document on database');
    }
  }
}

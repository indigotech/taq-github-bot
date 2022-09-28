import { RobotError } from '@core';
import { Firestore } from '@google-cloud/firestore';
import { Service } from 'typedi';

@Service()
export class FirestoreClient {
  private readonly collection = process.env.FIRESTORE_COLLECTION;
  private readonly firestore = new Firestore();

  constructor() {
    this.collection = process.env.FIRESTORE_COLLECTION;

    if (!this.collection) {
      throw new Error('Failed to get FIRESTORE_COLLECTION from environment variables');
    }
  }

  async setObject(documentName: string, value: Record<string, any>) {
    const document = this.firestore.collection(this.collection).doc(documentName);

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
    const document = this.firestore.collection(this.collection).doc(documentName);

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

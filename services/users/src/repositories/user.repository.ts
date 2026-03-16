import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp } from '../config/firestoreconf.js';

type UserDocument = {
  id: string;
  email: string;
  name: string;
  password: string;
};

const db = getFirestore(firebaseApp);

export class UserRepository {
  async create(user: Omit<UserDocument, 'id'>): Promise<UserDocument> {
    const docRef = db.collection('users').doc();
    const userDoc: UserDocument = {
      id: docRef.id,
      ...user,
    };
    await docRef.set(userDoc);
    return userDoc;
  }

  async getById(id: string): Promise<UserDocument | null> {
    const snap = await db.collection('users').doc(id).get();

    if (!snap.exists) {
      return null;
    }

    const doc = snap.data() as UserDocument;
    return doc;
  }

  async getByEmail(email: string): Promise<UserDocument | null> {
    const snap = await db.collection('users').where('email', '==', email).limit(1).get();

    if (snap.empty) {
      return null;
    }

    const doc = snap.docs[0];
    const user = doc.data() as UserDocument;
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    const docRef = db.collection('users').doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }

  async getAll(): Promise<UserDocument[]> {
    const snap = await db.collection('users').get();

    if (snap.empty) {
      return [];
    }

    return snap.docs.map((doc) => doc.data() as UserDocument);
  }
}

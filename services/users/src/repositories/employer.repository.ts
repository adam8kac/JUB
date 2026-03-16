import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp } from '../config/firestoreconf.js';
import { EmployerDocument } from '../types/employer.type.js';

const db = getFirestore(firebaseApp);

export class EmployerRepository {
  private collection = db.collection('employers');

  async create(employer: EmployerDocument) {
    const docRef = this.collection.doc(employer.companyRegistrationNumber);

    await docRef.set(employer);

    return {
      id: docRef.id,
      ...employer,
    };
  }

  async findByEmail(email: string): Promise<EmployerDocument | null> {
    const snap = await this.collection.where('email', '==', email).limit(1).get();

    if (snap.empty) {
      return null;
    }

    const doc = snap.docs[0];
    const employer = doc.data() as EmployerDocument;
    return employer;
  }

  async findByCompanyRegistrationNumber(companyRegistrationNumber: string): Promise<EmployerDocument | null> {
    const docRef = this.collection.doc(companyRegistrationNumber);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return null;
    }

    const employer = snapshot.data() as EmployerDocument;

    return employer;
  }

  async deleteByCompanyRegistrationNumber(companyRegistrationNumber: string): Promise<boolean> {
    const docRef = this.collection.doc(companyRegistrationNumber);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }

  async getAll(): Promise<EmployerDocument[]> {
    const snap = await this.collection.get();

    if (snap.empty) {
      return [];
    }

    return snap.docs.map((doc) => doc.data() as EmployerDocument);
  }
}

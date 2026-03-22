import { db } from '../config/firestore.config.js';
import type { CVDao } from '../dao/cv.dao.js';
import type { CVData } from '../models/CVData.js';

export class CVRepository implements CVDao {
  private collectionRef = db.collection('cvs');

  async save(uid: string, data: CVData): Promise<void> {
    await this.collectionRef.doc(uid).set(data);
  }

  async get(id: string): Promise<CVData | null> {
    const snap = await this.collectionRef.doc(id).get();
    if (!snap.exists) return null;
    return snap.data() as CVData;
  }

  async getAll(): Promise<CVData[]> {
    const snap = await this.collectionRef.get();
    return snap.docs.map((d) => d.data() as CVData);
  }

  async update(id: string, data: Partial<CVData>): Promise<void> {
    await this.collectionRef.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    await this.collectionRef.doc(id).delete();
  }

  async exists(uid: string, email?: string, phoneNumber?: string): Promise<boolean> {
    const byUid = await this.collectionRef.doc(uid).get();
    if (byUid.exists) return true;

    if (email) {
      const byEmail = await this.collectionRef.where('personalInfo.email', '==', email).limit(1).get();
      if (!byEmail.empty) return true;
    }

    if (phoneNumber) {
      const byPhone = await this.collectionRef.where('personalInfo.phone', '==', phoneNumber).limit(1).get();
      if (!byPhone.empty) return true;
    }

    return false;
  }
}

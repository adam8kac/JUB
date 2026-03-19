import type { CVData } from '../models/CVData.js';
import { CVRepository } from '../repository/cv.repository.js';
import { generateCvPdf } from './pdf.service.js';

export class CVService {
  private repository = new CVRepository();

  async saveCV(uid: string, data: CVData): Promise<void> {
    const alreadyExists = await this.repository.exists(uid, data.email, data.phoneNumber);
    if (alreadyExists) {
      throw new Error('CV already exists for this user, email or phone number');
    }

    try {
      await this.repository.save(uid, data);
    } catch (err) {
      const code = (err as { code?: string }).code;
      throw new Error(code ? `Firestore error: ${code}` : 'Unknown error');
    }
  }

  async updateCV(uid: string, data: Partial<CVData>): Promise<void> {
    const existing = await this.repository.get(uid);
    if (!existing) throw new Error('CV not found');
    await this.repository.update(uid, data);
  }

  async deleteCV(uid: string): Promise<void> {
    const existing = await this.repository.get(uid);
    if (!existing) throw new Error('CV not found');
    await this.repository.delete(uid);
  }

  async getCVData(uid: string): Promise<CVData> {
    const data = await this.repository.get(uid);
    if (!data) throw new Error('CV not found');
    return data;
  }

  async getGeneratedCV(uid: string): Promise<Buffer> {
    if (!uid || uid == null || uid == '') {
      throw new Error('User id is missing');
    }

    try {
      const data = await this.repository.get(uid);

      if (!data) {
        throw new Error('User does not have a CV yet');
      }

      return await generateCvPdf(data);
    } catch (err) {
      throw new Error('Could not fetch CV data');
    }
  }
}

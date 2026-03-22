import type { CVData } from '../models/CVData.js';
import { CVRepository } from '../repository/cv.repository.js';
import { generateCvPdf } from './pdf.service.js';

export class CVService {
  private repository = new CVRepository();

  async getAllCVs(): Promise<CVData[]> {
    return this.repository.getAll();
  }

  async saveCV(uid: string, data: CVData): Promise<void> {
    console.log('[saveCV] Checking if CV exists...');
    const alreadyExists = await this.repository.exists(uid, data.personalInfo?.email, data.personalInfo?.phone);
    console.log('[saveCV] exists check done:', alreadyExists);
    if (alreadyExists) {
      throw new Error('CV already exists for this user, email or phone number');
    }

    try {
      console.log('[saveCV] Calling Firebase save...');
      await this.repository.save(uid, data);
      console.log('[saveCV] Firebase save done');
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
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Could not generate PDF: ${msg}`);
    }
  }
}

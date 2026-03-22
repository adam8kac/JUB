import type { CVData } from '../models/CVData.js';

export interface CVDao {
  save(uid: string, data: CVData): Promise<void>;
  get(id: string): Promise<CVData | null>; // id == userID(AUTH SERVICE)
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<CVData>): Promise<void>;
  getAll(): Promise<CVData[]>;
  exists(uid: string, email?: string, phoneNumber?: string): Promise<boolean>;
}

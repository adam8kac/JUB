import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CVData } from '../models/CVData.js';

const mockRepo = {
  exists: vi.fn(),
  save: vi.fn(),
  get: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock('../repository/cv.repository.js', () => ({
  CVRepository: function () {
    return mockRepo;
  },
}));

vi.mock('./pdf.service.js', () => ({
  generateCvPdf: vi.fn(),
}));

import { CVService } from './cv.service.js';
import { generateCvPdf } from './pdf.service.js';

const mockCV: CVData = {
  personalInfo: {
    firstName: 'Janez',
    lastName: 'Novak',
    email: 'janez@novak.si',
    phone: '123456789',
    location: 'Ljubljana',
  },
  summary: 'Razvijalec',
  experience: [],
  education: [
    { institution: 'FRI Ljubljana', degree: 'Visoka šola (BSc)', field: 'Računalništvo', startDate: '2020-09', endDate: '2023-07' },
  ],
  skills: ['TypeScript', 'Node.js'],
};

describe('CVService', () => {
  let service: CVService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new CVService();
  });

  describe('saveCV', () => {
    it('vrže napako če CV že obstaja', async () => {
      mockRepo.exists.mockResolvedValue(true);

      await expect(service.saveCV('user1', mockCV)).rejects.toThrow(
        'CV already exists for this user, email or phone number',
      );
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('shrani CV če ne obstaja', async () => {
      mockRepo.exists.mockResolvedValue(false);
      mockRepo.save.mockResolvedValue(undefined);

      await service.saveCV('user1', mockCV);

      expect(mockRepo.save).toHaveBeenCalledWith('user1', mockCV);
    });

    it('vrže Firestore napako z kodo', async () => {
      mockRepo.exists.mockResolvedValue(false);
      mockRepo.save.mockRejectedValue({ code: 'permission-denied' });

      await expect(service.saveCV('user1', mockCV)).rejects.toThrow(
        'Firestore error: permission-denied',
      );
    });

    it('vrže Unknown error brez kode', async () => {
      mockRepo.exists.mockResolvedValue(false);
      mockRepo.save.mockRejectedValue(new Error('network'));

      await expect(service.saveCV('user1', mockCV)).rejects.toThrow('Unknown error');
    });
  });

  describe('updateCV', () => {
    it('vrže napako če CV ne obstaja', async () => {
      mockRepo.get.mockResolvedValue(null);

      await expect(service.updateCV('user1', { summary: 'Test' })).rejects.toThrow('CV not found');
      expect(mockRepo.update).not.toHaveBeenCalled();
    });

    it('posodobi CV če obstaja', async () => {
      mockRepo.get.mockResolvedValue(mockCV);
      mockRepo.update.mockResolvedValue(undefined);

      await service.updateCV('user1', { summary: 'Novo ime' });

      expect(mockRepo.update).toHaveBeenCalledWith('user1', { summary: 'Novo ime' });
    });
  });

  describe('deleteCV', () => {
    it('vrže napako če CV ne obstaja', async () => {
      mockRepo.get.mockResolvedValue(null);

      await expect(service.deleteCV('user1')).rejects.toThrow('CV not found');
      expect(mockRepo.delete).not.toHaveBeenCalled();
    });

    it('izbriše CV če obstaja', async () => {
      mockRepo.get.mockResolvedValue(mockCV);
      mockRepo.delete.mockResolvedValue(undefined);

      await service.deleteCV('user1');

      expect(mockRepo.delete).toHaveBeenCalledWith('user1');
    });
  });

  describe('getCVData', () => {
    it('vrže napako če CV ne obstaja', async () => {
      mockRepo.get.mockResolvedValue(null);

      await expect(service.getCVData('user1')).rejects.toThrow('CV not found');
    });

    it('vrne podatke CV', async () => {
      mockRepo.get.mockResolvedValue(mockCV);

      const result = await service.getCVData('user1');

      expect(result).toEqual(mockCV);
    });
  });

  describe('getGeneratedCV', () => {
    it('vrže napako če uid je prazen string', async () => {
      await expect(service.getGeneratedCV('')).rejects.toThrow();
    });

    it('vrže napako če CV ne obstaja', async () => {
      mockRepo.get.mockResolvedValue(null);

      await expect(service.getGeneratedCV('user1')).rejects.toThrow('Could not fetch CV data');
    });

    it('vrne PDF buffer', async () => {
      const fakeBuffer = Buffer.from('pdf');
      mockRepo.get.mockResolvedValue(mockCV);
      (generateCvPdf as ReturnType<typeof vi.fn>).mockResolvedValue(fakeBuffer);

      const result = await service.getGeneratedCV('user1');

      expect(result).toBe(fakeBuffer);
      expect(generateCvPdf).toHaveBeenCalledWith(mockCV);
    });
  });
});

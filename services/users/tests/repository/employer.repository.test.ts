import { describe, it, expect, vi, beforeEach } from 'vitest';

const { collectionMock } = vi.hoisted(() => ({
  collectionMock: vi.fn(),
}));

vi.mock('firebase-admin/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: collectionMock,
  })),
}));

vi.mock('../../src/config/firestoreconf.js', () => ({
  firebaseApp: {},
}));

import { EmployerRepository } from '../../src/repositories/employer.repository.js';
import { EmployerDocument } from '../../src/types/employer.type.js';

describe('EmployerRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates employer with companyRegistrationNumber as document id', async () => {
    const setMock = vi.fn().mockResolvedValue(undefined);
    const docMock = vi.fn(() => ({ id: '5002837000', set: setMock }));

    const collectionInstance = { doc: docMock };
    collectionMock.mockReturnValueOnce(collectionInstance);

    const employer: EmployerDocument = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'hashed',
      data: {
        fullName: 'Some Company',
        hseid: '123',
        legalForm: 'Ltd',
        registrationAuthority: 'Some authority',
        street: 'Main',
        houseNumber: '1',
        houseNumberSuffix: '',
        settlement: 'Town',
        postalCode: '1000',
        city: 'City',
        country: 'Country',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const repo = new EmployerRepository();
    const created = await repo.create(employer);

    expect(collectionMock).toHaveBeenCalledWith('employers');
    expect(docMock).toHaveBeenCalledWith('5002837000');
    expect(setMock).toHaveBeenCalledWith(employer);
    expect(created).toEqual({
      id: '5002837000',
      ...employer,
    });
  });

  it('finds employer by companyRegistrationNumber when document exists', async () => {
    const employer: EmployerDocument = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'hashed',
      data: {
        fullName: 'Some Company',
        hseid: '123',
        legalForm: 'Ltd',
        registrationAuthority: 'Some authority',
        street: 'Main',
        houseNumber: '1',
        houseNumberSuffix: '',
        settlement: 'Town',
        postalCode: '1000',
        city: 'City',
        country: 'Country',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const getMock = vi.fn().mockResolvedValue({
      exists: true,
      data: () => employer,
      id: '5002837000',
    });
    const docMock = vi.fn(() => ({ get: getMock }));

    const collectionInstance = { doc: docMock };
    collectionMock.mockReturnValueOnce(collectionInstance);

    const repo = new EmployerRepository();
    const result = await repo.findByCompanyRegistrationNumber('5002837000');

    expect(docMock).toHaveBeenCalledWith('5002837000');
    expect(result).toEqual({
      id: '5002837000',
      employer,
    });
  });

  it('returns null when employer document does not exist', async () => {
    const getMock = vi.fn().mockResolvedValue({
      exists: false,
    });
    const docMock = vi.fn(() => ({ get: getMock }));
    const collectionInstance = { doc: docMock };
    collectionMock.mockReturnValueOnce(collectionInstance);

    const repo = new EmployerRepository();
    const result = await repo.findByCompanyRegistrationNumber('missing');

    expect(result).toBeNull();
  });
});

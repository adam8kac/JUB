import { describe, it, expect, vi, beforeEach } from 'vitest';

// Firestore mocks (using hoisted to avoid TDZ with vi.mock)
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

import { UserRepository } from '../../src/repositories/user.repository.js';

describe('UserRepository', () => {
  let repo: UserRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repo = new UserRepository();
  });

  it('creates a user document and returns it', async () => {
    const setMock = vi.fn().mockResolvedValue(undefined);
    const docRef = { id: 'generated-id', set: setMock };
    const docMock = vi.fn(() => docRef);

    collectionMock.mockReturnValueOnce({ doc: docMock });

    const input = { email: 'test@example.com', name: 'Test', password: 'hashed' };

    const created = await repo.create(input);

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith({
      id: 'generated-id',
      ...input,
    });
    expect(created).toEqual({
      id: 'generated-id',
      ...input,
    });
  });

  it('returns user by id when document exists', async () => {
    const data = {
      id: 'user-1',
      email: 'id@example.com',
      name: 'Id User',
      password: 'hashed',
    };

    const getMock = vi.fn().mockResolvedValue({
      exists: true,
      data: () => data,
    });

    const docMock = vi.fn(() => ({ get: getMock }));
    collectionMock.mockReturnValueOnce({ doc: docMock });

    const result = await repo.getById('user-1');

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith('user-1');
    expect(result).toEqual(data);
  });

  it('returns null by id when document does not exist', async () => {
    const getMock = vi.fn().mockResolvedValue({
      exists: false,
    });

    const docMock = vi.fn(() => ({ get: getMock }));
    collectionMock.mockReturnValueOnce({ doc: docMock });

    const result = await repo.getById('missing');

    expect(result).toBeNull();
  });

  it('returns user by email when document exists', async () => {
    const data = {
      id: 'user-2',
      email: 'mail@example.com',
      name: 'Mail User',
      password: 'hashed',
    };

    const snapMock = {
      empty: false,
      docs: [
        {
          data: () => data,
        },
      ],
    };

    const getQueryMock = vi.fn().mockResolvedValue(snapMock);
    const limitMock = vi.fn(() => ({ get: getQueryMock }));
    const whereMock = vi.fn(() => ({ limit: limitMock }));

    collectionMock.mockReturnValueOnce({ where: whereMock });

    const result = await repo.getByEmail('mail@example.com');

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(whereMock).toHaveBeenCalledWith('email', '==', 'mail@example.com');
    expect(limitMock).toHaveBeenCalledWith(1);
    expect(result).toEqual(data);
  });

  it('returns null by email when no documents match', async () => {
    const snapMock = {
      empty: true,
      docs: [],
    };

    const getQueryMock = vi.fn().mockResolvedValue(snapMock);
    const limitMock = vi.fn(() => ({ get: getQueryMock }));
    const whereMock = vi.fn(() => ({ limit: limitMock }));

    collectionMock.mockReturnValueOnce({ where: whereMock });

    const result = await repo.getByEmail('none@example.com');

    expect(result).toBeNull();
  });
});

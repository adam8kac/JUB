import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { UserLoginRequest, UserRegisterRequest, UserResponse } from '../../src/types/user.type.js';

const {
  createMock,
  getByEmailMock,
  getByIdMock,
  deleteByIdMock,
  generateAccessTokenMock,
  generateRefreshTokenMock,
  generateSHA256Mock,
  UserRepositoryMock,
} = vi.hoisted(() => {
  const createMock = vi.fn();
  const getByEmailMock = vi.fn();
  const getByIdMock = vi.fn();
  const deleteByIdMock = vi.fn();
  const generateAccessTokenMock = vi.fn();
  const generateRefreshTokenMock = vi.fn();
  const generateSHA256Mock = vi.fn();
  const UserRepositoryMock = vi.fn().mockImplementation(() => ({
    create: createMock,
    getByEmail: getByEmailMock,
    getById: getByIdMock,
    deleteById: deleteByIdMock,
  }));

  return {
    createMock,
    getByEmailMock,
    getByIdMock,
    deleteByIdMock,
    generateAccessTokenMock,
    generateRefreshTokenMock,
    generateSHA256Mock,
    UserRepositoryMock,
  };
});

vi.mock('../../src/repositories/user.repository.js', () => ({
  UserRepository: UserRepositoryMock,
}));

vi.mock('../../src/utils/auth.utils.js', () => ({
  generateAccessToken: generateAccessTokenMock,
  generateRefreshToken: generateRefreshTokenMock,
}));

vi.mock('../../src/utils/password.utils.js', () => ({
  generateSHA256: generateSHA256Mock,
}));

import { UserService } from '../../src/services/user.service.js';

describe('UserService', () => {
  let service: UserService;
  let repoMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    repoMock = {
      create: createMock,
      getByEmail: getByEmailMock,
      getById: getByIdMock,
      deleteById: deleteByIdMock,
    };
    service = new UserService(repoMock);
  });

  it('registers a new user when email not taken', async () => {
    const input: UserRegisterRequest = {
      email: 'new@example.com',
      name: 'New User',
      password: 'plain',
    };

    getByEmailMock.mockResolvedValueOnce(null);
    generateSHA256Mock.mockReturnValueOnce('hashed-password');

    const createdDocument = {
      id: 'id-1',
      email: input.email,
      name: input.name,
      password: 'hashed-password',
    };
    createMock.mockResolvedValueOnce(createdDocument);

    const result = await service.register(input);

    expect(getByEmailMock).toHaveBeenCalledWith('new@example.com');
    expect(generateSHA256Mock).toHaveBeenCalledWith('plain');
    expect(createMock).toHaveBeenCalledWith({
      email: input.email,
      name: input.name,
      password: 'hashed-password',
    });

    const expected: UserResponse = {
      id: 'id-1',
      email: input.email,
      name: input.name,
    };
    expect(result).toEqual(expected);
  });

  it('throws when registering user with existing email', async () => {
    const input: UserRegisterRequest = {
      email: 'existing@example.com',
      name: 'Existing',
      password: 'plain',
    };

    getByEmailMock.mockResolvedValueOnce({ id: 'id-1' });

    await expect(service.register(input)).rejects.toThrowError('User with email existing@example.com already exists');
  });

  it('logs in user with correct credentials and returns tokens', async () => {
    const input: UserLoginRequest = {
      email: 'user@example.com',
      password: 'plain',
    };

    const storedUser = {
      id: 'id-1',
      email: input.email,
      name: 'User',
      password: 'hashed-password',
    };

    getByEmailMock.mockResolvedValueOnce(storedUser);
    generateSHA256Mock.mockReturnValueOnce('hashed-password');

    generateAccessTokenMock.mockReturnValueOnce('access-token');
    generateRefreshTokenMock.mockReturnValueOnce('refresh-token');

    const result = await service.login(input);

    expect(getByEmailMock).toHaveBeenCalledWith('user@example.com');
    expect(generateSHA256Mock).toHaveBeenCalledWith('plain');
    expect(generateAccessTokenMock).toHaveBeenCalledWith('id-1');
    expect(generateRefreshTokenMock).toHaveBeenCalledWith('id-1');

    const expectedUser: UserResponse = {
      id: 'id-1',
      email: input.email,
      name: 'User',
    };

    expect(result).toEqual({
      user: expectedUser,
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });

  it('throws on login when user does not exist', async () => {
    const input: UserLoginRequest = {
      email: 'missing@example.com',
      password: 'plain',
    };

    getByEmailMock.mockResolvedValueOnce(null);

    await expect(service.login(input)).rejects.toThrowError('Incorrect password or username');
  });

  it('throws on login when password does not match', async () => {
    const input: UserLoginRequest = {
      email: 'user@example.com',
      password: 'wrong',
    };

    const storedUser = {
      id: 'id-1',
      email: input.email,
      name: 'User',
      password: 'correct-hash',
    };

    getByEmailMock.mockResolvedValueOnce(storedUser);
    generateSHA256Mock.mockReturnValueOnce('other-hash');

    await expect(service.login(input)).rejects.toThrowError('Incorrect password or username');
  });

  it('deletes user when it exists', async () => {
    const userId = 'user-1';

    getByIdMock.mockResolvedValueOnce({
      id: userId,
      email: 'user@example.com',
      name: 'User',
      password: 'hash',
    });
    deleteByIdMock.mockResolvedValueOnce(true);

    await service.deleteById(userId);

    expect(getByIdMock).toHaveBeenCalledWith(userId);
    expect(deleteByIdMock).toHaveBeenCalledWith(userId);
  });

  it('throws USER_NOT_FOUND when deleting non-existing user', async () => {
    const userId = 'missing';

    getByIdMock.mockResolvedValueOnce(null);

    await expect(service.deleteById(userId)).rejects.toThrowError('USER_NOT_FOUND');
    expect(deleteByIdMock).not.toHaveBeenCalled();
  });

  it('throws USER_DELETE_FAILED when repository deleteById returns false', async () => {
    const userId = 'user-1';

    getByIdMock.mockResolvedValueOnce({
      id: userId,
      email: 'user@example.com',
      name: 'User',
      password: 'hash',
    });
    deleteByIdMock.mockResolvedValueOnce(false);

    await expect(service.deleteById(userId)).rejects.toThrowError('USER_DELETE_FAILED');
  });

  it('returns user by id without password', async () => {
    const userId = 'user-1';
    getByIdMock.mockResolvedValueOnce({
      id: userId,
      email: 'user@example.com',
      name: 'User',
      password: 'hash',
    });

    const result = await service.getById(userId);

    expect(getByIdMock).toHaveBeenCalledWith(userId);
    expect(result).toEqual({
      id: userId,
      email: 'user@example.com',
      name: 'User',
    });
  });

  it('returns null when user by id does not exist', async () => {
    getByIdMock.mockResolvedValueOnce(null);

    const result = await service.getById('missing');

    expect(result).toBeNull();
  });

  it('returns user by email without password', async () => {
    const email = 'user@example.com';
    getByEmailMock.mockResolvedValueOnce({
      id: 'user-1',
      email,
      name: 'User',
      password: 'hash',
    });

    const result = await service.getByEmail(email);

    expect(getByEmailMock).toHaveBeenCalledWith(email);
    expect(result).toEqual({
      id: 'user-1',
      email,
      name: 'User',
    });
  });

  it('returns null when user by email does not exist', async () => {
    getByEmailMock.mockResolvedValueOnce(null);

    const result = await service.getByEmail('missing@example.com');

    expect(result).toBeNull();
  });

  it('returns all users without passwords', async () => {
    const docs = [
      { id: '1', email: 'u1@example.com', name: 'U1', password: 'p1' },
      { id: '2', email: 'u2@example.com', name: 'U2', password: 'p2' },
    ];

    (repoMock.getAll as any) = vi.fn().mockResolvedValueOnce(docs);
    service = new UserService(repoMock);

    const result = await service.getAll();

    expect(repoMock.getAll as any).toHaveBeenCalled();
    expect(result).toEqual([
      { id: '1', email: 'u1@example.com', name: 'U1' },
      { id: '2', email: 'u2@example.com', name: 'U2' },
    ]);
  });
});

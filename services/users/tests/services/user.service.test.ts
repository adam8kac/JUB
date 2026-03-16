import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { UserLoginRequest, UserRegisterRequest, UserResponse } from '../../src/types/user.type.js';

// Hoisted mocks to work with vi.mock hoisting
const {
  createMock,
  getByEmailMock,
  generateAccessTokenMock,
  generateRefreshTokenMock,
  generateSHA256Mock,
  UserRepositoryMock,
} = vi.hoisted(() => {
  const createMock = vi.fn();
  const getByEmailMock = vi.fn();
  const generateAccessTokenMock = vi.fn();
  const generateRefreshTokenMock = vi.fn();
  const generateSHA256Mock = vi.fn();
  const UserRepositoryMock = vi.fn().mockImplementation(() => ({
    create: createMock,
    getByEmail: getByEmailMock,
  }));

  return {
    createMock,
    getByEmailMock,
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
});

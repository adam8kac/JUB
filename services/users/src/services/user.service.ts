import { UserRepository } from '../repositories/user.repository.js';
import { UserLoginRequest, UserRegisterRequest, UserResponse } from '../types/user.type.js';
import { generateAccessToken, generateRefreshToken } from '../utils/auth.utils.js';
import { generateSHA256 } from '../utils/password.utils.js';

export class UserService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  async register(user: UserRegisterRequest): Promise<UserResponse> {
    const existing = await this.userRepository.getByEmail(user.email);
    if (existing) {
      throw new Error(`User with email ${user.email} already exists`);
    }

    const createdDoc = await this.userRepository.create({
      email: user.email,
      name: user.name,
      password: generateSHA256(user.password),
    });

    const { password, ...userResponse } = createdDoc;
    return userResponse;
  }

  async login(user: UserLoginRequest): Promise<{ user: UserResponse; accessToken: string; refreshToken: string }> {
    const existing = await this.userRepository.getByEmail(user.email);

    if (!existing) {
      throw new Error('Incorrect password or username');
    }

    const hashed = generateSHA256(user.password);
    if (hashed !== existing.password) {
      throw new Error('Incorrect password or username');
    }

    const { password, ...userResponse } = existing;
    const accessToken = generateAccessToken(existing.id);
    const refreshToken = generateRefreshToken(existing.id);

    console.log('[LOGIN SUCCESS]', {
      userId: existing.id,
      accessToken,
      refreshToken,
    });

    return { user: userResponse, accessToken: accessToken, refreshToken: refreshToken };
  }

  async deleteById(userId: string): Promise<void> {
    const existing = await this.userRepository.getById(userId);

    if (!existing) {
      throw new Error('USER_NOT_FOUND');
    }

    const deleted = await this.userRepository.deleteById(userId);

    if (!deleted) {
      throw new Error('USER_DELETE_FAILED');
    }

    console.log('[DELETE USER SUCCESS]', { userId });
  }

  async getById(userId: string): Promise<UserResponse | null> {
    const existing = await this.userRepository.getById(userId);
    if (!existing) return null;
    const { password, ...userResponse } = existing;
    return userResponse;
  }

  async getByEmail(email: string): Promise<UserResponse | null> {
    const existing = await this.userRepository.getByEmail(email);
    if (!existing) return null;
    const { password, ...userResponse } = existing;
    return userResponse;
  }

  async getAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAll();
    return users.map(({ password, ...rest }) => rest);
  }
}

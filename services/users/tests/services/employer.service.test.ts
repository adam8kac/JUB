import { describe, it, expect, vi, beforeEach } from 'vitest';

import type {
  EmployerRegisterValidationRequest,
  EmployerResponse,
  EmployerDocument,
  EmployerData,
} from '../../src/types/employer.type.js';

const {
  createMock,
  findByCompanyRegistrationNumberMock,
  findByEmailMock,
  deleteByCompanyRegistrationNumberMock,
  checkRegisteredCompanyMock,
  generateSHA256Mock,
  generateAccessTokenMock,
  generateRefreshTokenMock,
  EmployerRepositoryMock,
} = vi.hoisted(() => {
  const createMock = vi.fn();
  const findByCompanyRegistrationNumberMock = vi.fn();
  const findByEmailMock = vi.fn();
  const deleteByCompanyRegistrationNumberMock = vi.fn();
  const checkRegisteredCompanyMock = vi.fn();
  const generateSHA256Mock = vi.fn();
  const generateAccessTokenMock = vi.fn();
  const generateRefreshTokenMock = vi.fn();
  const EmployerRepositoryMock = vi.fn().mockImplementation(() => ({
    create: createMock,
    findByCompanyRegistrationNumber: findByCompanyRegistrationNumberMock,
    findByEmail: findByEmailMock,
    deleteByCompanyRegistrationNumber: deleteByCompanyRegistrationNumberMock,
  }));

  return {
    createMock,
    findByCompanyRegistrationNumberMock,
    findByEmailMock,
    deleteByCompanyRegistrationNumberMock,
    checkRegisteredCompanyMock,
    generateSHA256Mock,
    generateAccessTokenMock,
    generateRefreshTokenMock,
    EmployerRepositoryMock,
  };
});

vi.mock('../../src/repositories/employer.repository.js', () => ({
  EmployerRepository: EmployerRepositoryMock,
}));

vi.mock('../../src/utils/employer.utils.js', () => ({
  checkRegisteredCompany: checkRegisteredCompanyMock,
}));

vi.mock('../../src/utils/password.utils.js', () => ({
  generateSHA256: generateSHA256Mock,
}));

vi.mock('../../src/utils/auth.utils.js', () => ({
  generateAccessToken: generateAccessTokenMock,
  generateRefreshToken: generateRefreshTokenMock,
}));

import { EmployerService } from '../../src/services/employer.service.js';

describe('EmployerService', () => {
  let service: EmployerService;
  let repoMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    repoMock = {
      create: createMock,
      findByCompanyRegistrationNumber: findByCompanyRegistrationNumberMock,
      findByEmail: findByEmailMock,
      deleteByCompanyRegistrationNumber: deleteByCompanyRegistrationNumberMock,
    };
    service = new EmployerService(repoMock);
  });

  const employerData: EmployerData = {
    fullName: 'Some Company',
    hseid: '123',
    legalForm: 'Ltd',
    registrationAuthority: 'Authority',
    street: 'Main',
    houseNumber: '1',
    houseNumberSuffix: '',
    settlement: 'Town',
    postalCode: '1000',
    city: 'City',
    country: 'Country',
  };

  it('registers employer when company exists in registry and not yet registered', async () => {
    const input: EmployerRegisterValidationRequest = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'plain',
      confirmPassword: 'plain',
    };

    checkRegisteredCompanyMock.mockResolvedValueOnce(employerData);
    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(null);
    generateSHA256Mock.mockReturnValueOnce('hashed-password');

    const createdDoc: EmployerDocument = {
      companyRegistrationNumber: input.companyRegistrationNumber,
      email: input.email,
      password: 'hashed-password',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    createMock.mockResolvedValueOnce(createdDoc);

    const result = await service.register(input);

    const expected: EmployerResponse = {
      companyRegistrationNumber: input.companyRegistrationNumber,
      email: input.email,
      data: employerData,
    };

    expect(checkRegisteredCompanyMock).toHaveBeenCalledWith('5002837000');
    expect(findByCompanyRegistrationNumberMock).toHaveBeenCalledWith('5002837000');
    expect(generateSHA256Mock).toHaveBeenCalledWith('plain');
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        companyRegistrationNumber: input.companyRegistrationNumber,
        email: input.email,
        password: 'hashed-password',
        data: employerData,
      }),
    );
    expect(result).toEqual(expected);
  });

  it('throws when company not found in registry', async () => {
    const input: EmployerRegisterValidationRequest = {
      companyRegistrationNumber: '0000000000',
      email: 'hr@company.com',
      password: 'plain',
      confirmPassword: 'plain',
    };

    checkRegisteredCompanyMock.mockResolvedValueOnce(null);

    await expect(service.register(input)).rejects.toThrowError(
      `Company with registration number ${input.companyRegistrationNumber} not found in registry`,
    );
  });

  it('throws when employer already registered', async () => {
    const input: EmployerRegisterValidationRequest = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'plain',
      confirmPassword: 'plain',
    };

    checkRegisteredCompanyMock.mockResolvedValueOnce(employerData);
    findByCompanyRegistrationNumberMock.mockResolvedValueOnce({ id: '5002837000' });

    await expect(service.register(input)).rejects.toThrowError(
      `Employer with registration number: ${input.companyRegistrationNumber} already registered`,
    );
  });

  it('logs in employer by registration number with correct password and returns tokens', async () => {
    const input = {
      companyRegistrationNumber: '5002837000',
      password: 'plain',
    };

    const stored: EmployerDocument = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'hashed',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(stored);
    generateSHA256Mock.mockReturnValueOnce('hashed');
    generateAccessTokenMock.mockReturnValueOnce('access-token');
    generateRefreshTokenMock.mockReturnValueOnce('refresh-token');

    const result = await service.login(input);

    expect(findByCompanyRegistrationNumberMock).toHaveBeenCalledWith('5002837000');
    expect(generateSHA256Mock).toHaveBeenCalledWith('plain');
    expect(generateAccessTokenMock).toHaveBeenCalledWith('5002837000');
    expect(generateRefreshTokenMock).toHaveBeenCalledWith('5002837000');

    expect(result).toEqual({
      employer: {
        companyRegistrationNumber: '5002837000',
        data: employerData,
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });

  it('logs in employer by email with correct password and returns tokens', async () => {
    const input = {
      email: 'hr@company.com',
      password: 'plain',
    };

    const stored: EmployerDocument = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'hashed',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    findByEmailMock.mockResolvedValueOnce(stored);
    generateSHA256Mock.mockReturnValueOnce('hashed');
    generateAccessTokenMock.mockReturnValueOnce('access-token');
    generateRefreshTokenMock.mockReturnValueOnce('refresh-token');

    const result = await service.login(input);

    expect(findByEmailMock).toHaveBeenCalledWith('hr@company.com');
    expect(generateSHA256Mock).toHaveBeenCalledWith('plain');
    expect(generateAccessTokenMock).toHaveBeenCalledWith('5002837000');
    expect(generateRefreshTokenMock).toHaveBeenCalledWith('5002837000');

    expect(result).toEqual({
      employer: {
        companyRegistrationNumber: '5002837000',
        data: employerData,
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });

  it('throws EMPLOYER_NOT_FOUND when login employer does not exist', async () => {
    const input = {
      companyRegistrationNumber: 'missing',
      password: 'plain',
    };

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(null);

    await expect(service.login(input)).rejects.toThrowError('EMPLOYER_NOT_FOUND');
  });

  it('throws EMPLOYER_INVALID_CREDENTIALS when password does not match', async () => {
    const input = {
      companyRegistrationNumber: '5002837000',
      password: 'wrong',
    };

    const stored: EmployerDocument = {
      companyRegistrationNumber: '5002837000',
      email: 'hr@company.com',
      password: 'correct-hash',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(stored);
    generateSHA256Mock.mockReturnValueOnce('other-hash');

    await expect(service.login(input)).rejects.toThrowError('EMPLOYER_INVALID_CREDENTIALS');
  });

  it('deletes employer when it exists', async () => {
    const number = '5002837000';

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce({
      companyRegistrationNumber: number,
      email: 'hr@company.com',
      password: 'hash',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    });
    deleteByCompanyRegistrationNumberMock.mockResolvedValueOnce(true);

    await service.deleteByCompanyRegistrationNumber(number);

    expect(findByCompanyRegistrationNumberMock).toHaveBeenCalledWith(number);
    expect(deleteByCompanyRegistrationNumberMock).toHaveBeenCalledWith(number);
  });

  it('throws EMPLOYER_NOT_FOUND when deleting non-existing employer', async () => {
    const number = 'missing';

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(null);

    await expect(service.deleteByCompanyRegistrationNumber(number)).rejects.toThrowError('EMPLOYER_NOT_FOUND');
    expect(deleteByCompanyRegistrationNumberMock).not.toHaveBeenCalled();
  });

  it('throws EMPLOYER_DELETE_FAILED when repository delete returns false', async () => {
    const number = '5002837000';

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce({
      companyRegistrationNumber: number,
      email: 'hr@company.com',
      password: 'hash',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    });
    deleteByCompanyRegistrationNumberMock.mockResolvedValueOnce(false);

    await expect(service.deleteByCompanyRegistrationNumber(number)).rejects.toThrowError('EMPLOYER_DELETE_FAILED');
  });

  it('returns employer by companyRegistrationNumber', async () => {
    const number = '5002837000';

    findByCompanyRegistrationNumberMock.mockResolvedValueOnce({
      companyRegistrationNumber: number,
      email: 'hr@company.com',
      password: 'hash',
      data: employerData,
      createdAt: '2024-01-01T00:00:00.000Z',
    });

    const result = await service.getByCompanyRegistrationNumber(number);

    expect(findByCompanyRegistrationNumberMock).toHaveBeenCalledWith(number);
    expect(result).toEqual({
      companyRegistrationNumber: number,
      email: 'hr@company.com',
      data: employerData,
    });
  });

  it('returns null when employer by companyRegistrationNumber does not exist', async () => {
    findByCompanyRegistrationNumberMock.mockResolvedValueOnce(null);

    const result = await service.getByCompanyRegistrationNumber('missing');

    expect(result).toBeNull();
  });

  it('returns all employers mapped to responses', async () => {
    const docs: EmployerDocument[] = [
      {
        companyRegistrationNumber: '5002837000',
        email: 'hr@company.com',
        password: 'hash',
        data: employerData,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      {
        companyRegistrationNumber: '1234567890',
        email: 'hr2@company.com',
        password: 'hash2',
        data: employerData,
        createdAt: '2024-01-02T00:00:00.000Z',
      },
    ];

    (repoMock.getAll as any) = vi.fn().mockResolvedValueOnce(docs);
    service = new EmployerService(repoMock);

    const result = await service.getAll();

    expect(repoMock.getAll as any).toHaveBeenCalled();
    expect(result).toEqual([
      {
        companyRegistrationNumber: '5002837000',
        email: 'hr@company.com',
        data: employerData,
      },
      {
        companyRegistrationNumber: '1234567890',
        email: 'hr2@company.com',
        data: employerData,
      },
    ]);
  });
});

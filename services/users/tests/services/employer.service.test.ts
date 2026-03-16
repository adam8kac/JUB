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
  checkRegisteredCompanyMock,
  generateSHA256Mock,
  EmployerRepositoryMock,
} = vi.hoisted(() => {
  const createMock = vi.fn();
  const findByCompanyRegistrationNumberMock = vi.fn();
  const checkRegisteredCompanyMock = vi.fn();
  const generateSHA256Mock = vi.fn();
  const EmployerRepositoryMock = vi.fn().mockImplementation(() => ({
    create: createMock,
    findByCompanyRegistrationNumber: findByCompanyRegistrationNumberMock,
  }));

  return {
    createMock,
    findByCompanyRegistrationNumberMock,
    checkRegisteredCompanyMock,
    generateSHA256Mock,
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

import { EmployerService } from '../../src/services/employer.service.js';

describe('EmployerService', () => {
  let service: EmployerService;
  let repoMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    repoMock = {
      create: createMock,
      findByCompanyRegistrationNumber: findByCompanyRegistrationNumberMock,
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
      `Employer with ${input.companyRegistrationNumber} already registered`,
    );
  });
});

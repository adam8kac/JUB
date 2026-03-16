import { EmployerRepository } from '../repositories/employer.repository.js';
import {
  EmployerDocument,
  EmployerLoginRequest,
  EmployerLoginResponse,
  EmployerRegisterValidationRequest,
  EmployerResponse,
} from '../types/employer.type.js';
import { generateAccessToken, generateRefreshToken } from '../utils/auth.utils.js';
import { checkRegisteredCompany } from '../utils/employer.utils.js';
import { generateSHA256 } from '../utils/password.utils.js';

export class EmployerService {
  constructor(private employerRepository: EmployerRepository = new EmployerRepository()) {}

  async register(employer: EmployerRegisterValidationRequest): Promise<EmployerResponse> {
    const registry = await checkRegisteredCompany(employer.companyRegistrationNumber);
    console.log(registry);

    if (!registry) {
      throw new Error(`Company with registration number ${employer.companyRegistrationNumber} not found in registry`);
    }

    const existing = await this.employerRepository.findByCompanyRegistrationNumber(employer.companyRegistrationNumber);
    if (existing) {
      throw new Error(`Employer with registration number: ${employer.companyRegistrationNumber} already registered`);
    }

    const existingEmail = await this.employerRepository.findByEmail(employer.email);
    if (existingEmail) {
      throw new Error(`Employer with email: ${employer.email} already registered`);
    }

    const employerDoc: EmployerDocument = {
      companyRegistrationNumber: employer.companyRegistrationNumber,
      email: employer.email,
      password: generateSHA256(employer.password),
      data: registry,
      createdAt: new Date().toISOString(),
    };

    const created = await this.employerRepository.create(employerDoc);

    if (!created) {
      throw new Error('Could not register an employer');
    }

    const employerResponse: EmployerResponse = {
      companyRegistrationNumber: created.companyRegistrationNumber,
      email: created.email,
      data: created.data,
    };

    return employerResponse;
  }

  //  problem če dam in email in company registration number s tem da je registration number narobe email pa pravilen?????
  async login(
    employer: EmployerLoginRequest,
  ): Promise<{ employer: EmployerLoginResponse; accessToken: string; refreshToken: string }> {
    let existingEmployer = null;
    let choice: 'byReg' | 'byEmail';

    if (employer.companyRegistrationNumber) {
      console.log('[EMPLOYER][LOGIN] Looking up by registration number', employer.companyRegistrationNumber);
      existingEmployer = await this.employerRepository.findByCompanyRegistrationNumber(
        employer.companyRegistrationNumber,
      );
      choice = 'byReg';
    } else {
      console.log('[EMPLOYER][LOGIN] Looking up by email', employer.email);
      existingEmployer = await this.employerRepository.findByEmail(employer.email!);
      choice = 'byEmail';
    }

    if (!existingEmployer) {
      console.warn('[EMPLOYER][LOGIN] Employer not found', {
        by: choice,
        companyRegistrationNumber: employer.companyRegistrationNumber,
        email: employer.email,
      });
      throw new Error('EMPLOYER_NOT_FOUND');
    }

    const hashed = generateSHA256(employer.password);
    if (hashed !== existingEmployer.password) {
      console.warn('[EMPLOYER][LOGIN] Invalid credentials', {
        by: choice,
        companyRegistrationNumber: employer.companyRegistrationNumber,
        email: employer.email,
      });
      throw new Error('EMPLOYER_INVALID_CREDENTIALS');
    }

    const accessToken = generateAccessToken(existingEmployer.companyRegistrationNumber);
    const refreshToken = generateRefreshToken(existingEmployer.companyRegistrationNumber);

    return {
      employer: {
        companyRegistrationNumber: existingEmployer.companyRegistrationNumber,
        data: existingEmployer.data,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async deleteByCompanyRegistrationNumber(companyRegistrationNumber: string): Promise<void> {
    const existing = await this.employerRepository.findByCompanyRegistrationNumber(companyRegistrationNumber);

    if (!existing) {
      throw new Error('EMPLOYER_NOT_FOUND');
    }

    const deleted = await this.employerRepository.deleteByCompanyRegistrationNumber(companyRegistrationNumber);

    if (!deleted) {
      throw new Error('EMPLOYER_DELETE_FAILED');
    }

    console.log('[EMPLOYER][DELETE SUCCESS]', { companyRegistrationNumber });
  }

  async getByCompanyRegistrationNumber(companyRegistrationNumber: string): Promise<EmployerResponse | null> {
    const existing = await this.employerRepository.findByCompanyRegistrationNumber(companyRegistrationNumber);
    if (!existing) return null;
    return {
      companyRegistrationNumber: existing.companyRegistrationNumber,
      email: existing.email,
      data: existing.data,
    };
  }

  async getAll(): Promise<EmployerResponse[]> {
    const employers = await this.employerRepository.getAll();
    return employers.map((e) => ({
      companyRegistrationNumber: e.companyRegistrationNumber,
      email: e.email,
      data: e.data,
    }));
  }
}

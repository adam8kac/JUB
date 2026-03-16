export interface EmployerRegisterValidationRequest {
  companyRegistrationNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmployerRegisterRequest {
  companyRegistrationNumber: string;
  email: string;
  password: string;
}

export interface EmployerData {
  fullName: string;
  hseid: string;
  legalForm: string;
  registrationAuthority: string;
  street: string;
  houseNumber: string;
  houseNumberSuffix: string;
  settlement: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface EmployerDocument {
  companyRegistrationNumber: string;
  email: string;
  password: string;
  data: EmployerData;
  createdAt: string;
}

export interface EmployerResponse {
  companyRegistrationNumber: string;
  email: string;
  data: EmployerData;
}

export interface EmployerLoginRequest {
  email?: string;
  companyRegistrationNumber?: string;
  password: string;
}

export interface EmployerLoginResponse {
  companyRegistrationNumber: string;
  data: EmployerData;
}

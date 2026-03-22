export interface CVPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  website?: string;
}

export interface CVExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface CVEducation {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

export interface CVData {
  uid?: string;
  personalInfo: CVPersonalInfo;
  summary?: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: string[];
}

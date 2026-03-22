export interface CVExperience {
  id?: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface CVEducation {
  id?: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
}

export interface CVData {
  uid?: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedIn?: string
    website?: string
  }
  summary: string
  experience: CVExperience[]
  education: CVEducation[]
  skills: string[]
}

export interface PublicCV {
  uid: string
  name?: string
  personalInfo?: {
    firstName?: string
    lastName?: string
    email?: string
    location?: string
  }
  skills?: string[]
  summary?: string
  experience?: CVExperience[]
  education?: CVEducation[]
  updatedAt?: string
}

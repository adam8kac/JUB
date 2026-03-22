export interface Job {
  id: string | number
  title: string
  description?: string
  // hub service uses jobCategory, fallback to category
  jobCategory?: string
  category?: string
  workType?: string
  location?: string
  experienceLevel?: string
  salaryMin?: number
  salaryMax?: number
  employerId?: string
  companyName?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface JobFormData {
  title: string
  description: string
  jobCategory: string
  workType: string
  location: string
  experienceLevel: string
  salaryMin: string
  salaryMax: string
}

// Hub service enum → display label
export const WORK_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: 'Polni delovni čas',
  PART_TIME: 'Skrajšani delovni čas',
  CONTRACT: 'Projektno delo',
  INTERNSHIP: 'Pripravništvo',
  VOLUNTEER: 'Prostovoljstvo',
  // fallback - if already slovenian, pass through
}

export const EXPERIENCE_LABELS: Record<string, string> = {
  ENTRY: 'Brez izkušenj',
  JUNIOR: 'Junior',
  MID: 'Mid-level',
  SENIOR: 'Senior',
  LEAD: 'Vodstveni položaj',
}

export function getWorkTypeLabel(val?: string) {
  if (!val) return 'Ni določeno'
  return WORK_TYPE_LABELS[val] || val
}

export function getExperienceLabel(val?: string) {
  if (!val) return ''
  return EXPERIENCE_LABELS[val] || val
}

export function getCategory(job: Job) {
  return job.jobCategory || job.category || ''
}

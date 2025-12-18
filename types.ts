
export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';

export type ApplicationStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  location: string;
  description: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  category: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  description: string;
  requirements: string[];
  postedAt: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedAt: string;
  resumeUrl: string;
  notes?: string;
  history: {
    status: ApplicationStatus;
    updatedAt: string;
    note?: string;
  }[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

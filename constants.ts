
import { Job, Company, User, Application } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'CANDIDATE',
  avatar: 'https://picsum.photos/seed/alex/200'
};

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'TechFlow',
    logo: 'https://picsum.photos/seed/techflow/200',
    location: 'San Francisco, CA',
    description: 'Leading the wave in cloud computing and AI solutions.'
  },
  {
    id: 'c2',
    name: 'NexGen Digital',
    logo: 'https://picsum.photos/seed/nexgen/200',
    location: 'Remote / New York',
    description: 'A creative agency focusing on user-centric web applications.'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    companyId: 'c1',
    title: 'Senior Frontend Engineer',
    category: 'Engineering',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    type: 'Full-time',
    description: 'Join our elite engineering team to build the future of cloud dashboards.',
    requirements: ['React', 'TypeScript', 'Tailwind', 'Performance Optimization'],
    postedAt: '2023-11-20',
    status: 'OPEN'
  },
  {
    id: 'j2',
    companyId: 'c2',
    title: 'Product Designer',
    category: 'Design',
    location: 'Remote',
    salary: '$110k - $140k',
    type: 'Remote',
    description: 'We are looking for a designer with an eye for motion and premium aesthetics.',
    requirements: ['Figma', 'Prototyping', 'User Research', 'Framer Motion'],
    postedAt: '2023-11-22',
    status: 'OPEN'
  },
  {
    id: 'j3',
    companyId: 'c1',
    title: 'Backend Systems Architect',
    category: 'Engineering',
    location: 'New York, NY',
    salary: '$160k - $210k',
    type: 'Full-time',
    description: 'Design robust distributed systems for high-traffic applications.',
    requirements: ['Node.js', 'Go', 'Kubernetes', 'PostgreSQL'],
    postedAt: '2023-11-18',
    status: 'OPEN'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    jobId: 'j1',
    candidateId: 'u1',
    status: 'INTERVIEW',
    appliedAt: '2023-11-21',
    resumeUrl: 'resume.pdf',
    history: [
      { status: 'APPLIED', updatedAt: '2023-11-21' },
      { status: 'SCREENING', updatedAt: '2023-11-22' },
      { status: 'INTERVIEW', updatedAt: '2023-11-24', note: 'Strong technical performance.' }
    ]
  }
];

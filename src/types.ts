export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  technologies: string[];
  description: string;
  features?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  imageUrl?: string;
  badge?: string;
  featured?: boolean;
}

export interface TechnicalSkillItem {
  name: string;
  category: 'Core' | 'Web' | 'AI & Cloud' | 'DevOps & Tools';
  level: number;
  icon: string;
  verified: boolean;
  description: string;
}

export interface CreativeSkillItem {
  name: string;
  tools: string;
  highlight: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  credentialId?: string;
  description: string;
  imageUrl?: string;
  topics: string[];
  verified: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  type: 'hackathon' | 'internship';
  featured?: boolean;
  description: string;
  highlights: string[];
  certificateId?: string;
  technologies: string[];
}

export interface CreativeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  beforeImageUrl?: string;
  tags: string[];
  aspectRatio?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  status: string;
  highlights: string[];
  // [EDITABLE PLACEHOLDER]: Add CGPA once officially published
  cgpaPlaceholder?: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
  portfolio: string;
  resumeUrl?: string;
}

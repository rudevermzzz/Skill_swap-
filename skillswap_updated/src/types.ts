export type ViewMode = 
  | 'landing' 
  | 'login' 
  | 'onboarding' 
  | 'dashboard' 
  | 'explore' 
  | 'aimatch' 
  | 'profile' 
  | 'messaging' 
  | 'livesession' 
  | 'leaderboard';

export interface VerifiedSkill {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  verified: boolean;
  endorsements: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  skillExchanged: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  imageUrl: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skill: string;
  badgeUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  tagline: string;
  location: string;
  timezone: string;
  teachSkills: VerifiedSkill[];
  learnSkills: VerifiedSkill[];
  rating: number;
  totalSessionsCompleted: number;
  totalHoursExchanged: number;
  xp: number;
  level: number;
  karma: number;
  streakDays: number;
  rank: string;
  badges: string[];
  verified: boolean;
  learningStyle: 'Live Project' | 'Video & Discussion' | 'Structured Mentorship' | 'Interactive Sandbox';
  availability: string[];
  portfolio: PortfolioProject[];
  certificates: Certificate[];
  reviews: Review[];
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface SessionItem {
  id: string;
  peerName: string;
  peerAvatar: string;
  teachSkill: string;
  learnSkill: string;
  dateTime: string;
  durationMinutes: number;
  status: 'upcoming' | 'completed' | 'live' | 'cancelled';
  meetUrl: string;
  goals: string[];
}

export interface AIMatchResult {
  id: string;
  peer: UserProfile;
  matchScore: number;
  compatibilityLabel: string;
  synergyReasons: string[];
  predictedSuccessRate: string;
  sharedInterests: string[];
  suggestedRoadmap: {
    week: string;
    focus: string;
    details: string;
  }[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  reactions?: { emoji: string; count: number; userReacted?: boolean }[];
  fileAttachment?: {
    name: string;
    size: string;
    url: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  country: string;
  xp: number;
  karma: number;
  streak: number;
  tier: 'Grandmaster' | 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  topSkill: string;
}

export interface OnboardingData {
  teachSkills: string[];
  learnSkills: string[];
  availabilityDays: string[];
  timezone: string;
  preferredStyle: string;
  generatedBio?: string;
}

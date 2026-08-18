import { UserProfile, SessionItem, ChatMessage, LeaderboardUser, AIMatchResult } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user-001',
  name: 'Alex Rivera',
  handle: '@alexrivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  bio: 'Full-stack Architect & Open Source Contributor. Passionate about TypeScript, WebAssembly, and Systems Design. Currently mastering conversational Spanish & Machine Learning.',
  tagline: 'Teaching React & Systems • Learning Spanish & PyTorch',
  location: 'San Francisco, CA',
  timezone: 'UTC-8 (PST)',
  teachSkills: [
    { name: 'React & Next.js', category: 'Frontend', level: 'Master', verified: true, endorsements: 48 },
    { name: 'TypeScript', category: 'Programming', level: 'Master', verified: true, endorsements: 52 },
    { name: 'System Architecture', category: 'Backend', level: 'Advanced', verified: true, endorsements: 31 },
  ],
  learnSkills: [
    { name: 'Spanish Fluency', category: 'Languages', level: 'Intermediate', verified: false, endorsements: 12 },
    { name: 'PyTorch & AI Models', category: 'Data Science', level: 'Beginner', verified: false, endorsements: 8 },
    { name: 'UI/UX Design Systems', category: 'Design', level: 'Intermediate', verified: false, endorsements: 19 },
  ],
  rating: 4.98,
  totalSessionsCompleted: 64,
  totalHoursExchanged: 92,
  xp: 14850,
  level: 18,
  karma: 1240,
  streakDays: 14,
  rank: 'Diamond Exchange Fellow',
  badges: ['Top 1% Mentor', '100+ Hours Exchanged', 'Community Catalyst', 'Fast Responder'],
  verified: true,
  learningStyle: 'Live Project',
  availability: ['Mon 18:00 - 20:00', 'Wed 18:00 - 20:00', 'Sat 10:00 - 14:00'],
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  portfolio: [
    {
      id: 'p1',
      title: 'NeuralCanvas Engine',
      description: 'Real-time WebGL canvas driven by local browser generative shaders.',
      tags: ['TypeScript', 'WebGL', 'Shaders'],
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      link: '#'
    },
    {
      id: 'p2',
      title: 'Distributed Queue Core',
      description: 'High-throughput event queue in Rust with zero-copy deserialization.',
      tags: ['Rust', 'Distributed Systems'],
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      link: '#'
    }
  ],
  certificates: [
    {
      id: 'c1',
      title: 'Master Skill Swapper',
      issuer: 'SkillSwap Protocol',
      date: 'Jan 2026',
      skill: 'Peer Mentorship',
      badgeUrl: '🎖️'
    },
    {
      id: 'c2',
      title: 'Advanced React Architecture',
      issuer: 'Frontend Masters',
      date: 'Nov 2025',
      skill: 'React',
      badgeUrl: '⚡'
    }
  ],
  reviews: [
    {
      id: 'r1',
      authorName: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      date: '2 days ago',
      comment: 'Alex explain React Server Components with incredible clarity! In exchange, we practiced conversational Spanish idioms. Outstanding session!',
      skillExchanged: 'React ↔ Spanish'
    },
    {
      id: 'r2',
      authorName: 'Kenji Sato',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      date: '1 week ago',
      comment: 'Super structured teacher. Alex helped me debug my async state machine while giving tips on component composition.',
      skillExchanged: 'TypeScript ↔ System Design'
    }
  ]
};

export const MENTORS_LIST: UserProfile[] = [
  {
    id: 'user-002',
    name: 'Elena Rostova',
    handle: '@elena_es',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
    bio: 'Native Spanish Speaker & Certified Polyglot from Madrid. Passionate about modern Frontend Engineering and Web Design.',
    tagline: 'Teaching Native Spanish • Learning React & Tailwind',
    location: 'Madrid, Spain',
    timezone: 'UTC+1 (CET)',
    teachSkills: [
      { name: 'Native Spanish', category: 'Languages', level: 'Master', verified: true, endorsements: 89 },
      { name: 'Linguistic Coaching', category: 'Education', level: 'Advanced', verified: true, endorsements: 44 }
    ],
    learnSkills: [
      { name: 'React & Next.js', category: 'Frontend', level: 'Intermediate', verified: false, endorsements: 15 },
      { name: 'Tailwind CSS', category: 'Design', level: 'Intermediate', verified: false, endorsements: 20 }
    ],
    rating: 4.99,
    totalSessionsCompleted: 112,
    totalHoursExchanged: 160,
    xp: 22400,
    level: 24,
    karma: 1980,
    streakDays: 28,
    rank: 'Grandmaster Language Mentor',
    badges: ['Top Rated Mentor', 'Language Specialist', '100+ Hours Exchanged'],
    verified: true,
    learningStyle: 'Live Project',
    availability: ['Tue 17:00 - 21:00', 'Thu 17:00 - 21:00', 'Sat 12:00 - 18:00'],
    portfolio: [],
    certificates: [],
    reviews: []
  },
  {
    id: 'user-003',
    name: 'Kenji Sato',
    handle: '@kenji_ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    bio: 'Senior Machine Learning Scientist at AI Research Lab. Teaching PyTorch, Transformers, and LLM Fine-tuning in exchange for Rust & WebAssembly.',
    tagline: 'Teaching PyTorch & LLMs • Learning Rust & WASM',
    location: 'Tokyo, Japan',
    timezone: 'UTC+9 (JST)',
    teachSkills: [
      { name: 'PyTorch & Deep Learning', category: 'AI/ML', level: 'Master', verified: true, endorsements: 110 },
      { name: 'LLM Fine-tuning', category: 'AI/ML', level: 'Master', verified: true, endorsements: 84 }
    ],
    learnSkills: [
      { name: 'Rust Core', category: 'Programming', level: 'Beginner', verified: false, endorsements: 10 },
      { name: 'WebAssembly', category: 'Systems', level: 'Beginner', verified: false, endorsements: 8 }
    ],
    rating: 4.97,
    totalSessionsCompleted: 88,
    totalHoursExchanged: 130,
    xp: 19200,
    level: 21,
    karma: 1650,
    streakDays: 19,
    rank: 'Grandmaster AI Researcher',
    badges: ['AI Pioneer', 'Verified Scientist', 'Streak Master'],
    verified: true,
    learningStyle: 'Structured Mentorship',
    availability: ['Mon 09:00 - 12:00', 'Fri 14:00 - 18:00'],
    portfolio: [],
    certificates: [],
    reviews: []
  },
  {
    id: 'user-004',
    name: 'Sophia Chen',
    handle: '@sophia_ui',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    bio: 'Lead Design Systems Engineer at FinTech startup. Crafting pixel-perfect design systems, micro-interactions, and motion graphics in exchange for Python backend APIs.',
    tagline: 'Teaching Figma & UI Motion • Learning Python & FastAPI',
    location: 'Vancouver, Canada',
    timezone: 'UTC-8 (PST)',
    teachSkills: [
      { name: 'Figma Design Systems', category: 'Design', level: 'Master', verified: true, endorsements: 95 },
      { name: 'UI Motion & Micro-interactions', category: 'Design', level: 'Master', verified: true, endorsements: 76 }
    ],
    learnSkills: [
      { name: 'Python Backend', category: 'Backend', level: 'Intermediate', verified: false, endorsements: 18 },
      { name: 'FastAPI', category: 'Backend', level: 'Beginner', verified: false, endorsements: 11 }
    ],
    rating: 4.98,
    totalSessionsCompleted: 95,
    totalHoursExchanged: 142,
    xp: 20100,
    level: 22,
    karma: 1820,
    streakDays: 22,
    rank: 'Design Systems Architect',
    badges: ['Design Luminary', 'Pixel Perfectionist'],
    verified: true,
    learningStyle: 'Interactive Sandbox',
    availability: ['Wed 16:00 - 20:00', 'Sat 10:00 - 15:00'],
    portfolio: [],
    certificates: [],
    reviews: []
  },
  {
    id: 'user-005',
    name: 'Marcus Vance',
    handle: '@marcus_v',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    bio: 'Product Growth Lead & Ex-Founder. Teaching SaaS Growth Loops, Retention Analytics & Pitch Deck Storytelling for Node.js microservices.',
    tagline: 'Teaching Growth Strategy • Learning Node.js & Docker',
    location: 'London, UK',
    timezone: 'UTC+0 (GMT)',
    teachSkills: [
      { name: 'SaaS Growth & Metrics', category: 'Business', level: 'Master', verified: true, endorsements: 62 },
      { name: 'Product Analytics', category: 'Business', level: 'Advanced', verified: true, endorsements: 41 }
    ],
    learnSkills: [
      { name: 'Node.js & Express', category: 'Backend', level: 'Intermediate', verified: false, endorsements: 14 },
      { name: 'Docker Containers', category: 'DevOps', level: 'Beginner', verified: false, endorsements: 9 }
    ],
    rating: 4.93,
    totalSessionsCompleted: 58,
    totalHoursExchanged: 84,
    xp: 13200,
    level: 16,
    karma: 1100,
    streakDays: 11,
    rank: 'Growth Mentor',
    badges: ['Ex-Founder', 'Analytics Master'],
    verified: true,
    learningStyle: 'Video & Discussion',
    availability: ['Mon 18:00 - 21:00', 'Fri 17:00 - 20:00'],
    portfolio: [],
    certificates: [],
    reviews: []
  }
];

export const UPCOMING_SESSIONS: SessionItem[] = [
  {
    id: 'session-101',
    peerName: 'Elena Rostova',
    peerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    teachSkill: 'React State Machines',
    learnSkill: 'Spanish Business Vocabulary',
    dateTime: 'Today, 18:30 PM PST',
    durationMinutes: 45,
    status: 'upcoming',
    meetUrl: '#',
    goals: [
      'Build 1-on-1 state management example in React',
      'Practice 20 minutes of conversational Spanish in business scenarios',
      'Review homework idioms'
    ]
  },
  {
    id: 'session-102',
    peerName: 'Kenji Sato',
    peerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    teachSkill: 'TypeScript Generics',
    learnSkill: 'PyTorch Tensor Operations',
    dateTime: 'Tomorrow, 10:00 AM PST',
    durationMinutes: 60,
    status: 'upcoming',
    meetUrl: '#',
    goals: [
      'Cover generic constraints & conditional types',
      'Walkthrough matrix multiplication in PyTorch tensors',
      'Set up Jupyter environment'
    ]
  }
];

export const SAMPLE_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'user-002',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    text: '¡Hola Alex! Are we still good for our React ↔ Spanish exchange session at 18:30 today?',
    timestamp: '10:14 AM',
    reactions: [{ emoji: '🔥', count: 2, userReacted: true }]
  },
  {
    id: 'm2',
    senderId: 'user-001',
    senderName: 'Alex Rivera',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    text: 'Yes absolutely! I prepared a custom React hook example that demonstrates cleanly how custom hooks separate state logic from UI rendering.',
    timestamp: '10:16 AM',
    codeSnippet: {
      language: 'typescript',
      code: `function useSkillSwapSession(sessionId: string) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  // Connect peer audio stream & AI transcription
  return { status, startSession: () => setStatus('active') };
}`
    }
  },
  {
    id: 'm3',
    senderId: 'user-002',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    text: '¡Excelente! I recorded a quick 15-second audio guide for Spanish pronunciation on tech terms!',
    timestamp: '10:18 AM',
    isAudio: true,
    audioDuration: '0:14'
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'u10',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    country: '🇨🇦 Canada',
    xp: 38400,
    karma: 3420,
    streak: 42,
    tier: 'Grandmaster',
    topSkill: 'Figma Design Systems'
  },
  {
    rank: 2,
    id: 'u11',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    country: '🇪🇸 Spain',
    xp: 34100,
    karma: 2980,
    streak: 38,
    tier: 'Grandmaster',
    topSkill: 'Native Spanish'
  },
  {
    rank: 3,
    id: 'u12',
    name: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    country: '🇯🇵 Japan',
    xp: 29800,
    karma: 2450,
    streak: 31,
    tier: 'Diamond',
    topSkill: 'PyTorch & Deep Learning'
  },
  {
    rank: 4,
    id: 'user-001',
    name: 'Alex Rivera (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    country: '🇺🇸 United States',
    xp: 14850,
    karma: 1240,
    streak: 14,
    tier: 'Diamond',
    topSkill: 'React & TypeScript'
  },
  {
    rank: 5,
    id: 'u14',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    country: '🇬🇧 United Kingdom',
    xp: 13200,
    karma: 1100,
    streak: 11,
    tier: 'Platinum',
    topSkill: 'Growth Strategy'
  }
];

export const CATEGORY_SKILLS = [
  'React & Next.js',
  'TypeScript',
  'Python Backend',
  'PyTorch & AI',
  'Native Spanish',
  'Japanese Language',
  'Figma Design Systems',
  'UI Motion Graphics',
  'Rust Programming',
  'System Architecture',
  'SaaS Growth Marketing',
  'Financial Modeling',
  'Public Speaking',
  'Copywriting',
  'Video Editing & Premiere',
  '3D Modeling & Blender'
];

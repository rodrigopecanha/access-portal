export type UserLevel = 'Explorer' | 'Builder' | 'Architect' | 'Master';

export type ChallengeType = 'video' | 'quiz' | 'case-study' | 'practical';

export type BadgeCategory = 'completion' | 'skill' | 'achievement' | 'special';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'sc' | 'manager' | 'admin';
  level: UserLevel;
  xp: number;
  xpToNextLevel: number;
  badges: string[];
  completedChallenges: string[];
  completedLessons: string[];
  completedModules: string[];
  completedTrails: string[];
  currentStreak: number;
  longestStreak: number;
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  xpReward: number;
  unlockedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  xpReward: number;
  duration: number; // in minutes
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'slides';
  duration: number;
  xpReward: number;
  content?: string;
  videoUrl?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  xpReward: number;
  isCompleted?: boolean;
}

export interface BossChallenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  acceptedFormats: string[];
  xpReward: number;
  submissionUrl?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

// Localized text structure for i18n support
export type SupportedLocale = 'pt-BR' | 'en-US';

export interface LocalizedText {
  'pt-BR': string;
  'en-US'?: string;
}

// Helper function to get localized text with fallback
export function getLocalizedText(text: LocalizedText | string, locale: SupportedLocale): string {
  if (typeof text === 'string') return text;
  return text[locale] || text['pt-BR'];
}

// New: Practical Challenge for challenge-based modules
export interface PracticalChallenge {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  instructions?: LocalizedText;
  medals: ChallengeMedal[];
  acceptedFormats: string[];
  xpReward: number;
  isFinalChallenge?: boolean;
  isSubmitted?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface ChallengeMedal {
  id: string;
  icon: string;
  name: LocalizedText;
  description?: LocalizedText;
  isEarned?: boolean;
}

// Optional video section for challenge-based modules
export interface OptionalLearning {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'slides';
  duration: number;
  xpReward: number;
  videoUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  challenges: Challenge[];
  xpReward: number;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  learningContent: LearningContent[];
  assessment: Assessment;
  bossChallenge: BossChallenge;
  lessons?: Lesson[]; // deprecated, kept for compatibility
  xpReward: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  // New: challenge-based module structure
  isChallengeBased?: boolean;
  optionalLearning?: OptionalLearning[];
  practicalChallenges?: PracticalChallenge[];
}

export interface SubTrack {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  modules: Module[];
  xpReward: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  progress?: number;
  status?: 'active' | 'coming-soon' | 'hidden';
}

export interface Trail {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  subTracks: SubTrack[];
  xpReward: number;
  prerequisites: string[];
  estimatedHours: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  progress?: number;
}

export interface LevelConfig {
  name: UserLevel;
  minXp: number;
  maxXp: number;
  color: string;
  icon: string;
}

export const LEVELS: LevelConfig[] = [
  { name: 'Explorer', minXp: 0, maxXp: 1000, color: 'bronze', icon: '🧭' },
  { name: 'Builder', minXp: 1000, maxXp: 3000, color: 'silver', icon: '🔧' },
  { name: 'Architect', minXp: 3000, maxXp: 7000, color: 'gold', icon: '📐' },
  { name: 'Master', minXp: 7000, maxXp: 15000, color: 'diamond', icon: '👑' },
];

export function getLevelFromXp(xp: number): LevelConfig {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getXpProgress(xp: number): { current: number; max: number; percentage: number } {
  const level = getLevelFromXp(xp);
  const nextLevelIndex = LEVELS.findIndex(l => l.name === level.name) + 1;
  const nextLevel = LEVELS[nextLevelIndex] || level;
  
  const current = xp - level.minXp;
  const max = nextLevel.minXp - level.minXp;
  const percentage = max > 0 ? (current / max) * 100 : 100;
  
  return { current, max, percentage };
}

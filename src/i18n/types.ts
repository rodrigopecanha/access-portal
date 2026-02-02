export type Language = 'pt-BR' | 'en-US';

export interface TranslationDictionary {
  // Common UI elements
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    back: string;
    next: string;
    submit: string;
    close: string;
    search: string;
    filter: string;
    optional: string;
    required: string;
    actions: string;
    view: string;
    edit: string;
    delete: string;
    confirm: string;
  };
  
  // Navigation
  nav: {
    dashboard: string;
    tracks: string;
    profile: string;
    management: string;
    learningPath: string;
  };
  
  // Dashboard / Home
  dashboard: {
    greeting: string;
    continueJourney: string;
    overallProgress: string;
    complete: string;
    consecutiveDays: string;
    badges: string;
    challenges: string;
    nextContent: string;
    yourAchievements: string;
    featuredTracks: string;
    progress: string;
  };
  
  // Tracks
  tracks: {
    title: string;
    subtitle: string;
    track: string;
    subTrack: string;
    module: string;
    feature: string;
    advancedFeature: string;
    basicFeatures: string;
    advancedFeatures: string;
    estimatedTime: string;
    xpReward: string;
    prerequisites: string;
    completePrerequisites: string;
    comingSoon: string;
    locked: string;
    unlocked: string;
    completed: string;
    inProgress: string;
    notStarted: string;
  };
  
  // Challenges
  challenges: {
    title: string;
    subtitle: string;
    challenge: string;
    practicalChallenge: string;
    finalChallenge: string;
    quiz: string;
    caseStudy: string;
    video: string;
    scenario: string;
    client: string;
    problemDescription: string;
    requirements: string;
    delivery: string;
    objective: string;
    submitFile: string;
    dragDropFile: string;
    selectFile: string;
    supportedFormats: string;
    submitChallenge: string;
    challengeCompleted: string;
    congratulations: string;
    xpEarned: string;
    moduleCompleted: string;
    allChallengesCompleted: string;
    backToSubTrack: string;
    supportContent: string;
    watchVideos: string;
    medals: string;
    optionalMedals: string;
  };
  
  // Gamification
  gamification: {
    level: string;
    xp: string;
    currentLevel: string;
    nextLevel: string;
    streak: string;
    badge: string;
    achievement: string;
    unlocked: string;
    locked: string;
    earned: string;
  };
  
  // Profile
  profile: {
    title: string;
    myProfile: string;
    stats: string;
    achievements: string;
    settings: string;
    completedTracks: string;
    completedChallenges: string;
    totalXP: string;
  };
  
  // Admin / Management
  admin: {
    title: string;
    users: string;
    analytics: string;
    content: string;
    settings: string;
  };
  
  // Errors & Empty States
  states: {
    notFound: string;
    moduleNotFound: string;
    trackNotFound: string;
    noData: string;
    comingSoon: string;
    backToTracks: string;
  };
}

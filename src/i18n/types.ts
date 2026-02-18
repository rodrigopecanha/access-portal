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
    continue: string;
    validating: string;
    hours: string;
    minutes: string;
    contents: string;
    questions: string;
    minimum: string;
    score: string;
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
    continueChallenge: string;
  };
  
  // Tracks
  tracks: {
    title: string;
    subtitle: string;
    track: string;
    subTrack: string;
    module: string;
    modules: string;
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
    hours: string;
  };
  
  // Challenges
  challenges: {
    title: string;
    subtitle: string;
    challenge: string;
    practicalChallenge: string;
    practicalChallenges: string;
    finalChallenge: string;
    bossChallenge: string;
    quiz: string;
    caseStudy: string;
    video: string;
    scenario: string;
    client: string;
    counterparty: string;
    originatesContract: string;
    externalParty: string;
    problemDescription: string;
    requirements: string;
    delivery: string;
    objective: string;
    context: string;
    instructions: string;
    submitFile: string;
    dragDropFile: string;
    selectFile: string;
    acceptedFormats: string;
    invalidFormat: string;
    submitSolution: string;
    submitSubmission: string;
    challengeCompleted: string;
    templateValidated: string;
    solutionSubmittedSuccess: string;
    completedFinalChallenge: string;
    continueNextChallenge: string;
    congratulations: string;
    xpEarned: string;
    xpGained: string;
    medalsEarned: string;
    moduleCompleted: string;
    allChallengesCompleted: string;
    backToSubTrack: string;
    supportContent: string;
    watchVideos: string;
    medals: string;
    optionalMedals: string;
    learningContent: string;
    finalAssessment: string;
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
    levelLabel: string;
    progressToNext: string;
    maxLevelReached: string;
    days: string;
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
    currentStreak: string;
    longestStreak: string;
    badges: string;
    challenges: string;
    progressByTrack: string;
  };

  // Admin / Management
  admin: {
    title: string;
    users: string;
    analytics: string;
    content: string;
    settings: string;
    teamManagement: string;
    trackTeamProgress: string;
    userProgress: string;
    user: string;
    streak: string;
  };
  
  // Errors & Empty States
  states: {
    notFound: string;
    moduleNotFound: string;
    trackNotFound: string;
    subTrackNotFound: string;
    noData: string;
    comingSoon: string;
    backToTracks: string;
  };
}

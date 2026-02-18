import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { TrailCard } from '@/components/trails/TrailCard';
import { Button } from '@/components/ui/button';
import { currentUser, trails, badges, calculateTrailProgress, getRecommendedChallengeWithContext, getOverallProgress } from '@/data/mockData';
import { getLocalizedText } from '@/types/learning';
import { Flame, Trophy, Target, ArrowRight, Megaphone } from 'lucide-react';
import { useTranslation, useLanguage } from '@/i18n';
import { useNavigate } from 'react-router-dom';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

export default function Index() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { justLoggedIn, clearJustLoggedIn } = useMockAuth();
  
  const overallProgress = getOverallProgress(currentUser);
  const recommended = getRecommendedChallengeWithContext(currentUser);
  const userBadges = badges.filter(b => currentUser.badges.includes(b.id));
  
  const animatedXP = useAnimatedNumber(currentUser.xp, 1200, justLoggedIn);
  const animatedProgress = useAnimatedNumber(overallProgress, 1000, justLoggedIn);
  const animatedStreak = useAnimatedNumber(currentUser.currentStreak, 800, justLoggedIn);
  const animatedBadges = useAnimatedNumber(userBadges.length, 800, justLoggedIn);
  const animatedChallenges = useAnimatedNumber(currentUser.completedChallenges.length, 800, justLoggedIn);

  useEffect(() => {
    if (justLoggedIn) {
      const timer = setTimeout(() => clearJustLoggedIn(), 2000);
      return () => clearTimeout(timer);
    }
  }, [justLoggedIn, clearJustLoggedIn]);

  const trailsWithProgress = trails.slice(0, 3).map(trail => ({
    ...trail,
    progress: calculateTrailProgress(trail, currentUser),
    isLocked: trail.prerequisites.some(p => !currentUser.completedTrails.includes(p))
  }));

  const handleContinueChallenge = () => {
    if (!recommended) return;
    if (recommended.isChallengeBased) {
      navigate(`/trails/${recommended.trailId}/subtrack/${recommended.subTrackId}/module/${recommended.moduleId}`);
    } else {
      navigate(`/trails/${recommended.trailId}/subtrack/${recommended.subTrackId}`);
    }
  };

  const mockAnnouncements = [
    {
      id: 1,
      message: 'Important: New Product Release Upcoming 02/26',
      type: 'highlight' as const,
    },
    {
      id: 2,
      message: 'Q1 certification deadline extended to March 15',
      type: 'info' as const,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {t.dashboard.greeting}, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">{t.dashboard.continueJourney}</p>
          </div>
          <XPDisplay xp={justLoggedIn ? animatedXP : currentUser.xp} showProgress size="lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Overall Progress */}
          <Card className="md:col-span-1 animate-scale-in">
            <CardContent className="p-6 flex flex-col items-center">
              <ProgressRing progress={justLoggedIn ? animatedProgress : overallProgress} size={140}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">
                    {justLoggedIn ? animatedProgress : overallProgress}%
                  </span>
                  <p className="text-xs text-muted-foreground">{t.dashboard.complete}</p>
                </div>
              </ProgressRing>
              <div className="mt-4">
                <LevelBadge xp={currentUser.xp} size="md" />
              </div>
            </CardContent>
          </Card>

          {/* Streak & Stats */}
          <Card className="md:col-span-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {justLoggedIn ? animatedStreak : currentUser.currentStreak}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.dashboard.consecutiveDays}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {justLoggedIn ? animatedBadges : userBadges.length}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.dashboard.badges}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {justLoggedIn ? animatedChallenges : currentUser.completedChallenges.length}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.dashboard.challenges}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card className="animate-fade-in border-l-4 border-l-warning" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-warning" />
              {t.dashboard.announcements}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {mockAnnouncements.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  item.type === 'highlight'
                    ? 'bg-warning/5 border-warning/20'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <span className="text-base mt-0.5">
                  {item.type === 'highlight' ? '📢' : 'ℹ️'}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Learning Content */}
        {recommended && (
          <Card className="animate-fade-in border-primary/30 shadow-md" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {t.dashboard.nextContent}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    {getLocalizedText(recommended.subTrackTitle, language)} • {getLocalizedText(recommended.moduleTitle, language)}
                  </p>
                  <h4 className="font-semibold text-foreground truncate">
                    {recommended.isChallengeBased 
                      ? getLocalizedText((recommended.content as any).title, language)
                      : (recommended.content as any).title
                    }
                  </h4>
                  {!recommended.isChallengeBased && (recommended.content as any).description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{(recommended.content as any).description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-medium text-xp-gold">+{recommended.content.xpReward} XP</span>
                  <Button size="sm" onClick={handleContinueChallenge} className="gap-1.5">
                    {t.dashboard.continueChallenge}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp-gold" />
              {t.dashboard.yourAchievements}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-6">
              {badges.map(badge => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  isUnlocked={currentUser.badges.includes(badge.id)} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trails Preview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-4">{t.dashboard.featuredTracks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trailsWithProgress.map((trail, idx) => (
              <div key={trail.id} className="animate-scale-in" style={{ animationDelay: `${0.5 + idx * 0.1}s` }}>
                <TrailCard 
                  trail={trail}
                  progress={trail.progress}
                  isLocked={trail.isLocked}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

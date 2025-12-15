import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { TrailCard } from '@/components/trails/TrailCard';
import { currentUser, trails, badges, calculateTrailProgress, getRecommendedChallenge, getOverallProgress } from '@/data/mockData';
import { Flame, Trophy, Target, Play, FileText, Presentation } from 'lucide-react';

export default function Index() {
  const overallProgress = getOverallProgress(currentUser);
  const recommendedChallenge = getRecommendedChallenge(currentUser);
  const userBadges = badges.filter(b => currentUser.badges.includes(b.id));
  
  const trailsWithProgress = trails.slice(0, 3).map(trail => ({
    ...trail,
    progress: calculateTrailProgress(trail, currentUser),
    isLocked: trail.prerequisites.some(p => !currentUser.completedTrails.includes(p))
  }));

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Olá, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">Continue sua jornada de aprendizado</p>
          </div>
          <XPDisplay xp={currentUser.xp} showProgress size="lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Overall Progress */}
          <Card className="md:col-span-1 animate-scale-in">
            <CardContent className="p-6 flex flex-col items-center">
              <ProgressRing progress={overallProgress} size={140}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">{overallProgress}%</span>
                  <p className="text-xs text-muted-foreground">Completo</p>
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
                    <p className="text-2xl font-bold text-foreground">{currentUser.currentStreak}</p>
                    <p className="text-sm text-muted-foreground">Dias seguidos</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userBadges.length}</p>
                    <p className="text-sm text-muted-foreground">Badges</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{currentUser.completedChallenges.length}</p>
                    <p className="text-sm text-muted-foreground">Desafios</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Learning Content */}
        {recommendedChallenge && (
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Próximo Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{recommendedChallenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{recommendedChallenge.description}</p>
                </div>
                <span className="text-sm font-medium text-xp-gold">+{recommendedChallenge.xpReward} XP</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp-gold" />
              Suas Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-6">
              {badges.slice(0, 6).map(badge => (
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
          <h2 className="text-xl font-semibold text-foreground mb-4">Trilhas em Destaque</h2>
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

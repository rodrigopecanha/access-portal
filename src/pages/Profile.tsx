import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { currentUser, badges, trails, calculateTrailProgress, getOverallProgress } from '@/data/mockData';
import { User, Calendar, Flame, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/i18n';
import { getLocalizedText } from '@/types/learning';

export default function Profile() {
  const { language } = useLanguage();
  const userBadges = badges.filter(b => currentUser.badges.includes(b.id));
  const overallProgress = getOverallProgress(currentUser);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl text-primary-foreground">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
                <p className="text-muted-foreground">{currentUser.email}</p>
                <div className="mt-2">
                  <LevelBadge xp={currentUser.xp} size="sm" />
                </div>
              </div>
              <XPDisplay xp={currentUser.xp} showProgress size="md" />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentUser.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Streak atual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-xp-gold mx-auto mb-2" />
              <p className="text-2xl font-bold">{userBadges.length}</p>
              <p className="text-sm text-muted-foreground">Badges</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentUser.completedChallenges.length}</p>
              <p className="text-sm text-muted-foreground">Desafios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentUser.longestStreak}</p>
              <p className="text-sm text-muted-foreground">Maior streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
          </CardHeader>
          <CardContent>
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

        {/* Trail Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso por Trilha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trails.map(trail => {
              const progress = calculateTrailProgress(trail, currentUser);
              return (
                <div key={trail.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{getLocalizedText(trail.title, language)}</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

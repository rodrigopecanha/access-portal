import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trails, currentUser } from '@/data/mockData';
import { ArrowLeft, Zap, CheckCircle2, ChevronRight, Play, Video, BookOpen, GraduationCap, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PracticalChallengeCard } from '@/components/trails/PracticalChallengeCard';
import { useTranslation, useLanguage } from '@/i18n';
import { getLocalizedText } from '@/types/learning';

export default function ChallengeBasedModule() {
  const { trailId, subTrackId, moduleId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const trail = trails.find(t => t.id === trailId);
  const subTrack = trail?.subTracks.find(st => st.id === subTrackId);
  const module = subTrack?.modules.find(m => m.id === moduleId);
  
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(
    currentUser.completedChallenges.filter(id => 
      module?.practicalChallenges?.some(c => c.id === id)
    )
  );

  if (!trail || !subTrack || !module || !module.isChallengeBased) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t.states.moduleNotFound}</p>
          <Link to="/trails">
            <Button variant="link">{t.states.backToTracks}</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const practicalChallenges = module.practicalChallenges || [];
  const optionalLearning = module.optionalLearning || [];
  
  const completedCount = completedChallenges.length;
  const totalChallenges = practicalChallenges.length;
  const progress = totalChallenges > 0 ? Math.round((completedCount / totalChallenges) * 100) : 0;

  const handleChallengeSubmit = (challengeId: string, file: File) => {
    console.log(`Submitted ${file.name} for challenge ${challengeId}`);
    setCompletedChallenges(prev => [...prev, challengeId]);
  };

  // All challenges are unlocked (including the final challenge)
  const isChallengeUnlocked = (_index: number): boolean => {
    return true;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <Link 
            to={`/trails/${trailId}/subtrack/${subTrackId}`} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.challenges.backToSubTrack} {getLocalizedText(subTrack.title, language)}
          </Link>
          
          <div className={cn(
            'rounded-2xl p-6 md:p-8 bg-gradient-to-br text-primary-foreground',
            trail.color
          )}>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
              <span>{getLocalizedText(trail.title, language)}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{getLocalizedText(subTrack.title, language)}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary-foreground font-medium">{getLocalizedText(module.title, language)}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{getLocalizedText(module.title, language)}</h1>
            <p className="text-primary-foreground/80 mb-6">{getLocalizedText(module.description, language)}</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{completedCount}/{totalChallenges} {t.dashboard.challenges.toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>{module.xpReward} XP</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t.dashboard.progress}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Support Content Section */}
        {optionalLearning.length > 0 && (
          <Card className="animate-fade-in border-dashed">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{t.challenges.supportContent}</h3>
                    <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{t.common.optional}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.challenges.watchVideos}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {optionalLearning.map((item) => {
                      const isCourse = item.type === 'course';
                      const hasUrl = !!item.url;
                      const ItemIcon = isCourse ? GraduationCap : Play;
                      
                      const buttonContent = (
                        <>
                          <ItemIcon className="w-3.5 h-3.5" />
                          {getLocalizedText(item.title, language)}
                          {isCourse && hasUrl && <ExternalLink className="w-3 h-3" />}
                          {!isCourse && <span className="text-xs text-muted-foreground">({item.duration}min)</span>}
                        </>
                      );

                      if (hasUrl) {
                        return (
                          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="gap-2"
                            >
                              {buttonContent}
                            </Button>
                          </a>
                        );
                      }

                      return (
                        <Button
                          key={item.id}
                          variant="secondary"
                          size="sm"
                          className="gap-2"
                        >
                          {buttonContent}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practical Challenges Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">{t.challenges.practicalChallenge}s</h2>
          </div>
          <p className="text-muted-foreground">
            {t.challenges.optionalMedals}
          </p>
          
          <div className="space-y-4">
            {practicalChallenges.map((challenge, index) => (
              <div key={challenge.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PracticalChallengeCard
                  challenge={challenge}
                  index={index + 1}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  isLocked={!isChallengeUnlocked(index)}
                  onSubmit={(file) => handleChallengeSubmit(challenge.id, file)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <Card className="animate-fade-in bg-gradient-to-br from-success/10 to-success/5 border-success/30">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">🎉 {t.challenges.moduleCompleted}</h3>
              <p className="text-muted-foreground mb-4">
                {t.challenges.congratulations} {t.challenges.allChallengesCompleted} {getLocalizedText(module.title, language)}.
              </p>
              <div className="flex items-center justify-center gap-2 text-xp-gold font-bold text-lg">
                <Zap className="w-5 h-5" />
                <span>+{module.xpReward} {t.challenges.xpEarned}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

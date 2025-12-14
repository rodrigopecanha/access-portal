import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChallengeCard } from '@/components/trails/ChallengeCard';
import { trails, currentUser, calculateTrailProgress } from '@/data/mockData';
import { ArrowLeft, Clock, Zap, CheckCircle2, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function TrailDetail() {
  const { trailId } = useParams();
  const trail = trails.find(t => t.id === trailId);
  const [openModules, setOpenModules] = useState<string[]>([]);
  
  if (!trail) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Trilha não encontrada</p>
          <Link to="/trails">
            <Button variant="link">Voltar às trilhas</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const progress = calculateTrailProgress(trail, currentUser);
  const isLocked = trail.prerequisites.some(p => !currentUser.completedTrails.includes(p));
  
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const isLessonCompleted = (lessonId: string) => currentUser.completedLessons.includes(lessonId);
  const isChallengeCompleted = (challengeId: string) => currentUser.completedChallenges.includes(challengeId);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <Link to="/trails" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar às trilhas
          </Link>
          
          <div className={cn(
            'rounded-2xl p-6 md:p-8 bg-gradient-to-br text-primary-foreground',
            trail.color
          )}>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{trail.title}</h1>
            <p className="text-primary-foreground/80 mb-6">{trail.description}</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{trail.estimatedHours} horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>{trail.xpReward} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{trail.modules.length} módulos</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
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

        {/* Modules */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Módulos</h2>
          
          {trail.modules.map((module, moduleIdx) => {
            const isOpen = openModules.includes(module.id);
            const moduleCompleted = module.lessons.every(l => isLessonCompleted(l.id));
            const moduleLocked = moduleIdx > 0 && !trail.modules.slice(0, moduleIdx).every(m => 
              m.lessons.every(l => isLessonCompleted(l.id))
            );
            
            return (
              <Card 
                key={module.id} 
                className={cn(
                  'animate-fade-in transition-all',
                  moduleLocked && 'opacity-60'
                )}
                style={{ animationDelay: `${moduleIdx * 0.1}s` }}
              >
                <Collapsible open={isOpen} onOpenChange={() => !moduleLocked && toggleModule(module.id)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className={cn(
                      'cursor-pointer hover:bg-muted/50 transition-colors',
                      moduleLocked && 'cursor-not-allowed'
                    )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center font-bold',
                            moduleCompleted 
                              ? 'bg-success text-success-foreground' 
                              : moduleLocked 
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-primary/10 text-primary'
                          )}>
                            {moduleCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : moduleLocked ? (
                              <Lock className="w-5 h-5" />
                            ) : (
                              moduleIdx + 1
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-base">{module.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-xp-gold">+{module.xpReward} XP</p>
                            <p className="text-xs text-muted-foreground">{module.lessons.length} lições</p>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-4">
                      {module.lessons.map((lesson, lessonIdx) => {
                        const lessonCompleted = isLessonCompleted(lesson.id);
                        const lessonLocked = lessonIdx > 0 && !module.lessons.slice(0, lessonIdx).every(l => isLessonCompleted(l.id));
                        
                        return (
                          <div key={lesson.id} className="space-y-3">
                            <div className={cn(
                              'flex items-center gap-3 p-3 rounded-lg',
                              lessonCompleted ? 'bg-success/10' : lessonLocked ? 'bg-muted/50' : 'bg-secondary'
                            )}>
                              <div className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium',
                                lessonCompleted 
                                  ? 'bg-success text-success-foreground' 
                                  : lessonLocked 
                                    ? 'bg-muted text-muted-foreground'
                                    : 'bg-primary text-primary-foreground'
                              )}>
                                {lessonCompleted ? <CheckCircle2 className="w-4 h-4" /> : lessonIdx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">{lesson.description}</p>
                              </div>
                              <span className="text-sm font-medium text-xp-gold">+{lesson.xpReward} XP</span>
                            </div>
                            
                            <div className="pl-11 space-y-2">
                              {lesson.challenges.map(challenge => (
                                <ChallengeCard 
                                  key={challenge.id}
                                  challenge={challenge}
                                  isCompleted={isChallengeCompleted(challenge.id)}
                                  isLocked={lessonLocked}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

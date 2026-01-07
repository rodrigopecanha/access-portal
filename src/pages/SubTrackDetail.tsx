import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { trails, currentUser, calculateSubTrackProgress, calculateModuleProgress, isLearningComplete, isAssessmentUnlocked, isBossChallengeUnlocked, isModuleComplete } from '@/data/mockData';
import { ArrowLeft, Clock, Zap, CheckCircle2, Lock, ChevronDown, ChevronRight, Play, FileText, Presentation, ClipboardCheck, Swords, Upload, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const contentTypeIcons = {
  video: Play,
  article: FileText,
  slides: Presentation,
};

export default function SubTrackDetail() {
  const { trailId, subTrackId } = useParams();
  const trail = trails.find(t => t.id === trailId);
  const subTrack = trail?.subTracks.find(st => st.id === subTrackId);
  const [openModules, setOpenModules] = useState<string[]>([]);
  
  if (!trail || !subTrack) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Sub-trilha não encontrada</p>
          <Link to="/trails">
            <Button variant="link">Voltar às trilhas</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const progress = calculateSubTrackProgress(subTrack, currentUser);
  
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const isContentCompleted = (contentId: string) => currentUser.completedChallenges.includes(contentId);
  const isAssessmentCompleted = (assessmentId: string) => currentUser.completedAssessments?.includes(assessmentId) || false;
  const isBossCompleted = (bossId: string) => currentUser.completedBossChallenges?.includes(bossId) || false;

  const totalDuration = subTrack.modules.reduce(
    (sum, mod) => sum + mod.learningContent.reduce((lSum, lc) => lSum + lc.duration, 0),
    0
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <Link 
            to={`/trails/${trailId}`} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para {trail.title}
          </Link>
          
          <div className={cn(
            'rounded-2xl p-6 md:p-8 bg-gradient-to-br text-primary-foreground',
            trail.color
          )}>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
              <span>{trail.title}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary-foreground font-medium">{subTrack.title}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{subTrack.title}</h1>
            <p className="text-primary-foreground/80 mb-6">{subTrack.description}</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>~{Math.round(totalDuration / 60)} horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>{subTrack.xpReward} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{subTrack.modules.length} módulos</span>
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
          
          {subTrack.modules.map((module, moduleIdx) => {
            const isOpen = openModules.includes(module.id);
            const moduleProgress = calculateModuleProgress(module, currentUser);
            const moduleCompleted = isModuleComplete(module, currentUser);
            const learningDone = isLearningComplete(module, currentUser);
            const assessmentUnlocked = isAssessmentUnlocked(module, currentUser);
            const bossUnlocked = isBossChallengeUnlocked(module, currentUser);
            const moduleLocked = moduleIdx > 0 && !isModuleComplete(subTrack.modules[moduleIdx - 1], currentUser);
            
            // Handle challenge-based modules differently
            if (module.isChallengeBased) {
              const completedChallenges = module.practicalChallenges?.filter(
                c => currentUser.completedChallenges.includes(c.id)
              ).length || 0;
              const totalChallenges = module.practicalChallenges?.length || 0;
              const challengeProgress = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;
              
              return (
                <Link 
                  key={module.id}
                  to={`/trails/${trailId}/subtrack/${subTrackId}/module/${module.id}`}
                  className="block"
                >
                  <Card 
                    className={cn(
                      'animate-fade-in transition-all overflow-hidden cursor-pointer hover:shadow-md hover:border-primary/30',
                      moduleLocked && 'opacity-60 pointer-events-none'
                    )}
                    style={{ animationDelay: `${moduleIdx * 0.1}s` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                          challengeProgress === 100 
                            ? 'bg-success text-success-foreground' 
                            : moduleLocked 
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                        )}>
                          {challengeProgress === 100 ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : moduleLocked ? (
                            <Lock className="w-6 h-6" />
                          ) : (
                            <Target className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              DESAFIOS PRÁTICOS
                            </span>
                          </div>
                          <CardTitle className="text-base mb-1">{module.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="text-muted-foreground">
                              {completedChallenges}/{totalChallenges} desafios
                            </span>
                            <div className="flex-1 max-w-32">
                              <Progress value={challengeProgress} className="h-2" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <p className="text-sm font-bold text-xp-gold">+{module.xpReward} XP</p>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            }
            
            // Regular modules with learning content, assessment, and boss challenge
            return (
              <Card 
                key={module.id} 
                className={cn(
                  'animate-fade-in transition-all overflow-hidden',
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
                            <p className="text-xs text-muted-foreground">
                              {module.learningContent.length} conteúdos
                            </p>
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
                    <CardContent className="pt-0 space-y-6">
                      {/* Section 1: Learning Content */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-xs">1</span>
                          </div>
                          <span>Conteúdo de Aprendizado</span>
                          <span className="text-muted-foreground font-normal">({moduleProgress.learning}%)</span>
                        </div>
                        
                        <div className="pl-8 space-y-2">
                          {module.learningContent.map((content) => {
                            const ContentIcon = contentTypeIcons[content.type];
                            const completed = isContentCompleted(content.id);
                            
                            return (
                              <div 
                                key={content.id}
                                className={cn(
                                  'flex items-center gap-3 p-3 rounded-lg transition-colors',
                                  completed ? 'bg-success/10' : 'bg-secondary hover:bg-secondary/80'
                                )}
                              >
                                <div className={cn(
                                  'w-8 h-8 rounded-lg flex items-center justify-center',
                                  completed ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'
                                )}>
                                  {completed ? <CheckCircle2 className="w-4 h-4" /> : <ContentIcon className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground text-sm">{content.title}</h4>
                                  <p className="text-xs text-muted-foreground">{content.description}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-medium text-xp-gold">+{content.xpReward} XP</span>
                                  <p className="text-xs text-muted-foreground">{content.duration} min</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Section 2: Assessment */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center',
                            assessmentUnlocked ? 'bg-accent/10' : 'bg-muted'
                          )}>
                            <span className={assessmentUnlocked ? 'text-accent text-xs' : 'text-muted-foreground text-xs'}>2</span>
                          </div>
                          <span>Avaliação Final</span>
                          {!assessmentUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                        </div>
                        
                        <div className="pl-8">
                          <div className={cn(
                            'p-4 rounded-lg border-2 border-dashed transition-all',
                            isAssessmentCompleted(module.assessment.id) 
                              ? 'border-success bg-success/5' 
                              : assessmentUnlocked 
                                ? 'border-accent/50 bg-accent/5 hover:border-accent'
                                : 'border-muted bg-muted/30 opacity-60'
                          )}>
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                'w-12 h-12 rounded-xl flex items-center justify-center',
                                isAssessmentCompleted(module.assessment.id)
                                  ? 'bg-success text-success-foreground'
                                  : assessmentUnlocked
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-muted text-muted-foreground'
                              )}>
                                {isAssessmentCompleted(module.assessment.id) ? (
                                  <CheckCircle2 className="w-6 h-6" />
                                ) : assessmentUnlocked ? (
                                  <ClipboardCheck className="w-6 h-6" />
                                ) : (
                                  <Lock className="w-6 h-6" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{module.assessment.title}</h4>
                                <p className="text-sm text-muted-foreground">{module.assessment.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {module.assessment.questions.length} questões • Mínimo: {module.assessment.passingScore}%
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-xp-gold">+{module.assessment.xpReward} XP</span>
                                {isAssessmentCompleted(module.assessment.id) && currentUser.assessmentScores?.[module.assessment.id] && (
                                  <p className="text-xs text-success">Score: {currentUser.assessmentScores[module.assessment.id]}%</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 3: Boss Challenge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center',
                            bossUnlocked ? 'bg-destructive/10' : 'bg-muted'
                          )}>
                            <span className={bossUnlocked ? 'text-destructive text-xs' : 'text-muted-foreground text-xs'}>3</span>
                          </div>
                          <span>Boss Challenge</span>
                          <Swords className={cn('w-4 h-4', bossUnlocked ? 'text-destructive' : 'text-muted-foreground')} />
                          {!bossUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                        </div>
                        
                        <div className="pl-8">
                          <div className={cn(
                            'p-4 rounded-lg border-2 transition-all',
                            isBossCompleted(module.bossChallenge.id)
                              ? 'border-success bg-success/5'
                              : bossUnlocked
                                ? 'border-destructive/50 bg-gradient-to-br from-destructive/5 to-destructive/10 hover:border-destructive'
                                : 'border-muted bg-muted/30 opacity-60'
                          )}>
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                'w-14 h-14 rounded-xl flex items-center justify-center shrink-0',
                                isBossCompleted(module.bossChallenge.id)
                                  ? 'bg-success text-success-foreground'
                                  : bossUnlocked
                                    ? 'bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground shadow-lg'
                                    : 'bg-muted text-muted-foreground'
                              )}>
                                {isBossCompleted(module.bossChallenge.id) ? (
                                  <CheckCircle2 className="w-7 h-7" />
                                ) : bossUnlocked ? (
                                  <Swords className="w-7 h-7" />
                                ) : (
                                  <Lock className="w-7 h-7" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground text-lg">{module.bossChallenge.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3">{module.bossChallenge.description}</p>
                                
                                {bossUnlocked && !isBossCompleted(module.bossChallenge.id) && (
                                  <div className="space-y-3">
                                    <div className="p-3 bg-background/80 rounded-lg text-sm">
                                      <h5 className="font-medium text-foreground mb-2">Instruções:</h5>
                                      <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                                        {module.bossChallenge.instructions}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Upload className="w-4 h-4" />
                                      <span>Formatos aceitos: {module.bossChallenge.acceptedFormats.map(f => f.toUpperCase()).join(', ')}</span>
                                    </div>
                                    
                                    <Button className="w-full" variant="destructive">
                                      <Upload className="w-4 h-4 mr-2" />
                                      Enviar Submissão
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-sm font-bold text-xp-gold">+{module.bossChallenge.xpReward} XP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

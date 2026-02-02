import { cn } from '@/lib/utils';
import { PracticalChallenge, getLocalizedText, SupportedLocale } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle2, Lock, Upload, Trophy, Swords, ChevronDown, ChevronUp, Sparkles, Award, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { InstructionSection } from './InstructionSection';
import { useTranslation } from '@/i18n';
import { useLanguage } from '@/i18n/LanguageContext';

interface PracticalChallengeCardProps {
  challenge: PracticalChallenge;
  index: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onSubmit?: (file: File) => void;
  className?: string;
}

function AnimatedXP({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">{displayValue}</span>
  );
}

export function PracticalChallengeCard({
  challenge,
  index,
  isCompleted = false,
  isLocked = false,
  onSubmit,
  className
}: PracticalChallengeCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const locale = language as SupportedLocale;
  const [isExpanded, setIsExpanded] = useState(!isLocked && !isCompleted);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isCompleted);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [earnedMedals, setEarnedMedals] = useState<typeof challenge.medals>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (challenge.acceptedFormats.includes(ext || '')) {
        setSelectedFile(file);
      } else {
        alert(`${t.challenges.invalidFormat}: ${challenge.acceptedFormats.join(', ').toUpperCase()}`);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile && onSubmit) {
      setIsSubmitting(true);
      // Simulate validation with loading state
      setTimeout(() => {
        // Simulate earning all medals (mock success)
        const allMedals = challenge.medals.map(m => ({ ...m, isEarned: true }));
        setEarnedMedals(allMedals);
        setIsSubmitting(false);
        setShowSuccessModal(true);
      }, 1800);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setIsSubmitted(true);
    if (selectedFile && onSubmit) {
      onSubmit(selectedFile);
    }
  };

  const isFinal = challenge.isFinalChallenge;

  return (
    <>
      <Card 
        className={cn(
          'overflow-hidden transition-all duration-300',
          isLocked && 'opacity-60',
          isSubmitted && 'border-success/40 bg-success/5',
          isFinal && !isLocked && !isSubmitted && 'border-2 border-destructive/40 bg-gradient-to-br from-destructive/5 to-destructive/10',
          !isFinal && !isLocked && !isSubmitted && 'hover:shadow-md hover:border-primary/30',
          className
        )}
      >
        <Collapsible open={isExpanded} onOpenChange={() => !isLocked && setIsExpanded(!isExpanded)}>
          <CollapsibleTrigger asChild>
            <CardContent className={cn(
              'p-4 cursor-pointer transition-colors',
              isLocked && 'cursor-not-allowed'
            )}>
              <div className="flex items-start gap-4">
                {/* Challenge Number / Status Icon */}
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg',
                  isSubmitted 
                    ? 'bg-success text-success-foreground'
                    : isLocked 
                      ? 'bg-muted text-muted-foreground'
                      : isFinal
                        ? 'bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground shadow-lg'
                        : 'bg-primary text-primary-foreground'
                )}>
                  {isSubmitted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6" />
                  ) : isFinal ? (
                    <Swords className="w-6 h-6" />
                  ) : (
                    index
                  )}
                </div>

                {/* Challenge Info */}
                <div className="flex-1 min-w-0">
                  {isFinal && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive mb-1 uppercase tracking-wide">
                      <Trophy className="w-3.5 h-3.5" />
                      {t.challenges.finalChallenge}
                    </span>
                  )}
                  <h3 className={cn(
                    'font-semibold text-foreground leading-tight',
                    isFinal ? 'text-lg' : 'text-base'
                  )}>
                    {getLocalizedText(challenge.title, locale)}
                  </h3>
                  {challenge.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{getLocalizedText(challenge.description, locale)}</p>
                  )}
                  
                  {/* Medals Preview */}
                  {challenge.medals.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {challenge.medals.map((medal) => (
                        <span
                          key={medal.id}
                          className={cn(
                            'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full',
                            isSubmitted || medal.isEarned 
                              ? 'bg-xp-gold/20 text-xp-gold'
                              : 'bg-secondary text-muted-foreground'
                          )}
                        >
                          <span>{medal.icon}</span>
                          <span>{getLocalizedText(medal.name, locale)}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* XP & Expand */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-xp-gold font-semibold">
                    <Zap className="w-4 h-4" />
                    <span>+{challenge.xpReward}</span>
                  </div>
                  {!isLocked && (
                    isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-border pt-4" />
              
              {/* Instructions */}
              {challenge.instructions && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <BookOpen className="w-5 h-5" />
                    <h4 className="font-semibold text-base">{t.challenges.instructions}</h4>
                  </div>
                  <InstructionSection instructions={getLocalizedText(challenge.instructions, locale)} />
                </div>
              )}

              {/* Upload Section */}
              {!isSubmitted && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="w-4 h-4" />
                    <span>{t.challenges.acceptedFormats}: {challenge.acceptedFormats.map(f => f.toUpperCase()).join(', ')}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept={challenge.acceptedFormats.map(f => `.${f}`).join(',')}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className={cn(
                        'flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors',
                        selectedFile 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-muted hover:border-primary/50'
                      )}>
                        <Upload className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {selectedFile ? selectedFile.name : t.challenges.selectFile}
                        </span>
                      </div>
                    </label>
                    
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedFile || isSubmitting}
                      className={cn(
                        'min-w-[140px]',
                        isFinal && 'bg-destructive hover:bg-destructive/90'
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t.common.validating}
                        </span>
                      ) : (
                        t.challenges.submitSolution
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Submitted State */}
              {isSubmitted && (
                <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-medium text-success">{t.challenges.challengeCompleted}</p>
                    <p className="text-sm text-muted-foreground">{t.challenges.solutionSubmittedSuccess}</p>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={handleCloseSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-xp-gold" />
              <span>{t.challenges.templateValidated}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Success Message */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <p className="text-lg font-medium text-foreground">
                🎉 {t.challenges.solutionSubmittedSuccess}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isFinal ? t.challenges.completedFinalChallenge : t.challenges.continueNextChallenge}
              </p>
            </div>

            {/* XP Earned */}
            <div className="bg-gradient-to-br from-xp-gold/10 to-xp-gold/5 rounded-xl p-5 border border-xp-gold/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-xp-gold mb-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-sm font-medium uppercase tracking-wider">{t.challenges.xpGained}</span>
                </div>
                <div className="text-4xl font-bold text-xp-gold">
                  +<AnimatedXP value={challenge.xpReward} />
                </div>
              </div>
            </div>

            {/* Medals Earned */}
            {earnedMedals.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">{t.challenges.medalsEarned}</span>
                </div>
                <div className="grid gap-2">
                  {earnedMedals.map((medal, idx) => (
                    <div 
                      key={medal.id}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-xp-gold/20 flex items-center justify-center text-xl">
                        {medal.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{getLocalizedText(medal.name, locale)}</p>
                        <p className="text-xs text-muted-foreground">{medal.description ? getLocalizedText(medal.description, locale) : ''}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Button */}
            <Button 
              onClick={handleCloseSuccess}
              className="w-full"
              size="lg"
            >
              {t.common.continue}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

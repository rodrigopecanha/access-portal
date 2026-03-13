import { cn } from '@/lib/utils';
import { PracticalChallenge, getLocalizedText, SupportedLocale } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle2, Lock, Upload, Trophy, Swords, ChevronDown, ChevronUp, Sparkles, Award, BookOpen, XCircle, AlertTriangle } from 'lucide-react';
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
import { validatePracEsig1, validateTemplateChallenges, validateWebformTemplateChallenge, type ValidationResult } from '@/lib/challengeValidation';

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
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

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

  const handleSubmit = async () => {
    if (selectedFile && onSubmit) {
      setIsSubmitting(true);

      // For prac-esig-1, run real JSON validation
      if (challenge.id === 'prac-esig-1') {
        try {
          const text = await selectedFile.text();
          const json = JSON.parse(text);
          const result = validatePracEsig1(json);
          setValidationResult(result);

          const allMedals = challenge.medals.map(m => ({ ...m, isEarned: result.isFullyValidated }));
          setEarnedMedals(allMedals);
          setIsSubmitting(false);
          setShowSuccessModal(true);
        } catch {
          // Invalid JSON — all requirements fail
          const result: ValidationResult = {
            challengeId: 'prac-esig-1',
            sections: [
              { title: 'Delivery Configuration', requirements: [
                { label: 'Multi-channel delivery (SMS, WhatsApp, or deliveryMethod)', passed: false },
                { label: 'Reminders enabled', passed: false },
              ]},
              { title: 'Security', requirements: [
                { label: 'At least 2 authentication layers (0/2 detected)', passed: false },
              ]},
              { title: 'Interactive Fields', requirements: [
                { label: 'Text tabs present', passed: false },
                { label: 'Checkbox or radio group tabs present', passed: false },
                { label: 'Required fields configured', passed: false },
              ]},
            ],
            totalPassed: 0,
            totalRequirements: 6,
            isFullyValidated: false,
          };
          setValidationResult(result);
          setEarnedMedals([]);
          setIsSubmitting(false);
          setShowSuccessModal(true);
        }
      } else {
        // Default mock behavior for all other challenges
        setTimeout(() => {
          const allMedals = challenge.medals.map(m => ({ ...m, isEarned: true }));
          setEarnedMedals(allMedals);
          setValidationResult(null);
          setIsSubmitting(false);
          setShowSuccessModal(true);
        }, 1800);
      }
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // Only mark as completed if no validation or fully validated
    const shouldComplete = !validationResult || validationResult.isFullyValidated;
    if (shouldComplete) {
      setIsSubmitted(true);
      if (selectedFile && onSubmit) {
        onSubmit(selectedFile);
      }
    }
    setSelectedFile(null);
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
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              {validationResult ? (
                validationResult.isFullyValidated ? (
                  <>
                    <Sparkles className="w-6 h-6 text-xp-gold" />
                    <span>Challenge Completed</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 text-warning" />
                    <span>Partially Completed</span>
                  </>
                )
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-xp-gold" />
                  <span>{t.challenges.templateValidated}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            {/* Validation Results for prac-esig-1 */}
            {validationResult && (
              <div className="space-y-4">
                {/* Status Banner */}
                <div className={cn(
                  'p-4 rounded-lg text-center',
                  validationResult.isFullyValidated
                    ? 'bg-success/10 border border-success/20'
                    : 'bg-warning/10 border border-warning/20'
                )}>
                  {validationResult.isFullyValidated ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="font-semibold text-success">All requirements validated!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="font-semibold text-warning">
                          {validationResult.totalPassed}/{validationResult.totalRequirements} requirements passed
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Review the results below and resubmit with the missing elements.</p>
                    </div>
                  )}
                </div>

                {/* Sections */}
                {validationResult.sections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
                    <div className="space-y-1.5">
                      {section.requirements.map((req) => (
                        <div
                          key={req.label}
                          className={cn(
                            'flex items-start gap-2.5 px-3 py-2 rounded-md text-sm',
                            req.passed ? 'bg-success/5' : 'bg-destructive/5'
                          )}
                        >
                          {req.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          )}
                          <span className={req.passed ? 'text-foreground' : 'text-muted-foreground'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Default success (non-validated challenges) */}
            {!validationResult && (
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
            )}

            {/* XP Earned */}
            <div className="bg-gradient-to-br from-xp-gold/10 to-xp-gold/5 rounded-xl p-5 border border-xp-gold/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-xp-gold mb-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-sm font-medium uppercase tracking-wider">{t.challenges.xpGained}</span>
                </div>
                <div className="text-4xl font-bold text-xp-gold">
                  {validationResult && !validationResult.isFullyValidated ? (
                    <span className="text-2xl text-muted-foreground">—</span>
                  ) : (
                    <>+<AnimatedXP value={challenge.xpReward} /></>
                  )}
                </div>
                {validationResult && !validationResult.isFullyValidated && (
                  <p className="text-xs text-muted-foreground mt-1">XP awarded upon full completion</p>
                )}
              </div>
            </div>

            {/* Medals Earned — only show when fully validated or non-validated */}
            {earnedMedals.length > 0 && (!validationResult || validationResult.isFullyValidated) && (
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

            {/* Continue / Retry Button */}
            <Button 
              onClick={handleCloseSuccess}
              className="w-full"
              size="lg"
            >
              {validationResult && !validationResult.isFullyValidated ? 'Close & Retry' : t.common.continue}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { cn } from '@/lib/utils';
import { Challenge } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/card';
import { Play, HelpCircle, FileText, Wrench, Zap, Clock, Check, Box } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChallengeCard({
  challenge,
  isCompleted = false,
  isLocked = false,
  onClick,
  className
}: ChallengeCardProps) {
  const { t } = useTranslation();
  
  const challengeIcons = {
    video: Play,
    quiz: HelpCircle,
    'case-study': FileText,
    practical: Wrench
  };
  
  const challengeLabels: Record<string, string> = {
    video: t.challenges.challenge,
    quiz: t.challenges.quiz,
    'case-study': t.challenges.caseStudy,
    practical: t.challenges.practicalChallenge
  };

  const IconComponent = challengeIcons[challenge.type];
  
  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300',
        isLocked && 'opacity-50 cursor-not-allowed',
        isCompleted && 'border-success/30 bg-success/5',
        !isLocked && !isCompleted && 'hover:shadow-md hover:border-primary/30',
        className
      )} 
      onClick={!isLocked ? onClick : undefined}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
          isCompleted ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'
        )}>
          {isCompleted ? <Check className="w-6 h-6" /> : <Box className="w-6 h-6" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {challengeLabels[challenge.type]}
            </span>
          </div>
          <h4 className="font-medium text-foreground truncate">{challenge.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{challenge.description}</p>
        </div>
        
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-1 text-xp-gold font-medium text-sm">
            <Zap className="w-4 h-4" />
            <span>+{challenge.xpReward}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{challenge.duration}{t.common.minutes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

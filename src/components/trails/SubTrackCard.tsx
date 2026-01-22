import { SubTrack } from '@/types/learning';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Compass, Wand2, FileCheck, Building2, PenTool, GitBranch, 
  Sparkles, Settings, Shield, ChevronRight, CheckCircle2, Clock 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Wand2,
  FileCheck,
  Building2,
  PenTool,
  GitBranch,
  Sparkles,
  Settings,
  Shield,
};

interface SubTrackCardProps {
  subTrack: SubTrack;
  progress?: number;
  isLocked?: boolean;
  onClick?: () => void;
  trailColor?: string;
  className?: string;
}

export function SubTrackCard({ 
  subTrack, 
  progress = 0, 
  isLocked = false, 
  onClick,
  trailColor = 'from-primary to-primary',
  className 
}: SubTrackCardProps) {
  const IconComponent = iconMap[subTrack.icon] || Compass;
  const isCompleted = progress === 100;
  const isComingSoon = subTrack.status === 'coming-soon';
  const isDisabled = isLocked || isComingSoon;
  
  const totalModules = subTrack.modules.length;
  const totalLearningItems = subTrack.modules.reduce((sum, m) => sum + (m.learningContent?.length || 0), 0);

  return (
    <Card 
      onClick={!isDisabled ? onClick : undefined}
      className={cn(
        'transition-all duration-300 group',
        !isDisabled && 'cursor-pointer hover:shadow-lg hover:scale-[1.02]',
        isDisabled && 'opacity-60 cursor-not-allowed',
        isCompleted && 'border-success/50 bg-success/5',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            isCompleted 
              ? 'bg-success text-success-foreground' 
              : isComingSoon
              ? 'bg-muted text-muted-foreground'
              : `bg-gradient-to-br ${trailColor} text-primary-foreground`
          )}>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : isComingSoon ? (
              <Clock className="w-6 h-6" />
            ) : (
              <IconComponent className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className={cn(
                "text-base font-semibold transition-colors",
                isComingSoon ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'
              )}>
                {subTrack.title}
              </CardTitle>
              {isComingSoon && (
                <Badge variant="secondary" className="text-xs font-normal">
                  Em breve
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{subTrack.description}</p>
          </div>
          {!isComingSoon && (
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {totalModules} módulos · {totalLearningItems} conteúdos
          </span>
          <span className={cn(
            "font-medium",
            isComingSoon ? 'text-muted-foreground' : 'text-xp-gold'
          )}>
            +{subTrack.xpReward} XP
          </span>
        </div>
        
        {!isComingSoon && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progresso</span>
              <span className={cn(
                'font-medium',
                isCompleted ? 'text-success' : 'text-foreground'
              )}>{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className={cn(
                'h-2',
                isCompleted && '[&>div]:bg-success'
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

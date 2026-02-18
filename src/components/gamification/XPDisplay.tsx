import { cn } from '@/lib/utils';
import { getLevelFromXp, getXpProgress } from '@/types/learning';
import { getLocalizedText } from '@/types/learning';
import { Zap } from 'lucide-react';
import { useLanguage, useTranslation } from '@/i18n';

interface XPDisplayProps {
  xp: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function XPDisplay({ xp, showProgress = false, size = 'md', className }: XPDisplayProps) {
  const level = getLevelFromXp(xp);
  const progress = getXpProgress(xp);
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const isMaxLevel = level.name === 'Imperator';
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-gold text-foreground font-semibold',
        sizeClasses[size]
      )}>
        <Zap className="w-4 h-4" />
        <span>{xp.toLocaleString()} XP</span>
      </div>
      
      {showProgress && (
        <div className="flex flex-col gap-1 min-w-[100px]">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {isMaxLevel 
              ? t.gamification.maxLevelReached
              : `${progress.current} / ${progress.max} ${t.gamification.progressToNext}`
            }
          </span>
        </div>
      )}
    </div>
  );
}

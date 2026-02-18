import { cn } from '@/lib/utils';
import { getLevelFromXp, LEVELS, UserLevel, getLocalizedText } from '@/types/learning';
import { useLanguage, useTranslation } from '@/i18n';

interface LevelBadgeProps {
  level?: UserLevel;
  xp?: number;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const levelColors: Record<string, string> = {
  bronze: 'bg-level-bronze',
  iron: 'bg-level-iron',
  silver: 'bg-level-silver',
  gold: 'bg-level-gold',
  ruby: 'bg-level-ruby',
  emerald: 'bg-level-emerald',
  platinum: 'bg-level-platinum',
  diamond: 'bg-level-diamond',
};

const levelBorderColors: Record<string, string> = {
  bronze: 'ring-level-bronze/30',
  iron: 'ring-level-iron/30',
  silver: 'ring-level-silver/30',
  gold: 'ring-level-gold/30',
  ruby: 'ring-level-ruby/30',
  emerald: 'ring-level-emerald/30',
  platinum: 'ring-level-platinum/30',
  diamond: 'ring-level-diamond/30',
};

export function LevelBadge({ level, xp, size = 'md', showName = true, className }: LevelBadgeProps) {
  const levelConfig = xp !== undefined ? getLevelFromXp(xp) : LEVELS.find(l => l.name === level) || LEVELS[0];
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'rounded-full flex items-center justify-center ring-4',
        sizeClasses[size],
        levelColors[levelConfig.color],
        levelBorderColors[levelConfig.color]
      )}>
        <span>{levelConfig.icon}</span>
      </div>
      
      {showName && (
        <div className="flex flex-col">
          <span className={cn('font-bold text-foreground', textSizeClasses[size])}>
            {getLocalizedText(levelConfig.localizedName, language)}
          </span>
          <span className="text-xs text-muted-foreground">
            {t.gamification.levelLabel} {LEVELS.findIndex(l => l.name === levelConfig.name) + 1}
          </span>
        </div>
      )}
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Badge as BadgeType } from '@/types/learning';
import { Lock, Workflow } from 'lucide-react';

const lucideIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  workflow: Workflow,
};

interface BadgeCardProps {
  badge: BadgeType;
  isUnlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BadgeCard({ badge, isUnlocked = false, size = 'md', className }: BadgeCardProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const LucideIcon = lucideIconMap[badge.icon];
  
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn(
        'rounded-2xl flex items-center justify-center relative transition-all duration-300',
        sizeClasses[size],
        isUnlocked 
          ? 'bg-gradient-primary shadow-glow' 
          : 'bg-muted'
      )}>
        {isUnlocked ? (
          LucideIcon ? (
            <LucideIcon className={cn(iconSizeClasses[size], 'text-primary-foreground animate-float')} />
          ) : (
            <span className="animate-float">{badge.icon}</span>
          )
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      
      <div className="text-center">
        <p className={cn(
          'text-xs font-medium',
          isUnlocked ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {badge.name}
        </p>
        {isUnlocked && (
          <p className="text-xs text-xp-gold font-medium">+{badge.xpReward} XP</p>
        )}
      </div>
    </div>
  );
}

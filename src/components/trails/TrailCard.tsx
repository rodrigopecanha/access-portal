import { cn } from '@/lib/utils';
import { Trail, getLocalizedText } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Lock, ChevronRight, Zap, Building2, Layers, Briefcase, Presentation, Network, MessageCircle, BookOpen, Shield, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, useLanguage } from '@/i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Layers, Briefcase, Presentation, Network, MessageCircle, BookOpen, Shield, PenTool
};

interface TrailCardProps {
  trail: Trail;
  progress?: number;
  isLocked?: boolean;
  className?: string;
}

export function TrailCard({ trail, progress = 0, isLocked = false, className }: TrailCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const IconComponent = iconMap[trail.icon] || BookOpen;
  
  const content = (
    <Card className={cn(
      'group relative overflow-hidden transition-all duration-300 hover:shadow-lg',
      isLocked ? 'opacity-60' : 'hover:-translate-y-1',
      className
    )}>
      {/* Gradient header */}
      <div className={cn(
        'h-24 flex items-center justify-center relative bg-gradient-to-br',
        trail.color
      )}>
        <IconComponent className="w-12 h-12 text-primary-foreground/90" />
        {isLocked && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground">{getLocalizedText(trail.title, language)}</h3>
          {!isLocked && (
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {getLocalizedText(trail.description, language)}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{trail.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-xp-gold" />
            <span className="text-xp-gold font-medium">{trail.xpReward} XP</span>
          </div>
        </div>
        
        {!isLocked && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{t.dashboard.progress}</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {isLocked && trail.prerequisites.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {t.tracks.completePrerequisites}
          </p>
        )}
      </CardContent>
    </Card>
  );
  
  if (isLocked) {
    return content;
  }
  
  return (
    <Link to={`/trails/${trail.id}`}>
      {content}
    </Link>
  );
}

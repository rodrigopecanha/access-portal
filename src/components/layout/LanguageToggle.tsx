import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();
  
  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={cn('text-xs font-medium', className)}
      >
        {language === 'pt-BR' ? '🇧🇷 PT' : '🇺🇸 EN'}
      </Button>
    );
  }
  
  return (
    <div className={cn('flex items-center gap-1 bg-secondary rounded-lg p-1', className)}>
      <button
        onClick={() => language !== 'pt-BR' && toggleLanguage()}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors',
          language === 'pt-BR'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <span className="text-base">🇧🇷</span>
        <span>PT</span>
      </button>
      <button
        onClick={() => language !== 'en-US' && toggleLanguage()}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors',
          language === 'en-US'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <span className="text-base">🇺🇸</span>
        <span>EN</span>
      </button>
    </div>
  );
}

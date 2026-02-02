import { useLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <button
          onClick={() => setLanguage('pt-BR')}
          className={cn(
            'text-xl transition-all duration-200 rounded-md p-1',
            language === 'pt-BR'
              ? 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-110'
              : 'opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
          )}
          aria-label="Português (Brasil)"
          title="Português (Brasil)"
        >
          🇧🇷
        </button>
        <button
          onClick={() => setLanguage('en-US')}
          className={cn(
            'text-xl transition-all duration-200 rounded-md p-1',
            language === 'en-US'
              ? 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-110'
              : 'opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
          )}
          aria-label="English (US)"
          title="English (US)"
        >
          🇺🇸
        </button>
      </div>
    );
  }
  
  return (
    <div className={cn('flex items-center gap-2 bg-secondary/50 rounded-xl p-1.5', className)}>
      <button
        onClick={() => setLanguage('pt-BR')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          language === 'pt-BR'
            ? 'bg-background text-foreground shadow-md ring-1 ring-primary/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
        )}
        aria-label="Português (Brasil)"
        title="Português (Brasil)"
      >
        <span className={cn(
          'text-lg transition-all duration-200',
          language === 'pt-BR' ? 'scale-110' : 'opacity-60 grayscale'
        )}>🇧🇷</span>
        <span>PT</span>
      </button>
      <button
        onClick={() => setLanguage('en-US')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          language === 'en-US'
            ? 'bg-background text-foreground shadow-md ring-1 ring-primary/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
        )}
        aria-label="English (US)"
        title="English (US)"
      >
        <span className={cn(
          'text-lg transition-all duration-200',
          language === 'en-US' ? 'scale-110' : 'opacity-60 grayscale'
        )}>🇺🇸</span>
        <span>EN</span>
      </button>
    </div>
  );
}

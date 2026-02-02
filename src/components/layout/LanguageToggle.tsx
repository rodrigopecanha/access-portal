import { useLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-border">
      <button
        onClick={() => setLanguage('pt-BR')}
        className={cn(
          'text-2xl transition-all duration-200 rounded-full p-1.5',
          language === 'pt-BR'
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110 bg-primary/10'
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
          'text-2xl transition-all duration-200 rounded-full p-1.5',
          language === 'en-US'
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110 bg-primary/10'
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

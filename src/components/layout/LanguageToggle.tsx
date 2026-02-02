import { useLanguage } from '@/i18n';
import { cn } from '@/lib/utils';
import brazilFlag from '@/assets/flags/brazil.png';
import usaFlag from '@/assets/flags/usa.png';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-border">
      <button
        onClick={() => setLanguage('pt-BR')}
        className={cn(
          'transition-all duration-200 rounded-full p-1 overflow-hidden',
          language === 'pt-BR'
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110'
            : 'opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
        )}
        aria-label="Português (Brasil)"
        title="Português (Brasil)"
      >
        <img 
          src={brazilFlag} 
          alt="Bandeira do Brasil" 
          className="w-8 h-6 object-cover rounded-sm"
        />
      </button>
      <button
        onClick={() => setLanguage('en-US')}
        className={cn(
          'transition-all duration-200 rounded-full p-1 overflow-hidden',
          language === 'en-US'
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110'
            : 'opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
        )}
        aria-label="English (US)"
        title="English (US)"
      >
        <img 
          src={usaFlag} 
          alt="US Flag" 
          className="w-8 h-6 object-cover rounded-sm"
        />
      </button>
    </div>
  );
}

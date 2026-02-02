import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, TranslationDictionary } from './types';
import { ptBR } from './locales/pt-BR';
import { enUS } from './locales/en-US';

const dictionaries: Record<Language, TranslationDictionary> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get value with fallback to pt-BR
function getNestedValue<T>(obj: T, fallback: T, path: string[]): unknown {
  let current: unknown = obj;
  let fallbackCurrent: unknown = fallback;
  
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      current = undefined;
    }
    
    if (fallbackCurrent && typeof fallbackCurrent === 'object' && key in fallbackCurrent) {
      fallbackCurrent = (fallbackCurrent as Record<string, unknown>)[key];
    }
  }
  
  return current !== undefined ? current : fallbackCurrent;
}

// Create a proxy that falls back to pt-BR
function createFallbackProxy(target: TranslationDictionary, fallback: TranslationDictionary): TranslationDictionary {
  const handler: ProxyHandler<TranslationDictionary> = {
    get(obj, prop: string) {
      const value = obj[prop as keyof TranslationDictionary];
      const fallbackValue = fallback[prop as keyof TranslationDictionary];
      
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, {
          get(nestedObj, nestedProp: string) {
            const nestedValue = nestedObj[nestedProp as keyof typeof nestedObj];
            if (nestedValue !== undefined) {
              return nestedValue;
            }
            // Fallback to pt-BR
            if (typeof fallbackValue === 'object' && fallbackValue !== null) {
              return fallbackValue[nestedProp as keyof typeof fallbackValue];
            }
            return nestedProp;
          }
        });
      }
      
      return value !== undefined ? value : fallbackValue;
    }
  };
  
  return new Proxy(target, handler);
}

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'pt-BR' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('app-language') as Language;
      if (stored && (stored === 'pt-BR' || stored === 'en-US')) {
        return stored;
      }
    }
    return defaultLanguage;
  });
  
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', lang);
    }
  }, []);
  
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR');
  }, [language, setLanguage]);
  
  // Get dictionary with fallback support
  const dictionary = dictionaries[language];
  const fallbackDictionary = dictionaries['pt-BR'];
  
  const t = language === 'pt-BR' 
    ? dictionary 
    : createFallbackProxy(dictionary, fallbackDictionary);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Convenience hook for just translations
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}

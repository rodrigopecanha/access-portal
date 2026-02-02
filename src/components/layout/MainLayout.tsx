import { MainNav } from './MainNav';
import { LanguageToggle } from './LanguageToggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex w-full">
      <MainNav />
      <LanguageToggle />
      <main className="flex-1 md:pt-0 pt-14">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Map, 
  User, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from '@/i18n';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trails', icon: Map, label: 'Trilhas' },
  { to: '/profile', icon: User, label: 'Perfil' },
];

const adminItems = [
  { to: '/admin', icon: Users, label: 'Gestão' },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const isAdmin = currentUser.role === 'manager' || currentUser.role === 'admin';
  
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t.nav.dashboard },
    { to: '/trails', icon: Map, label: t.nav.tracks },
    { to: '/profile', icon: User, label: t.nav.profile },
  ];

  const adminItems = [
    { to: '/admin', icon: Users, label: t.nav.management },
  ];
  
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;
  
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gradient-primary">SC Academy</h1>
          <p className="text-xs text-muted-foreground">{t.nav.learningPath}</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          {allItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="pt-4 border-t border-border">
          <LevelBadge xp={currentUser.xp} size="sm" />
        </div>
      </aside>
      
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-50 px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient-primary">SC Academy</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>
      
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-card z-40 p-4">
          <nav className="space-y-1">
            {allItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

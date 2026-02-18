import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface MockAuthContextType {
  isAuthenticated: boolean;
  justLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  clearJustLoggedIn: () => void;
}

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setJustLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setJustLoggedIn(false);
  }, []);

  const clearJustLoggedIn = useCallback(() => setJustLoggedIn(false), []);

  return (
    <MockAuthContext.Provider value={{ isAuthenticated, justLoggedIn, login, logout, clearJustLoggedIn }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (!context) throw new Error('useMockAuth must be used within MockAuthProvider');
  return context;
}

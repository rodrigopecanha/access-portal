import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface MockAuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(() => setIsAuthenticated(true), []);
  const logout = useCallback(() => setIsAuthenticated(false), []);

  return (
    <MockAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (!context) throw new Error('useMockAuth must be used within MockAuthProvider');
  return context;
}

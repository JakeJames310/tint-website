'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthContextType {
  user: Session['user'] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasSkippedAuth: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  skipAuth: () => void;
  clearSkipAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [hasSkippedAuth, setHasSkippedAuth] = useState(false);

  // Load skip auth state from localStorage on mount
  useEffect(() => {
    const skipState = localStorage.getItem('skipAuth');
    if (skipState === 'true') {
      setHasSkippedAuth(true);
    }
  }, []);

  const signIn = async () => {
    try {
      await nextAuthSignIn('google', { 
        callbackUrl: window.location.pathname 
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const signOut = async () => {
    try {
      await nextAuthSignOut({ 
        callbackUrl: '/' 
      });
      clearSkipAuth();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const skipAuth = () => {
    setHasSkippedAuth(true);
    localStorage.setItem('skipAuth', 'true');
  };

  const clearSkipAuth = () => {
    setHasSkippedAuth(false);
    localStorage.removeItem('skipAuth');
  };

  const value: AuthContextType = {
    user: session?.user || null,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    hasSkippedAuth,
    signIn,
    signOut,
    skipAuth,
    clearSkipAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
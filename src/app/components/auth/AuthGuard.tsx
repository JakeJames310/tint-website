'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import LoginModal from './LoginModal';
import { useState } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  message?: string;
}

export default function AuthGuard({ 
  children, 
  fallback, 
  requireAuth = true,
  message = 'Please sign in to access this feature'
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, hasSkippedAuth } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated && !hasSkippedAuth) {
      setShowLoginModal(true);
    }
  }, [isLoading, requireAuth, isAuthenticated, hasSkippedAuth]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-innovation" size={32} />
      </div>
    );
  }

  // If auth is required and user is not authenticated or hasn't skipped
  if (requireAuth && !isAuthenticated && !hasSkippedAuth) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          message={message}
        />
        {fallback || (
          <div className="flex items-center justify-center min-h-[200px]">
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-innovation hover:text-innovation/80 transition-colors"
            >
              Sign in to continue
            </button>
          </div>
        )}
      </>
    );
  }

  // User is authenticated or has skipped auth
  return <>{children}</>;
}
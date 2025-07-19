'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error to monitoring service (replace with your service)
    if (this.props.onError) {
      this.props.onError(error, info);
    } else {
      // Example: send to Sentry, LogRocket, etc.
      if (typeof window !== 'undefined') {
        console.error('ErrorBoundary caught an error:', error, info);
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <p className="text-zinc-400 mb-6">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button 
              onClick={this.handleRetry}
              className="bg-innovation text-black font-bold px-6 py-3 rounded-lg hover:bg-innovation/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

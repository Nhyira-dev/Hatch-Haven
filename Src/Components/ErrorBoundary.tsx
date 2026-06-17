import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled error in app:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-hh-bg px-4 py-12">
          <div className="max-w-md w-full bg-white shadow-lg rounded-3xl border border-orange-50 p-8 text-center">
            <h1 className="text-2xl font-extrabold text-hh-text mb-4">Oops, something went wrong.</h1>
            <p className="text-sm text-gray-500 mb-6">Refresh the page or come back later.</p>
            <p className="text-xs text-gray-400 break-words">{this.state.errorMessage}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

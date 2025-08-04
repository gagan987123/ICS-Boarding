/**
 * @fileoverview Error Boundary component for graceful error handling
 * @description Catches JavaScript errors anywhere in the child component tree and displays fallback UI
 * @author Onboarding Team
 * @version 1.0.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 * 
 * Catches errors in child components and displays a fallback UI
 * instead of crashing the entire application.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error information
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    // Reset error state to retry rendering
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gray-900 border border-gray-800 rounded-lg p-8 m-4">
          <div className="text-center max-w-md">
            <div className="text-red-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-2">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-6 text-sm">
              We encountered an unexpected error while loading this section. 
              Please try refreshing the page or contact support if the problem persists.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors duration-200"
              >
                Refresh Page
              </button>
            </div>

            {/* Development error details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 text-sm cursor-pointer hover:text-white">
                  Show Error Details
                </summary>
                <div className="mt-2 p-3 bg-gray-800 border border-gray-700 rounded text-xs text-red-300 font-mono overflow-auto max-h-48">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * Hook-based error boundary for functional components
 * Note: This is a simplified version - true error boundaries must be class components
 */
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Handled error:', error);
    
    // You can send to error reporting service here
    // Example: errorReportingService.captureException(error, { extra: errorInfo });
    
    // For now, just log to console
    if (errorInfo) {
      console.error('Additional info:', errorInfo);
    }
  };

  return handleError;
};

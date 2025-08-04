/**
 * @fileoverview Loading skeleton components for better UX
 * @description Reusable loading states and skeleton loaders
 * @author Onboarding Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Generic skeleton loader component
 */
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4' 
}) => (
  <div 
    className={`${width} ${height} bg-gray-800 rounded animate-pulse ${className}`}
    aria-label="Loading..."
  />
);

/**
 * Card skeleton loader
 */
export const CardSkeleton: React.FC = () => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4 animate-pulse">
    <div className="flex items-center space-x-3">
      <Skeleton width="w-10" height="h-10" className="rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton width="w-3/4" height="h-4" />
        <Skeleton width="w-1/2" height="h-3" />
      </div>
    </div>
    <Skeleton width="w-full" height="h-2" className="rounded-full" />
    <div className="space-y-2">
      <Skeleton width="w-full" height="h-3" />
      <Skeleton width="w-5/6" height="h-3" />
      <Skeleton width="w-4/6" height="h-3" />
    </div>
  </div>
);

/**
 * Workflow diagram skeleton loader
 */
export const WorkflowSkeleton: React.FC = () => (
  <div className="py-20 px-4 border-t border-gray-800">
    <div className="max-w-7xl mx-auto">
      {/* Header skeleton */}
      <div className="text-center mb-16 space-y-4">
        <Skeleton width="w-96" height="h-8" className="mx-auto" />
        <Skeleton width="w-2/3" height="h-5" className="mx-auto" />
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-full px-6 py-3">
            <Skeleton width="w-32" height="h-4" />
            <Skeleton width="w-32" height="h-2" className="rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Tool access skeleton loader
 */
export const ToolAccessSkeleton: React.FC = () => (
  <div className="py-16 px-4 border-t border-gray-800">
    <div className="max-w-6xl mx-auto space-y-8">
      <Skeleton width="w-64" height="h-8" className="mx-auto" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton width="w-2/3" height="h-4" />
              <Skeleton width="w-16" height="h-6" className="rounded-full" />
            </div>
            <Skeleton width="w-1/2" height="h-3" />
            <Skeleton width="w-3/4" height="h-3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Organizational structure skeleton
 */
export const OrgStructureSkeleton: React.FC = () => (
  <div className="py-12 px-4 border-t border-gray-800">
    <div className="max-w-5xl mx-auto">
      <Skeleton width="w-48" height="h-8" className="mx-auto mb-8" />
      
      <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
        <div className="flex flex-col items-center space-y-4">
          {/* Hierarchy skeleton */}
          {Array.from({ length: 3 }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="w-64 mb-6">
                <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700 space-y-2">
                  <Skeleton width="w-2/3" height="h-4" className="mx-auto" />
                  <Skeleton width="w-1/2" height="h-3" className="mx-auto" />
                </div>
              </div>
              {index < 2 && <Skeleton width="w-px" height="h-6" />}
            </React.Fragment>
          ))}
          
          {/* Team members skeleton */}
          <div className="mt-8 w-full">
            <Skeleton width="w-32" height="h-5" className="mx-auto mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700 space-y-2">
                  <Skeleton width="w-2/3" height="h-4" className="mx-auto" />
                  <Skeleton width="w-1/2" height="h-3" className="mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Generic loading spinner
 */
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-600 border-t-white rounded-full animate-spin`}
        aria-label="Loading"
      />
    </div>
  );
};

/**
 * Loading page component
 */
export const LoadingPage: React.FC = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-400">Loading Invenco Onboarding Portal...</p>
    </div>
  </div>
);

/**
 * Section loading wrapper
 */
interface SectionLoadingProps {
  isLoading: boolean;
  skeleton: React.ComponentType;
  children: React.ReactNode;
}

export const SectionLoading: React.FC<SectionLoadingProps> = ({ 
  isLoading, 
  skeleton: SkeletonComponent, 
  children 
}) => {
  if (isLoading) {
    return <SkeletonComponent />;
  }
  
  return <>{children}</>;
};

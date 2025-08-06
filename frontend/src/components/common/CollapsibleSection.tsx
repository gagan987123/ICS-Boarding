/**
 * @fileoverview Collapsible Section component
 * @description A section container that can be expanded or collapsed
 * @author Onboarding Team
 * @version 1.0.0
 */

import React, { useState, ReactNode, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';


interface CollapsibleSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * CollapsibleSection Component
 * 
 * Wraps content in a container that can be expanded or collapsed
 * Maintains section ID for navigation purposes
 * 
 * @param props - Component props
 * @returns JSX element for the collapsible section
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  id,
  title,
  children,
  defaultExpanded = true,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const { theme } = useTheme();

  return (
    <section id={id} className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-md transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-expanded={isExpanded}
            aria-controls={`content-${id}`}
            aria-label={isExpanded ? `Collapse ${title} section` : `Expand ${title} section`}
          >
            {isExpanded ? (
              <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        
        <div 
          id={`content-${id}`}
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {children}
        </div>
        
        {!isExpanded && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className={`text-sm transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              aria-label={`Expand ${title} section`}
            >
              Show {title} content
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollapsibleSection;



import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSectionSelect?: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onSectionSelect }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const { theme } = useTheme();
  // Track if a click is in progress to prevent double updates
  const clickInProgress = useRef(false);

  const navigationItems = [
    {
      id: 'hero',
      label: 'Welcome',
      icon: '👋',
      description: 'Get started'
    },
    {
      id: 'workflow',
      label: 'Onboarding Journey',
      icon: '📋',
      description: 'Track your progress'
    },
    {
      id: 'tools',
      label: 'Your Tool Access',
      icon: '🛠️',
      description: 'System credentials'
    },
    {
      id: 'organization',
      label: 'Team Structure',
      icon: '👥',
      description: 'Meet your team'
    },
    {
      id: 'policies',
      label: 'Company Policies',
      icon: '📖',
      description: 'Important guidelines'
    }
  ];

  // Ultra-optimized click handler - prevents all blinking
  const handleSectionClick = (sectionId: string) => {
    // Skip if already active or a click is in progress
    if (activeSection === sectionId || clickInProgress.current) return;
    
    // Mark that we're handling a click to prevent other updates
    clickInProgress.current = true;
    
    // Set active section immediately
    setActiveSection(sectionId);
    
    // Direct parent function call with safety check
    if (onSectionSelect) {
      onSectionSelect(sectionId);
    }
    
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      onToggle();
    }
    
    // Clear click progress state after navigation is complete
    setTimeout(() => {
      clickInProgress.current = false;
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update active section when URL hash changes
    const updateActiveSection = () => {
      const hash = window.location.hash;
      const sectionId = hash ? hash.replace('#', '') : 'hero';
      setActiveSection(sectionId);
    };

    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection(); // Initial run

    return () => {
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, []);

  return (
    <>


      {/* Overlay for all screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] transition-opacity duration-200"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-[70]
        transition-transform duration-150 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[280px] lg:w-[260px] shadow-2xl border-r
        ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : 'bg-white text-gray-800 border-gray-200'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`p-5 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}>
                  <span className="text-white text-lg font-bold">IC</span>
                </div>
                <div>
                  <h2 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Dashboard
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Onboarding Portal
                  </p>
                </div>
              </div>
              
              {/* Close Sidebar Button - Only on mobile */}
              <button
                onClick={onToggle}
                className={`lg:hidden p-2 rounded-full transition-colors duration-200
                  ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                aria-label="Close sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl 
                  flex items-center gap-3 relative group cursor-pointer
                  ${activeSection === item.id 
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-50 text-blue-700'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                {/* Active indicator - always present but visible only when active */}
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${activeSection === item.id ? 'bg-blue-400' : 'bg-transparent'}`}></span>
                
                {/* Icon with background */}
                <div className={`
                  flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg
                  ${activeSection === item.id
                    ? theme === 'dark' 
                      ? 'bg-blue-500' 
                      : 'bg-white'
                    : theme === 'dark'
                      ? 'bg-gray-800'
                      : 'bg-gray-100'
                  }
                `}>
                  <span className={`text-lg
                    ${activeSection === item.id
                      ? theme === 'dark' 
                        ? 'text-white' 
                        : 'text-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }
                  `}>{item.icon}</span>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className={`font-medium text-sm
                    ${activeSection === item.id
                      ? theme === 'dark' 
                        ? 'text-white' 
                        : 'text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-200'
                        : 'text-gray-700'
                    }
                  `}>
                    {item.label}
                  </span>
                  <span className={`text-xs
                    ${activeSection === item.id
                      ? theme === 'dark' 
                        ? 'text-blue-200' 
                        : 'text-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }
                  `}>
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className={`p-4 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center`}>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Invenco Onboarding</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;



import React, { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [activeSection, setActiveSection] = useState('hero');

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setActiveSection(sectionId);
    }
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

  return (
    <>


      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-700 z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 lg:w-72
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black text-sm font-bold">I</span>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Onboarding Portal</h2>
                  <p className="text-gray-400 text-sm">Navigate your journey</p>
                </div>
              </div>
              
              {/* Close Sidebar Button - Only on mobile */}
              <button
                onClick={onToggle}
                className="lg:hidden bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200 border border-gray-600"
                aria-label="Close sidebar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left p-4 rounded-lg transition-all duration-200 group
                  ${activeSection === item.id 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm mb-1 ${
                      activeSection === item.id ? 'text-black' : 'text-white group-hover:text-white'
                    }`}>
                      {item.label}
                    </div>
                    <div className={`text-xs leading-relaxed ${
                      activeSection === item.id ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-300'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-500 text-center">
              <div className="mb-2">Progress Overview</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{width: '25%'}}></div>
              </div>
              <div className="text-gray-400">25% Complete</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

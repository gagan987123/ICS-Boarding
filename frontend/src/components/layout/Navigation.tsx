import React from 'react';
import ThemeToggle from '@/components/common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

interface NavigationProps {
  onSidebarToggle: () => void;
}

const Navigation = ({ onSidebarToggle }: NavigationProps) => {
  const { theme } = useTheme();

  return (
    <header className={`flex items-center justify-between px-6 py-3 border-b sticky top-0 z-30 ${
      theme === 'dark' 
        ? 'bg-black border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-gray-800'
    }`}>
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button */}
        <button
          onClick={onSidebarToggle}
          className={`p-2 rounded-lg ${
            theme === 'dark'
              ? 'hover:bg-gray-800 text-gray-300'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        {/* Invenco Logo */}
        <div className="flex items-center">
          <img 
            src="/Invenco_id84Hgn-m4_0.png" 
            alt="Invenco" 
            className="h-9 w-auto"
          />
          <span className="ml-3 font-semibold text-lg hidden sm:inline-block">
            Onboarding Portal
          </span>
        </div>
      </div>

      {/* Right side: Theme toggle */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navigation;

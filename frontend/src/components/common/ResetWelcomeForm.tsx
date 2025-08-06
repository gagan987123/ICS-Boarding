/**
 * @fileoverview Reset Welcome Form utility component
 * @description A small utility button to reset the welcome form for testing
 * @author Onboarding Team
 * @version 1.0.0
 */

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ResetWelcomeForm Component
 * 
 * A utility button that clears the localStorage flag to show the welcome form again
 * Only used for testing purposes
 * 
 * @returns JSX element for the reset button
 */
const ResetWelcomeForm: React.FC = () => {
  const { theme } = useTheme();
  
  const handleReset = () => {
    localStorage.removeItem('hasVisitedBefore');
    alert('Welcome form has been reset. Refresh the page to see it again.');
  };
  
  return (
    <button
      onClick={handleReset}
      className={`fixed bottom-4 right-4 z-40 p-2 rounded-md text-xs ${
        theme === 'dark' 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } transition-colors shadow-md`}
      title="Reset welcome form (for testing)"
    >
      Reset Welcome Form
    </button>
  );
};

export default ResetWelcomeForm;

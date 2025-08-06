/**
 * @fileoverview Hero section component for the Invenco Onboarding Portal
 * @description Welcome section that displays employee information, onboarding status, and introduction
 * @author Onboarding Team
 * @version 1.0.0
 */

import React from 'react';
import { HeroSectionProps } from '../../types';
import { getOnboardingStatusColor } from '../../utils/helpers';
import { APP_CONFIG } from '../../constants';

/**
 * HeroSection Component
 * 
 * Displays the main welcome section with:
 * - Employee welcome message
 * - Company branding
 * - Onboarding status indicator
 * - Call-to-action button
 * 
 * @param props - Component props
 * @param props.employeeName - Name of the employee (defaults to "New Employee")
 * @param props.onboardingStatus - Current onboarding status
 * @returns JSX element for the hero section
 */
const HeroSection: React.FC<HeroSectionProps> = ({ 
  employeeName = "New Employee", 
  onboardingStatus = "In Progress" 
}) => {

  return (
    <section className="flex flex-col items-center text-center py-24 px-4 max-w-4xl mx-auto">
      {/* Main heading with responsive typography */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
        {APP_CONFIG.NAME.replace('Invenco ', '')}
      </h1>
      
      {/* Welcome message with company branding */}
      <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl">
        Your complete guide to getting started at{' '}
        <span className="text-white font-medium">{APP_CONFIG.COMPANY}</span>. 
        Find everything you need for your first week and beyond.
      </p>
      
      {/* Employee status card with personalized information */}
      <div className="bg-gray-950 border border-gray-600 rounded-lg p-6 mb-8 max-w-md transition-all duration-300 hover:bg-gray-800 hover:border-gray-500 hover:shadow-lg hover:shadow-gray-900/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">Welcome, {employeeName}!</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOnboardingStatusColor(onboardingStatus)}`}>
            {onboardingStatus}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          Your onboarding journey is currently {onboardingStatus.toLowerCase()}. 
          Use this portal to track your progress and access important resources.
        </p>
      </div>
      
      {/* Primary call-to-action button */}
      <a 
        href="#workflow" 
        className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/30"
        aria-label="Navigate to onboarding workflow section"
      >
        Get Started
      </a>
    </section>
  );
};

export default HeroSection;

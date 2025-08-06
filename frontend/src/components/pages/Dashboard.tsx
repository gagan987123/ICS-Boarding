/**
 * @fileoverview Dashboard page component for the Invenco Onboarding Portal
 * @description Main dashboard that displays after successful login
 * @author Onboarding Team
 * @version 1.0.0
 */

import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import Navigation from '../layout/Navigation';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import ErrorBoundary from '../common/ErrorBoundary';
import CollapsibleSection from '../common/CollapsibleSection';
import WelcomeForm, { FormData } from '../common/WelcomeForm';
import ResetWelcomeForm from '../common/ResetWelcomeForm';

import Feedback from '@/components/common/Feedback';
import { useTheme } from '../../context/ThemeContext';
import { 
  WorkflowSkeleton, 
  ToolAccessSkeleton, 
  OrgStructureSkeleton,
  CardSkeleton 
} from '../common/LoadingComponents';

// Lazy loaded section components for better code splitting
const HeroSection = lazy(() => import('../sections/HeroSection'));
const WorkflowDiagram = lazy(() => import('../sections/WorkflowDiagramSimple'));
const ToolAccess = lazy(() => import('../sections/ToolAccess'));
const OrganizationalStructure = lazy(() => import('../sections/OrganizationalStructure'));
const CompanyPolicies = lazy(() => import('../sections/CompanyPolicies'));

// Section IDs for easy reference
const SECTION_IDS = {
  HERO: 'hero',
  WORKFLOW: 'workflow',
  TOOLS: 'tools',
  ORGANIZATION: 'organization',
  POLICIES: 'policies'
};

/**
 * Dashboard Component
 * 
 * Displays the main dashboard with:
 * - Navigation
 * - Sidebar
 * - Collapsible Content Sections
 * - Footer
 * 
 * @returns JSX element for the dashboard page
 */
const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && 
          mainContentRef.current && 
          mainContentRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);
  
  // Check if it's the user's first visit and restore last position
  useEffect(() => {
    // Check for first-time visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowWelcomeForm(true);
    }
  }, []);
  
  // Always scroll to top on page refresh
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set current section to hero/first section
    setCurrentSection('hero');
    
    // Clear any stored positions
    sessionStorage.removeItem('scrollPosition');
    sessionStorage.removeItem('currentSection');
  }, []);

  // Save observed sections for scroll position with memoized handler
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Section is considered "in view" when 50% visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Skip intersection updates if user is actively navigating via sidebar
      if (isNavigating.current) {
        return;
      }
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Update state and localStorage when a section comes into view
          const sectionId = entry.target.id;
          
          // Set section without triggering multiple updates
          setCurrentSection(prevSection => {
            // Only update if it's actually changed
            if (prevSection !== sectionId) {
              localStorage.setItem('lastViewedSection', sectionId);
              
              // Update URL hash without forcing scroll
              if (history.pushState) {
                history.pushState(null, '', `#${sectionId}`);
              }
              return sectionId;
            }
            return prevSection;
          });
        }
      });
    };

    // Create observer immediately
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all section elements
    Object.values(SECTION_IDS).forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Reference to track if navigation is in progress
  const isNavigating = useRef(false);
  
  // Optimized section navigation with debounce to prevent flickering
  const scrollToSection = (sectionId: string) => {
    try {
      // Quick validation
      if (!Object.values(SECTION_IDS).includes(sectionId as any)) {
        console.warn(`Invalid section ID: ${sectionId}`);
        return;
      }

      // Mark that we're actively navigating - prevents intersection updates
      isNavigating.current = true;
      
      // Update UI state once
      setCurrentSection(sectionId);
      localStorage.setItem('lastViewedSection', sectionId);

      // Direct DOM manipulation for immediate scroll
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetPosition = section.offsetTop - 15;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto' 
        });
      }
      
      // Allow intersection observer to work again after a short delay
      setTimeout(() => {
        isNavigating.current = false;
      }, 200);
    } catch (error) {
      console.error("Error scrolling to section:", error);
      isNavigating.current = false;
    }
  };

  const handleWelcomeFormClose = () => {
    setShowWelcomeForm(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };
  
  const handleWelcomeFormSubmit = (formData: FormData) => {
    console.log('Form submitted with data:', formData);
    setShowWelcomeForm(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} font-sans`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} onSectionSelect={scrollToSection} />
      
      <div ref={mainContentRef} className={`transition-all duration-150 ease-out ${sidebarOpen ? 'lg:ml-[260px]' : 'ml-0'}`}>
        <Navigation onSidebarToggle={toggleSidebar} />
        
        {/* Main content starts here */}
        
        <main className="relative">
          <ErrorBoundary>
            {/* Hero Section */}
            <section 
              id={SECTION_IDS.HERO} 
              className={`py-12 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}
            >
              <Suspense fallback={
                <div className="max-w-4xl mx-auto">
                  <CardSkeleton />
                </div>
              }>
                <HeroSection employeeName="John Doe" onboardingStatus="In Progress" />
                
                {/* End of hero section */}
              </Suspense>
            </section>
          </ErrorBoundary>
          
          {/* Workflow Section */}
          <section id={SECTION_IDS.WORKFLOW} className="py-12 px-6">
            <CollapsibleSection 
              id="workflow-collapsible"
              title="Onboarding Workflow" 
              defaultExpanded={true}
            >
              <Suspense fallback={<WorkflowSkeleton />}>
                <div className="max-w-5xl mx-auto">
                  <WorkflowDiagram />
                  <Feedback sectionId={SECTION_IDS.WORKFLOW} sectionName="Onboarding Workflow" />
                </div>
              </Suspense>
            </CollapsibleSection>
          </section>
          
          {/* Tools Section */}
          <section 
            id={SECTION_IDS.TOOLS}
            className={`py-12 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <CollapsibleSection 
              id="tools-collapsible"
              title="Tools & Access" 
              defaultExpanded={true}
            >
              <Suspense fallback={<ToolAccessSkeleton />}>
                <div className="max-w-5xl mx-auto">
                  <ToolAccess />
                  <Feedback sectionId={SECTION_IDS.TOOLS} sectionName="Tools & Access" />
                </div>
              </Suspense>
            </CollapsibleSection>
          </section>
          
          {/* Organization Section */}
          <section id={SECTION_IDS.ORGANIZATION} className="py-12 px-6">
            <CollapsibleSection 
              id="organization-collapsible"
              title="Organization Structure" 
              defaultExpanded={true}
            >
              <Suspense fallback={<OrgStructureSkeleton />}>
                <div className="max-w-5xl mx-auto">
                  <OrganizationalStructure />
                  <Feedback sectionId={SECTION_IDS.ORGANIZATION} sectionName="Organization Structure" />
                </div>
              </Suspense>
            </CollapsibleSection>
          </section>
          
          {/* Policies Section */}
          <section 
            id={SECTION_IDS.POLICIES}
            className={`py-12 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <CollapsibleSection 
              id="policies-collapsible"
              title="Company Policies" 
              defaultExpanded={true}
            >
              <Suspense fallback={<CardSkeleton />}>
                <div className="max-w-5xl mx-auto">
                  <CompanyPolicies />
                  <Feedback sectionId={SECTION_IDS.POLICIES} sectionName="Company Policies" />
                </div>
              </Suspense>
            </CollapsibleSection>
          </section>
        </main>
        
        <Footer />
      </div>
      
      {/* Welcome Form for first-time visitors */}
      {showWelcomeForm && (
        <WelcomeForm 
          onClose={handleWelcomeFormClose} 
          onSubmit={handleWelcomeFormSubmit} 
        />
      )}
      
      {/* Reset button for testing purposes */}
      <ResetWelcomeForm />
    </div>
  );
};

export default Dashboard;

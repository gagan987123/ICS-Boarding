import React, { useState, Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Layout components (loaded immediately)
import Navigation from './components/layout/Navigation';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Error boundary
import ErrorBoundary from './components/common/ErrorBoundary';

// Loading components
import { 
  WorkflowSkeleton, 
  ToolAccessSkeleton, 
  OrgStructureSkeleton,
  CardSkeleton 
} from './components/common/LoadingComponents';

// Lazy loaded section components for better code splitting
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const WorkflowDiagram = lazy(() => import('./components/sections/WorkflowDiagramSimple'));
const ToolAccess = lazy(() => import('./components/sections/ToolAccess'));
const OrganizationalStructure = lazy(() => import('./components/sections/OrganizationalStructure'));
const CompanyPolicies = lazy(() => import('./components/sections/CompanyPolicies'));

// Main App component
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80 lg:ml-72' : 'ml-0'}`}>
        <Navigation onSidebarToggle={toggleSidebar} />
        <main className="relative">
          <ErrorBoundary>
            <section id="hero">
              <Suspense fallback={
                <div className="py-20 px-4 flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-96 h-8 bg-gray-800 rounded animate-pulse mx-auto" />
                    <div className="w-64 h-5 bg-gray-800 rounded animate-pulse mx-auto" />
                  </div>
                </div>
              }>
                <HeroSection />
              </Suspense>
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="workflow">
              <Suspense fallback={<WorkflowSkeleton />}>
                <WorkflowDiagram />
              </Suspense>
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="tools">
              <Suspense fallback={<ToolAccessSkeleton />}>
                <ToolAccess />
              </Suspense>
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="organization">
              <Suspense fallback={<OrgStructureSkeleton />}>
                <OrganizationalStructure />
              </Suspense>
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="policies">
              <Suspense fallback={
                <div className="py-16 px-4 border-t border-gray-800">
                  <div className="max-w-6xl mx-auto space-y-8">
                    <div className="w-64 h-8 bg-gray-800 rounded animate-pulse mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <CardSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              }>
                <CompanyPolicies />
              </Suspense>
            </section>
          </ErrorBoundary>
          
          {/* Outlet for nested routes */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

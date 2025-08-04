/**
 * @fileoverview Type definitions for the Invenco Onboarding Portal
 * @description Centralized type definitions for all components and data structures
 * @author Onboarding Team
 * @version 1.0.0
 */

// =============================================================================
// CORE APPLICATION TYPES
// =============================================================================

/**
 * Status types for various elements throughout the application
 */
export type StatusType = 'Active' | 'Pending' | 'Completed' | 'Inactive';

/**
 * Onboarding status specific to employee journey
 */
export type OnboardingStatus = 'In Progress' | 'Completed' | 'Pending';

/**
 * Priority levels for tasks and policies
 */
export type PriorityLevel = 'High' | 'Medium' | 'Low';

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
  employeeName?: string;
  onboardingStatus?: OnboardingStatus;
}

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  onSidebarToggle: () => void;
}

/**
 * Props for the Sidebar component
 */
export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// =============================================================================
// DATA MODEL TYPES
// =============================================================================

/**
 * Tool access information for new employees
 */
export interface ToolAccess {
  name: string;
  type: string;
  access: string;
  status: StatusType;
}

/**
 * Workflow step information for onboarding journey
 */
export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  timeline: string;
  tasks: string[];
  contact: string;
  deadline: string;
  color: string;
  badgeColor: string;
  icon: string;
}

/**
 * Team member information for organizational structure
 */
export interface TeamMember {
  name: string;
  title: string;
  email: string;
  role?: string;
  extension?: string;
  meetingSchedule?: string;
}

/**
 * HR Policy information
 */
export interface HRPolicy {
  title: string;
  status: string;
  urgent?: boolean;
}

/**
 * IT Security item information
 */
export interface ITSecurityItem {
  title: string;
  desc: string;
  status: StatusType;
}

/**
 * Calendar event information for onboarding schedule
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  description?: string;
  location?: string;
  attendees?: string[];
  category: 'orientation' | 'training' | 'meeting' | 'deadline' | 'social' | 'other';
  isRequired: boolean;
  isCompleted?: boolean;
  link?: string; // For virtual meetings
  calendarLink?: string; // For adding to personal calendar
}

/**
 * Calendar section props
 */
export interface CalendarProps {
  events?: CalendarEvent[];
  isLoading?: boolean;
  onEventClick?: (event: CalendarEvent) => void;
  onAddToCalendar?: (event: CalendarEvent) => void;
  viewMode?: 'month' | 'week' | 'day' | 'agenda';
}

/**
 * Sidebar navigation item structure
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Local storage task completion tracking
 */
export interface TaskCompletionState {
  [key: string]: boolean;
}

/**
 * Color mapping for status indicators
 */
export type StatusColorMap = {
  [K in StatusType]: string;
};

/**
 * Common HTML element props with optional className override
 */
export interface CommonProps {
  className?: string;
  children?: React.ReactNode;
}

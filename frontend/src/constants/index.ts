/**
 * @fileoverview Application constants
 * @description Centralized constants for the application
 * @author Onboarding Team
 * @version 1.0.0
 */

import { WorkflowStep } from '../types';

/**
 * Onboarding workflow steps data
 */
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Pre-Onboarding',
    description: 'Complete paperwork and prepare for your first day',
    timeline: 'Before Day 1',
    tasks: [
      'Complete employment documents',
      'Set up direct deposit',
      'Review company handbook',
      'Prepare home office (if remote)'
    ],
    contact: 'HR Department',
    deadline: 'Before start date',
    color: 'blue',
    badgeColor: 'bg-blue-600',
    icon: 'DocumentCheckIcon'
  },
  {
    id: 2,
    title: 'First Day',
    description: 'Get acquainted with your workspace and team',
    timeline: 'Day 1',
    tasks: [
      'IT equipment setup',
      'Company ID & access cards',
      'Team introduction meeting',
      'Workspace orientation'
    ],
    contact: 'Your Manager',
    deadline: 'Day 1',
    color: 'green',
    badgeColor: 'bg-green-600',
    icon: 'UserPlusIcon'
  },
  {
    id: 3,
    title: 'Week One',
    description: 'Learn about your role and begin initial training',
    timeline: 'Days 2-5',
    tasks: [
      'Role-specific training',
      'Company systems access',
      'Process overview',
      'First project introduction'
    ],
    contact: 'Team Lead',
    deadline: 'End of first week',
    color: 'purple',
    badgeColor: 'bg-purple-600',
    icon: 'AcademicCapIcon'
  },
  {
    id: 4,
    title: 'First Month',
    description: 'Become familiar with processes and deliver initial work',
    timeline: 'Days 6-30',
    tasks: [
      'Deep-dive training sessions',
      'First milestone completion',
      'Feedback session',
      'Meet extended team members'
    ],
    contact: 'Department Head',
    deadline: 'End of first month',
    color: 'amber',
    badgeColor: 'bg-amber-600',
    icon: 'CalendarDaysIcon'
  },
  {
    id: 5,
    title: 'First Quarter',
    description: 'Fully integrate and contribute independently',
    timeline: 'Days 31-90',
    tasks: [
      'Performance review',
      'Goal setting session',
      'Team project contribution',
      'Training completion'
    ],
    contact: 'HR & Manager',
    deadline: 'End of third month',
    color: 'rose',
    badgeColor: 'bg-rose-600',
    icon: 'ChartBarIcon'
  }
];

/**
 * Navigation items for sidebar
 */
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'HomeIcon',
    description: 'Overview of your onboarding progress'
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: 'CheckCircleIcon',
    description: 'Your to-do list for onboarding'
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'CalendarIcon',
    description: 'Important dates and meetings'
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'BookOpenIcon',
    description: 'Helpful documents and links'
  },
  {
    id: 'team',
    label: 'Meet the Team',
    icon: 'UsersIcon',
    description: 'Get to know your colleagues'
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: 'LifebuoyIcon',
    description: 'Get assistance when needed'
  }
];

/**
 * Application storage keys
 */
export const STORAGE_KEYS = {
  TASK_COMPLETION: 'invenco_onboarding_tasks',
  USER_PREFERENCES: 'invenco_onboarding_prefs',
  AUTH_TOKEN: 'invenco_auth_token'
};

/**
 * API endpoints
 * Note: These would be replaced with actual endpoints in a real implementation
 */
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  TASKS: '/api/tasks',
  SCHEDULE: '/api/schedule',
  TEAM: '/api/team',
  RESOURCES: '/api/resources'
};

/**
 * Feature flags for conditionally enabling features
 */
export const FEATURES = {
  CALENDAR_SYNC: true,
  NOTIFICATIONS: true,
  FEEDBACK_SYSTEM: true,
  TEAM_CHAT: false // Coming soon
};

/**
 * Application configuration
 */
export const APP_CONFIG = {
  NAME: 'Invenco Onboarding Portal',
  COMPANY: 'Invenco by GVR',
  VERSION: '1.0.0',
  DESCRIPTION: 'Complete guide for new employee onboarding at Invenco by GVR',
  CONTACT_EMAIL: 'hr@invenco.com'
};

/**
 * Footer data
 */
export const FOOTER_DATA = {
  company: {
    name: 'Invenco by GVR',
    description: 'Leading provider of payment solutions and forecourt automation technology for the retail fuel market.',
    founded: '1998',
    website: 'https://www.invenco.com'
  },
  contact: {
    email: 'hr@invenco.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Tech Plaza',
      city: 'Atlanta',
      state: 'GA',
      zip: '30308',
      country: 'United States'
    }
  },
  quickLinks: [
    { name: 'Employee Resources', href: '#/resources' },
    { name: 'IT Support', href: '#/support' },
    { name: 'HR Portal', href: '#/hr' },
    { name: 'Benefits', href: '#/benefits' },
    { name: 'Training', href: '#/training' }
  ],
  policies: [
    { name: 'Privacy Policy', href: '#/privacy' },
    { name: 'Terms of Service', href: '#/terms' },
    { name: 'Code of Conduct', href: '#/conduct' },
    { name: 'Security Policy', href: '#/security' }
  ],
  socialMedia: [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/invenco', 
      icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/invenco', 
      icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'
    },
    { 
      name: 'Email', 
      href: 'mailto:info@invenco.com', 
      icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/invenco', 
      icon: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z'
    }
  ],
  offices: [
    {
      name: 'Atlanta HQ',
      address: '123 Tech Plaza, Atlanta, GA 30308',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'New Zealand',
      address: '456 Innovation Way, Auckland',
      phone: '+64 9 123 4567'
    },
    {
      name: 'UK Office',
      address: '789 Digital Lane, London',
      phone: '+44 20 1234 5678'
    }
  ]
};

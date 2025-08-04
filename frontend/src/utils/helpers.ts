/**
 * @fileoverview Helper utility functions
 * @description Common helper functions used throughout the application
 * @author Onboarding Team
 * @version 1.0.0
 */

import { StatusType, StatusColorMap } from '../types';

/**
 * Format a date string to a more readable format
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Status color mapping for UI components
 */
export const statusColors: StatusColorMap = {
  'Active': 'bg-green-500',
  'Pending': 'bg-yellow-500',
  'Completed': 'bg-blue-500',
  'Inactive': 'bg-gray-500'
};

/**
 * Get CSS class for a given status
 */
export const getStatusClass = (status: StatusType): string => {
  return statusColors[status] || 'bg-gray-500';
};

/**
 * Generate a unique ID
 */
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Local storage utility functions
 */
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Truncate text with ellipsis if it exceeds maxLength
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Get current year for copyright notices
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Get CSS class for onboarding status
 */
export const getOnboardingStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500 text-green-50';
    case 'In Progress':
      return 'bg-blue-500 text-blue-50';
    case 'Pending':
      return 'bg-yellow-500 text-yellow-50';
    default:
      return 'bg-gray-500 text-gray-50';
  }
};

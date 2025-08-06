/**
 * @fileoverview Welcome Form component for first-time users
 * @description Modal form that appears on first visit to collect user information
 * @author Onboarding Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface WelcomeFormProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  fullName: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
}

/**
 * WelcomeForm Component
 * 
 * Displays a modal form for first-time users to collect their information
 * 
 * @param props - Component props
 * @returns JSX element for the welcome form modal
 */
const WelcomeForm: React.FC<WelcomeFormProps> = ({ onClose, onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    employeeId: '',
    department: '',
    position: ''
  });

  const departments = [
    'Select Department',
    'Engineering',
    'Product',
    'Marketing',
    'Sales',
    'Customer Support',
    'Human Resources',
    'Finance',
    'Operations',
    'Research & Development',
    'Information Technology'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.fullName || !formData.email || !formData.employeeId || !formData.department || !formData.position) {
        alert('Please fill in all required fields');
        return;
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className={`w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'} rounded-lg shadow-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Welcome to Invenco Onboarding
          </h2>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Please provide some information to personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} pb-2`}>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="employeeId" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} pb-2`}>
                Job Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  >
                    {departments.map((dept, index) => (
                      <option key={index} value={index === 0 ? '' : dept} disabled={index === 0}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="position" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Position/Role *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 outline-none`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeForm;

/**
 * @fileoverview Login page component for the Invenco Onboarding Portal
 * @description Login page that allows users to authenticate
 * @author Onboarding Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../../constants';

/**
 * Login Component
 * 
 * Displays a login form with:
 * - Company branding
 * - Email/password inputs
 * - Login button
 * 
 * @returns JSX element for the login page
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For testing purposes, we're just navigating to dashboard without authentication
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <header className="flex items-center px-8 py-4 border-b border-gray-800 bg-black">
        <div className="flex items-center gap-3 select-none">
          <img src="/Invenco_id84Hgn-m4_0.png" alt="Invenco by GVR Logo" width={40} height={40} className="transition-transform hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white">Invenco</span>
            <span className="text-xs text-gray-400 font-medium tracking-wider">by GVR</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30">
            {/* Main heading with responsive typography */}
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
              {APP_CONFIG?.NAME?.replace('Invenco ', '') || 'Onboarding Portal'}
            </h1>
            
            {/* Welcome message */}
            <p className="text-gray-400 mb-8 text-center">
              Sign in to access your onboarding resources
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="name@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <button 
                  type="submit"
                  className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/30"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {APP_CONFIG?.COMPANY || 'Invenco by GVR'}. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;

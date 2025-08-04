/**
 * Footer Component
 * 
 * Comprehensive footer section for Invenco by GVR onboarding portal.
 * Features multiple sections including company information, quick links,
 * policies, contact details, office locations, and social media.
 * 
 * @returns {JSX.Element} Professional footer with company branding
 */

import React from 'react';
import { FOOTER_DATA } from '../../constants';
import { getCurrentYear } from '../../utils/helpers';

const Footer: React.FC = () => {
  const currentYear = getCurrentYear();
  const { company, contact, quickLinks, policies, socialMedia, offices } = FOOTER_DATA;

  return (
    <footer className="mt-auto bg-gray-950 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{company.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {company.description}
              </p>
              <p className="text-xs text-gray-500">
                Established {company.founded}
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-medium text-white mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a 
                  href={`mailto:${contact.email}`} 
                  className="block hover:text-white transition-colors duration-200"
                  aria-label="Send email to HR"
                >
                  {contact.email}
                </a>
                <a 
                  href={`tel:${contact.phone}`} 
                  className="block hover:text-white transition-colors duration-200"
                  aria-label="Call main office"
                >
                  {contact.phone}
                </a>
                <div className="text-xs text-gray-500 mt-2">
                  {contact.address.street}<br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}<br />
                  {contact.address.country}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-3">
              {policies.map((policy, index) => (
                <li key={index}>
                  <a
                    href={policy.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    aria-label={`View ${policy.name}`}
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Offices</h3>
            <div className="space-y-4">
              {offices.map((office, index) => (
                <div key={index} className="text-sm">
                  <h4 className="font-medium text-white mb-1">{office.name}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-1">{office.address}</p>
                  <a 
                    href={`tel:${office.phone}`} 
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-xs"
                    aria-label={`Call ${office.name}`}
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 mr-2">Follow us:</span>
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    className="drop-shadow-sm"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-gray-500">
              <span>&copy; {currentYear} {company.name}. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
                aria-label="Visit company website"
              >
                www.invenco.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * Footer Component Features:
 * 
 * 1. **Company Information**: Brand name, description, founding year
 * 2. **Contact Details**: Email, phone, physical address with interactive links
 * 3. **Quick Links**: Employee resources, IT support, HR, benefits, training
 * 4. **Policies**: Privacy, terms, conduct, security policies
 * 5. **Global Offices**: Multiple office locations with contact information
 * 6. **Social Media**: LinkedIn, Twitter, Email, YouTube with hover effects
 * 7. **Responsive Design**: Mobile-first approach with grid layouts
 * 8. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
 * 9. **Interactive Elements**: Hover effects, transitions, scaling animations
 * 10. **Professional Styling**: Black/white theme, consistent spacing, typography
 * 
 * The footer serves as a comprehensive resource hub for new employees,
 * providing easy access to essential company information and resources.
 */

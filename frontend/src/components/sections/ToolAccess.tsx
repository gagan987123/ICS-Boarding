import React, { useState } from 'react';

interface Tool {
  name: string;
  status: 'Active' | 'Pending';
  description: string;
  icon: string;
  id: string;
}

const ToolAccess = () => {
  const [tools, setTools] = useState<Tool[]>([
    { 
      id: "github", 
      name: "GitHub", 
      status: "Pending", 
      description: "Code repository and version control system", 
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    { 
      id: "jira", 
      name: "Jira", 
      status: "Pending", 
      description: "Issue tracking and project management platform", 
      icon: "M11.53.013c-.17.1-3.462 3.587-7.32 7.757l-7.01 7.58 3.28 3.653a453.309 453.309 0 0 1 3.56 3.973c.153.24-.743-1.013 9.33-13.193l9.5-13.19L19.877.606c-1.803-1.803-3.307-2.993-3.342-2.993-.035-.001-2.285 2.157-5 4.793zm6.3 1.427c-.48.68-1.7 2.413-2.72 3.853-2.467 3.493-2.787 3.913-2.707 3.994.042.042.827.9 1.745 1.908l1.67 1.833 2.842-3.13c1.563-1.723 3.267-3.6 3.787-4.173l.945-1.04-1.71-1.71C19.7-.927 20.095-.147 17.83 1.44zM10.95 11.945c-3.285 4.603-4.044 5.643-4.364 5.967l-.398.397 1.828 1.835 1.827 1.835 2.852-3.147c1.568-1.732 3.272-3.607 3.787-4.167l.935-1.018-1.72-1.723c-1.835-1.836-1.577-2.08-4.747 1.02zM4.174 18.803c-2.73 2.88-3.183 3.377-3.13 3.43.031.032.79.795 1.685 1.698l1.63 1.643 1.65-1.814 1.652-1.813-1.623-1.623c-.892-.892-1.632-1.622-1.642-1.622-.011 0-.91.95-1.222 2.1z"
    },
    { 
      id: "ics-app", 
      name: "ICS Application", 
      status: "Pending", 
      description: "Internal company system for operations", 
      icon: "M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"
    },
    { 
      id: "confluence", 
      name: "Confluence", 
      status: "Pending", 
      description: "Team collaboration and documentation platform", 
      icon: "M.523 3.114l9.015-2.293a.988.988 0 0 1 .931.229.983.983 0 0 1 .362.877l-1.636 9.39c-.088.502-.53.85-1.033.82L.523 3.114zM.265 5.46l7.334 7.64a.999.999 0 0 1 .211 1.054l-2.903-10.32L.265 5.46zm15.983 7.42l-8.479 1.976a.994.994 0 0 1-.986-.317.983.983 0 0 1-.222-.906l2.067-10.416 7.62 9.663zm-.615-3.427l-7.884-9.67a.983.983 0 0 1-.193-1.092L16.017 0l-.384 9.453z"
    }
  ]);

  /**
   * Handles the tool access request by opening Outlook with a pre-formatted email template
   * @description Opens the default email client (Outlook) with a professional email template
   * for requesting access to new tools or systems
   */
  const toggleToolAccess = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, status: tool.status === 'Pending' ? 'Active' : 'Pending' } : tool
    ));
  };
  
  /**
   * Handles the tool access request by opening Outlook with a pre-formatted email template
   * @description Opens the default email client (Outlook) with a professional email template
   * for requesting access to new tools or systems
   */
  const handleRequestNewTool = () => {
    const subject = encodeURIComponent('New Tool Access Request - [Employee Name]');
    const body = encodeURIComponent(
      `Dear IT Support Team,\n\n` +
      `I am writing to request access to a new tool/system for my role at Invenco by GVR.\n\n` +
      `REQUEST DETAILS:\n` +
      `• Employee Name: [Your Full Name]\n` +
      `• Department: [Your Department]\n` +
      `• Manager: [Manager Name]\n` +
      `• Position: [Your Job Title]\n\n` +
      `TOOL INFORMATION:\n` +
      `• Tool/System Name: [Tool Name]\n` +
      `• Tool Type: [e.g., Software Application, Web Service, Hardware]\n` +
      `• Vendor/Provider: [Company Name]\n` +
      `• License Type Needed: [e.g., Full License, Viewer Only, Trial]\n\n` +
      `BUSINESS JUSTIFICATION:\n` +
      `• Purpose: [Explain why you need this tool]\n` +
      `• Business Impact: [How it will improve productivity/processes]\n` +
      `• Urgency Level: [Low/Medium/High]\n` +
      `• Expected Usage: [Daily/Weekly/Monthly/As Needed]\n\n` +
      `ADDITIONAL INFORMATION:\n` +
      `• Training Required: [Yes/No - If yes, specify type]\n` +
      `• Integration Needed: [Any systems this tool needs to integrate with]\n` +
      `• Budget Approval: [If applicable, provide cost and approval status]\n` +
      `• Alternative Considered: [Other tools evaluated]\n\n` +
      `REQUESTED TIMELINE:\n` +
      `• Preferred Start Date: [Date]\n` +
      `• Deadline (if applicable): [Date and reason]\n\n` +
      `Please let me know if you need any additional information or documentation to process this request.\n\n` +
      `Thank you for your assistance.\n\n` +
      `Best regards,\n` +
      `[Your Name]\n` +
      `[Your Email]\n` +
      `[Your Phone Number]\n` +
      `[Date]`
    );
    
    // Create mailto link and open in default email client (typically Outlook)
    const mailtoLink = `mailto:it-support@invenco.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const getStatusColor = (status: Tool['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <section className="py-16 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Tool Access</h2>
        
        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-gray-950 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d={tool.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white text-lg">{tool.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                  {tool.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{tool.status === 'Active' ? 'Access granted' : 'Access pending'}</span>
                
                {/* Toggle switch */}
                <button 
                  onClick={() => toggleToolAccess(tool.id)}
                  className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                  aria-pressed={tool.status === 'Active'}
                >
                  <span className="sr-only">Toggle {tool.name} access</span>
                  <span 
                    className={`${tool.status === 'Active' ? 'bg-green-600' : 'bg-gray-700'} inline-block h-5 w-10 rounded-full transition-colors`}
                  />
                  <span 
                    className={`${tool.status === 'Active' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-xs">{tool.status === 'Active' ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Request New Tool */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Request Button */}
          <div 
            onClick={handleRequestNewTool}
            className="bg-gray-950 border border-gray-700 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:border-blue-500 flex flex-col items-center justify-center text-center md:w-1/2"
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Request New Tool</h3>
            <p className="text-sm text-gray-400">
              Need access to a different tool? Click here to send an email request to IT support.
            </p>
          </div>
          
          {/* Information Section */}
          <div className="bg-gray-950 border border-gray-700 rounded-lg p-6 md:w-1/2">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-2">About Tool Access</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Toggle the switches to request access to the available tools. Your access request will be automatically submitted to the IT department.
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Response Time:</span> Typically 1-2 business days | 
                  <span className="font-medium">Contact:</span> it-support@invenco.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolAccess;

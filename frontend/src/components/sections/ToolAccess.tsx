interface Tool {
  name: string;
  status: 'Active' | 'Pending' | 'Setup Required';
  type: string;
  access: string;
}

const ToolAccess = () => {
  const tools: Tool[] = [
    { name: "Office 365", status: "Active", type: "Email & Collaboration", access: "Full Access" },
    { name: "The Hub Platform", status: "Pending", type: "Device Management", access: "Training Required" },
    { name: "FlexPay Systems", status: "Pending", type: "Payment Processing", access: "Role-Based" },
    { name: "VPN Access", status: "Setup Required", type: "Network Security", access: "IT Setup Needed" },
    { name: "Salesforce CRM", status: "Active", type: "Customer Management", access: "View Only" },
    { name: "Jira/Confluence", status: "Active", type: "Project Management", access: "Team Member" }
  ];

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
      case 'Setup Required': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <section className="py-16 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Tool Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-800 hover:border-gray-600 hover:shadow-xl hover:shadow-gray-900/50 hover:-translate-y-2 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                  {tool.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{tool.type}</p>
              <p className="text-xs text-gray-500">{tool.access}</p>
            </div>
          ))}
          
          {/* Request New Tool Button */}
          <div 
            onClick={handleRequestNewTool}
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-dashed border-gray-600 rounded-lg p-4 transition-all duration-300 hover:border-white hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-2 hover:scale-105 cursor-pointer flex flex-col items-center justify-center min-h-[120px] group"
          >
            <div className="text-center">
              {/* Plus Icon */}
              <div className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-white flex items-center justify-center mb-3 mx-auto transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              
              {/* Button Text */}
              <h3 className="font-semibold text-white group-hover:text-white transition-colors duration-300 mb-1">Request New Tool</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Click to send email request</p>
            </div>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            {/* Info Icon */}
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            {/* Info Content */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">Need Access to a New Tool?</h4>
              <p className="text-sm text-gray-400 mb-2">
                Click the &quot;Request New Tool&quot; button above to automatically open Outlook with a pre-formatted email template. 
                Simply fill in the required information and send to our IT support team.
              </p>
              <div className="text-xs text-gray-500">
                <span className="font-medium">Response Time:</span> Typically 1-2 business days | 
                <span className="font-medium">Contact:</span> it-support@invenco.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolAccess;

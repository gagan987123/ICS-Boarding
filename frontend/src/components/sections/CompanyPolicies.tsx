import React from 'react';

interface Policy {
  title: string;
  status: string;
  urgent: boolean;
}

interface ITItem {
  title: string;
  desc: string;
  status: 'Required' | 'Pending' | 'Active' | 'Info';
}

const CompanyPolicies = () => {
  const hrPolicies: Policy[] = [
    { title: "Code of Conduct", status: "Required Reading", urgent: true },
    { title: "Anti-Harassment Policy", status: "Required Reading", urgent: true },
    { title: "Time Off Policy", status: "Review", urgent: false },
    { title: "Remote Work Guidelines", status: "Review", urgent: false },
    { title: "Benefits Overview", status: "Optional", urgent: false }
  ];

  const itSecurityItems: ITItem[] = [
    { title: "Password Policy", desc: "Must change every 90 days", status: "Active" },
    { title: "VPN Setup Guide", desc: "Required for remote access", status: "Pending" },
    { title: "Software Installation", desc: "Contact IT for approval", status: "Info" },
    { title: "Data Security Training", desc: "Complete within 30 days", status: "Required" },
    { title: "Device Management", desc: "Register all work devices", status: "Pending" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Required': return 'bg-red-900 text-red-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      case 'Active': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <section className="py-16 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Important Policies & Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* HR Policies */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">HR Policies</h3>
            <div className="space-y-3">
              {hrPolicies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
                  <div>
                    <h4 className="font-medium text-white text-sm">{policy.title}</h4>
                    <p className="text-xs text-gray-400">{policy.status}</p>
                  </div>
                  {policy.urgent && (
                    <span className="px-2 py-1 bg-red-900 text-red-300 rounded text-xs font-medium">
                      Priority
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* IT & Security */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">IT & Security</h3>
            <div className="space-y-3">
              {itSecurityItems.map((item, index) => (
                <div key={index} className="p-3 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white text-sm">{item.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CompanyPolicies);

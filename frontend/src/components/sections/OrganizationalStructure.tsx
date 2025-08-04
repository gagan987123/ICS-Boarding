

import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  email: string;
}

interface Manager {
  name: string;
  title: string;
  email: string;
  extension?: string;
  meetingSchedule?: string;
}

const OrganizationalStructure = () => {
  const departmentHead: Manager = {
    name: "Sarah Johnson",
    title: "Department Head",
    email: "sarah.johnson@invenco.com"
  };

  const directManager: Manager = {
    name: "Mike Chen",
    title: "Your Direct Manager",
    email: "mike.chen@invenco.com",
    extension: "3205",
    meetingSchedule: "Weekly 1:1 - Fridays 2PM"
  };

  const teamMembers: TeamMember[] = [
    { name: "Alex Rivera", role: "Senior Developer", email: "alex.rivera@invenco.com" },
    { name: "Emma Davis", role: "Product Manager", email: "emma.davis@invenco.com" },
    { name: "Jordan Kim", role: "QA Engineer", email: "jordan.kim@invenco.com" }
  ];

  return (
    <section className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Team Structure</h2>
        
        {/* Simple Org Chart */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="flex flex-col items-center space-y-4">
            {/* Department Head */}
            <div className="w-64 mb-6">
              <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700 transition-all duration-300 hover:bg-gray-700">
                <div className="font-bold text-white mb-1">{departmentHead.name}</div>
                <div className="text-xs text-gray-400">{departmentHead.title}</div>
              </div>
            </div>
            
            {/* Connector Line */}
            <div className="h-6 w-px bg-gray-700"></div>
            
            {/* Direct Manager */}
            <div className="w-64 mb-6">
              <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700 transition-all duration-300 hover:bg-gray-700">
                <div className="font-bold text-white mb-1">{directManager.name}</div>
                <div className="text-xs text-gray-400">{directManager.title}</div>
              </div>
            </div>
            
            {/* Connector Line */}
            <div className="h-6 w-px bg-gray-700"></div>
            
            {/* You */}
            <div className="w-64 mb-6">
              <div className="bg-white rounded-lg p-3 text-center border border-gray-300 transition-all duration-300 hover:bg-gray-100">
                <div className="font-bold text-black mb-1">You</div>
                <div className="text-xs text-gray-600">New Team Member</div>
              </div>
            </div>
            
            {/* Connector Line */}
            <div className="h-6 w-px bg-gray-700"></div>
            
            {/* Team Members Section Header */}
            <div className="text-sm font-medium text-gray-400 py-1 px-3 bg-gray-800 rounded-full">Your Team Members</div>
            
            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700 transition-all duration-300 hover:bg-gray-700">
                  <div className="font-bold text-white text-sm mb-1">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default React.memo(OrganizationalStructure);

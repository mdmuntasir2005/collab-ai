"use client";

import { useState } from 'react';
import Image from 'next/image';
import AIAssistantChat from '@/components/ai-assistant/chat';
import QuickActionWidget from '@/components/dashboard/quick-actions';
import TeamActivityFeed from '@/components/dashboard/team-activity';
import ProjectDashboard from '@/components/dashboard/project-dashboard';

export default function Home() {
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarNavigation = [
    { 
      icon: '/icons/dashboard.svg', 
      label: 'Dashboard', 
      key: 'dashboard' 
    },
    { 
      icon: '/icons/project.svg', 
      label: 'Projects', 
      key: 'projects' 
    },
    { 
      icon: '/icons/crm.svg', 
      label: 'CRM', 
      key: 'crm' 
    },
    { 
      icon: '/icons/marketing.svg', 
      label: 'Marketing', 
      key: 'marketing' 
    },
    { 
      icon: '/icons/analytics.svg', 
      label: 'Analytics', 
      key: 'analytics' 
    },
    { 
      icon: '/icons/settings.svg', 
      label: 'Settings', 
      key: 'settings' 
    }
  ];

  return (
    <main className="flex h-screen bg-gray-100">
      {/* Left Sidebar Navigation */}
      <div 
        className={`${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white border-r flex flex-col items-center py-4 transition-all duration-300`}
      >
        {/* Collapse/Expand Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="mb-4 p-2 hover:bg-gray-100 rounded"
        >
          <Image 
            src="/icons/chevron-left.svg" 
            alt="Toggle Sidebar" 
            width={24} 
            height={24} 
            className={`transform ${
              isSidebarCollapsed ? 'rotate-180' : ''
            } transition-transform`}
          />
        </button>

        {sidebarNavigation.map((item) => (
          <button
            key={item.key}
            className={`mb-2 p-2 rounded flex items-center ${
              activeSidebar === item.key 
                ? 'bg-blue-100 text-blue-600' 
                : 'hover:bg-gray-100'
            } ${isSidebarCollapsed ? 'justify-center' : 'w-full px-4'}`}
            onClick={() => setActiveSidebar(item.key)}
          >
            <Image 
              src={item.icon} 
              alt={item.label} 
              width={24} 
              height={24} 
            />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-sm">{item.label}</span>
            )}
          </button>
        ))}

        {/* AI Assistant Toggle */}
        <button 
          className={`mt-auto mb-4 p-2 rounded flex items-center ${
            isAIAssistantOpen 
              ? 'bg-blue-500 text-white' 
              : 'bg-white border hover:bg-gray-100'
          } ${isSidebarCollapsed ? 'justify-center' : 'w-full px-4'}`}
          onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        >
          <Image 
            src="/icons/ai-chat.svg" 
            alt="AI Assistant" 
            width={24} 
            height={24} 
          />
          {!isSidebarCollapsed && (
            <span className="ml-3 text-sm">AI Assistant</span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Project Dashboard */}
        <div className="col-span-2 bg-white p-4 rounded shadow overflow-auto h-[calc(100vh-2rem)]">
          <ProjectDashboard />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 space-y-4 h-[calc(100vh-2rem)] overflow-hidden">
          {/* Quick Actions Widget */}
          <div className="bg-white p-4 rounded shadow">
            <QuickActionWidget />
          </div>

          {/* Team Activity Feed */}
          <div className="bg-white p-4 rounded shadow h-[calc(100%-11rem)] overflow-hidden">
            <TeamActivityFeed />
          </div>
        </div>
      </div>

      {/* AI Assistant Chat */}
      {isAIAssistantOpen && (
        <div className="fixed bottom-4 right-4 w-80">
          <AIAssistantChat onClose={() => setIsAIAssistantOpen(false)} />
        </div>
      )}
    </main>
  );
}

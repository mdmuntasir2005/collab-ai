"use client"

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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
  ]

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
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* Main content same as previous example */}
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        </div>

        <div className="col-span-1 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white p-2 rounded">
                Create Task
              </button>
              <button className="w-full bg-green-500 text-white p-2 rounded">
                Start Meeting
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium mb-3">Team Activity</h3>
          </div>
        </div>
      </div>

      {/* AI Assistant Chat (Placeholder) */}
      {isAIAssistantOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-4">
          <div className="h-64 overflow-y-auto">
            <p className="text-gray-500">AI Assistant Chat</p>
          </div>
        </div>
      )}
    </main>
  )
}

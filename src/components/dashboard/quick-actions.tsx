"use client"

import { useState } from 'react'
import Image from 'next/image'

interface QuickAction {
  id: string
  title: string
  icon: string
  color: string
  onClick: () => void
}

export default function QuickActionWidget() {
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  
  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Create Task',
      icon: '/icons/task.svg',
      color: 'bg-blue-500',
      onClick: () => setIsCreatingTask(true)
    },
    {
      id: '2',
      title: 'Start Meeting',
      icon: '/icons/meeting.svg',
      color: 'bg-green-500',
      onClick: () => console.log('Start meeting')
    },
    {
      id: '3',
      title: 'New Campaign',
      icon: '/icons/campaign.svg',
      color: 'bg-purple-500',
      onClick: () => console.log('New campaign')
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Quick Actions</h3>
      
      <div className="grid gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${action.color} text-white p-3 rounded-lg w-full flex items-center justify-between hover:opacity-90 transition-opacity`}
          >
            <span className="flex items-center">
              <Image
                src={action.icon}
                alt={action.title}
                width={20}
                height={20}
              />
              <span className="ml-2">{action.title}</span>
            </span>
            <Image
              src="/icons/arrow-right.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </button>
        ))}
      </div>

      {isCreatingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Create New Task</h3>
              <button onClick={() => setIsCreatingTask(false)}>
                <Image
                  src="/icons/close.svg"
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <input
              type="text"
              placeholder="Task title"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-4 h-24 resize-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreatingTask(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCreatingTask(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

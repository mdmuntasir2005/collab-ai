"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface TeamActivity {
  id: string
  type: 'task' | 'comment' | 'project' | 'meeting' | 'ai_insight'
  user: {
    name: string
    avatar: string
  }
  action: string
  target: string
  timestamp: Date
  summary?: string
}

export default function TeamActivityFeed() {
  const [activities, setActivities] = useState<TeamActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulating real-time data fetching
  useEffect(() => {
    const mockActivities: TeamActivity[] = [
      {
        id: '1',
        type: 'ai_insight',
        user: {
          name: 'AI Assistant',
          avatar: '/icons/ai-avatar.svg'
        },
        action: 'detected a potential bottleneck',
        target: 'Q4 Marketing Campaign',
        timestamp: new Date(),
        summary: 'Current task dependencies might delay launch by 2 days'
      },
      {
        id: '2',
        type: 'task',
        user: {
          name: 'Sarah Chen',
          avatar: '/avatars/sarah.jpg'
        },
        action: 'completed',
        target: 'Update landing page copy',
        timestamp: new Date(Date.now() - 1000 * 60 * 15)
      },
      {
        id: '3',
        type: 'meeting',
        user: {
          name: 'Alex Kim',
          avatar: '/avatars/alex.jpg'
        },
        action: 'scheduled',
        target: 'Design Review Meeting',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      }
    ]

    setActivities(mockActivities)
    setIsLoading(false)
  }, [])

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getActivityIcon = (type: TeamActivity['type']) => {
    const iconMap = {
      task: '/icons/task.svg',
      comment: '/icons/comment.svg',
      project: '/icons/project.svg',
      meeting: '/icons/meeting.svg',
      ai_insight: '/icons/ai-insight.svg'
    }
    return iconMap[type]
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-medium flex items-center justify-between mb-4">
        Team Activity
        <span className="text-sm text-gray-500 font-normal">
          Real-time updates
        </span>
      </h3>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className={`p-3 rounded-lg border ${
                  activity.type === 'ai_insight' 
                    ? 'bg-blue-50 border-blue-100' 
                    : 'bg-white'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={getActivityIcon(activity.type)}
                        alt={activity.type}
                        width={16}
                        height={16}
                      />
                      
                      <p className="text-sm">
                        <span className="font-medium">{activity.user.name}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>

                    {activity.summary && (
                      <p className="text-sm text-blue-600 mt-1">
                        {activity.summary}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

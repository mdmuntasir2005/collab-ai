"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ProjectMetric {
  label: string;
  value: string;
  change: number;
  icon: string;
}

interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'on_track' | 'at_risk' | 'behind';
  dueDate: Date;
  team: { name: string; avatar: string }[];
}

export default function ProjectDashboard() {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const metrics: ProjectMetric[] = [
    {
      label: 'Active Projects',
      value: '12',
      change: 2,
      icon: '/icons/project-active.svg'
    },
    {
      label: 'Tasks Due Today',
      value: '8',
      change: -3,
      icon: '/icons/task-due.svg'
    },
    {
      label: 'Team Productivity',
      value: '87%',
      change: 5,
      icon: '/icons/productivity.svg'
    },
    {
      label: 'AI Insights',
      value: '3',
      change: 1,
      icon: '/icons/ai-insight.svg'
    }
  ];

  const projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      progress: 75,
      status: 'on_track',
      dueDate: new Date('2024-03-15'),
      team: [
        { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' },
        { name: 'Alex Kim', avatar: '/avatars/alex.jpg' }
      ]
    },
    {
      id: '2',
      name: 'Mobile App Development',
      progress: 45,
      status: 'at_risk',
      dueDate: new Date('2024-04-01'),
      team: [
        { name: 'Jamie Wilson', avatar: '/avatars/jamie.jpg' },
        { name: 'Mike Johnson', avatar: '/avatars/mike.jpg' }
      ]
    },
    // Add more projects as needed
  ];

  const getStatusColor = (status: Project['status']) => {
    const colors = {
      on_track: 'bg-green-100 text-green-800',
      at_risk: 'bg-yellow-100 text-yellow-800',
      behind: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusText = (status: Project['status']) => {
    const text = {
      on_track: 'On Track',
      at_risk: 'At Risk',
      behind: 'Behind'
    };
    return text[status];
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedView('grid')}
            className={`p-2 rounded ${
              selectedView === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Image
              src="/icons/grid-view.svg"
              alt="Grid View"
              width={20}
              height={20}
            />
          </button>
          <button
            onClick={() => setSelectedView('list')}
            className={`p-2 rounded ${
              selectedView === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Image
              src="/icons/list-view.svg"
              alt="List View"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white p-4 rounded-lg border shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </div>
              <Image
                src={metric.icon}
                alt={metric.label}
                width={24}
                height={24}
              />
            </div>
            <div className={`mt-2 text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change > 0 ? '+' : ''}{metric.change} from last week
            </div>
          </div>
        ))}
      </div>

      {/* Projects Grid/List */}
      <div className={selectedView === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{project.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex -space-x-2">
                  {project.team.map((member) => (
                    <Image
                      key={member.name}
                      src={member.avatar}
                      alt={member.name}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  Due {project.dueDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

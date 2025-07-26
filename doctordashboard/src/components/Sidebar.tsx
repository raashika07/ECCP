import React, { useState } from 'react';
import {
  Home,
  MessageCircle,
  Calendar,
  Pill,
  Activity,
  User,
  Phone,
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 3 },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'medications', label: 'Medications', icon: Pill },
  { id: 'vitals', label: 'Health Metrics', icon: Activity },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'emergency', label: 'Emergency', icon: Phone },
];

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CareConnect</h1>
            <p className="text-sm text-gray-500">Care Coordination</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            const isEmergency = item.id === 'emergency';
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    isActive
                      ? isEmergency
                        ? 'bg-red-50 text-red-700 border-l-4 border-red-500'
                        : 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : isEmergency
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${isEmergency ? 'text-red-500' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, User, Globe, Volume2, Lock, HelpCircle, LogOut } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const settingsOptions = [
    {
      category: 'Preferences',
      items: [
        {
          label: 'Language',
          icon: Globe,
          submenu: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'German', value: 'de' }
          ]
        },
        {
          label: 'Notifications',
          icon: Bell,
          action: () => setNotifications(!notifications),
          toggle: true,
          value: notifications
        },
        {
          label: 'Sound',
          icon: Volume2,
          action: () => setSoundEnabled(!soundEnabled),
          toggle: true,
          value: soundEnabled
        }
      ]
    },
    {
      category: 'Account',
      items: [
        {
          label: 'Privacy & Security',
          icon: Lock,
          action: () => console.log('Privacy settings')
        },
        {
          label: 'Help & Support',
          icon: HelpCircle,
          action: () => console.log('Help center')
        },
        {
          label: 'Sign Out',
          icon: LogOut,
          action: () => console.log('Sign out'),
          danger: true
        }
      ]
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end space-x-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search appointments, medications, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Notification Icon */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile Icon */}
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <User className="w-6 h-6" />
        </button>

        {/* Settings Icon with Dropdown */}
        <div className="relative" ref={settingsRef}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>

          {/* Settings Dropdown */}
          {showSettings && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {settingsOptions.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="p-4 border-b border-gray-100 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h4>
                    
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-2 last:mb-0">
                        {item.submenu ? (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3 py-2">
                              <item.icon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{item.label}</span>
                            </div>
                            <div className="ml-7 space-y-1">
                              {item.submenu.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={() => handleLanguageChange(subItem.value)}
                                  className={`block w-full text-left text-sm py-1 px-2 rounded ${
                                    language === subItem.value 
                                      ? 'bg-blue-50 text-blue-700' 
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {subItem.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={item.action}
                            className={`w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors ${
                              item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-4 h-4" />
                              <span className="text-sm">{item.label}</span>
                            </div>
                            
                            {item.toggle && (
                              <div className="relative">
                                <div className={`w-11 h-6 rounded-full transition-colors ${
                                  item.value ? 'bg-blue-500' : 'bg-gray-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                    item.value ? 'transform translate-x-5' : ''
                                  }`} />
                                </div>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { MessageSquare, Calendar, Pill, Activity, AlertTriangle, Clock, TrendingUp, Users, FileText, Stethoscope, Heart, Brain, Thermometer, User, Phone, Mail, ChevronRight, Plus, Search, Home, Shield, Baby, Utensils, Bath, Moon } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold text-${color}-600 mt-1`}>{value}</p>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>
      <div className={`p-3 bg-${color}-50 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        <span className="text-sm text-green-600 font-medium">{trend}</span>
      </div>
    )}
  </div>
);

const QuickActionCard = ({ title, description, icon: Icon, color, urgent = false, onClick }: any) => (
  <div 
    className={`p-4 rounded-lg border-2 ${urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'} hover:shadow-md transition-all cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${urgent ? 'bg-red-100' : `bg-${color}-50`}`}>
        <Icon className={`w-5 h-5 ${urgent ? 'text-red-600' : `text-${color}-600`}`} />
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold ${urgent ? 'text-red-900' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm ${urgent ? 'text-red-700' : 'text-gray-600'} mt-1`}>{description}</p>
      </div>
    </div>
  </div>
);

const PatientCard = ({ name, age, condition, lastVisit, status, urgency, room }: any) => (
  <div className="flex items-center space-x-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
      urgency === 'high' ? 'bg-red-100' :
      urgency === 'medium' ? 'bg-yellow-100' :
      'bg-green-100'
    }`}>
      <User className={`w-6 h-6 ${
        urgency === 'high' ? 'text-red-600' :
        urgency === 'medium' ? 'text-yellow-600' :
        'text-green-600'
      }`} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{name}, {age}</h4>
        <span className="text-sm text-gray-500">Room {room}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{condition}</p>
      <p className="text-xs text-gray-500 mt-1">Last check: {lastVisit}</p>
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
        status === 'Critical' ? 'bg-red-100 text-red-800' :
        status === 'Stable' ? 'bg-green-100 text-green-800' :
        status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

const CareTaskCard = ({ task, patient, time, priority, category, completed = false }: any) => (
  <div className={`p-4 rounded-lg border-l-4 ${
    priority === 'high' ? 'border-red-500 bg-red-50' :
    priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
    'border-green-500 bg-green-50'
  } ${completed ? 'opacity-60' : ''}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            priority === 'high' ? 'bg-red-100 text-red-800' :
            priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {priority.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">{category}</span>
          <span className="text-xs text-gray-500">• {time}</span>
        </div>
        <h4 className={`font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-900'} mb-1`}>{task}</h4>
        <p className="text-sm text-gray-700">Patient: {patient}</p>
      </div>
      <div className="ml-4">
        <input 
          type="checkbox" 
          checked={completed}
          className="w-4 h-4 text-blue-600 rounded"
          onChange={() => {}}
        />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const patientsList = [
    {
      name: 'Margaret Smith',
      age: 78,
      condition: 'Post-surgery recovery',
      lastVisit: '2 hours ago',
      status: 'Stable',
      urgency: 'low',
      room: 'A-12'
    },
    {
      name: 'Robert Johnson',
      age: 65,
      condition: 'Diabetes management',
      lastVisit: '4 hours ago',
      status: 'Monitoring',
      urgency: 'medium',
      room: 'B-07'
    },
    {
      name: 'Eleanor Davis',
      age: 82,
      condition: 'Cardiac monitoring',
      lastVisit: '1 hour ago',
      status: 'Critical',
      urgency: 'high',
      room: 'ICU-3'
    },
    {
      name: 'William Brown',
      age: 71,
      condition: 'Physical therapy',
      lastVisit: '6 hours ago',
      status: 'Stable',
      urgency: 'low',
      room: 'C-15'
    }
  ];

  const careTasks = [
    {
      task: 'Medication Administration - Insulin',
      patient: 'Robert Johnson',
      time: '2:00 PM',
      priority: 'high',
      category: 'Medication',
      completed: false
    },
    {
      task: 'Vital Signs Check',
      patient: 'Eleanor Davis',
      time: '2:30 PM',
      priority: 'high',
      category: 'Monitoring',
      completed: false
    },
    {
      task: 'Assistance with Meals',
      patient: 'Margaret Smith',
      time: '5:30 PM',
      priority: 'medium',
      category: 'Daily Care',
      completed: false
    },
    {
      task: 'Physical Therapy Session',
      patient: 'William Brown',
      time: '3:00 PM',
      priority: 'medium',
      category: 'Therapy',
      completed: false
    },
    {
      task: 'Evening Medication Round',
      patient: 'All Patients',
      time: '8:00 PM',
      priority: 'high',
      category: 'Medication',
      completed: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header - Enhanced for Caregiver View */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Morning, Sarah</h1>
          <p className="text-gray-600 mt-1">Welcome to your caregiver dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Search className="w-4 h-4" />
            <span>Find Patient</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'patients', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'patients' && 'My Patients'}
              {tab === 'tasks' && 'Care Tasks'}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Patients"
          value="12"
          subtitle="4 need immediate care"
          icon={Users}
          color="blue"
          trend="+2 this week"
        />
        <StatCard
          title="Today's Tasks"
          value="8"
          subtitle="3 completed"
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Medication Rounds"
          value="3"
          subtitle="Next: 2:00 PM"
          icon={Pill}
          color="purple"
        />
        <StatCard
          title="Alerts"
          value="2"
          subtitle="1 high priority"
          icon={AlertTriangle}
          color="red"
          trend="New today"
        />
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Today's Care Schedule</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="flex-shrink-0">
                    <Pill className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Medication Round</h3>
                    <p className="text-gray-600">Insulin administration for Robert Johnson</p>
                    <p className="text-sm text-red-600 font-medium">2:00 PM - URGENT</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-shrink-0">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Vital Signs Check</h3>
                    <p className="text-gray-600">Monitor Eleanor Davis - cardiac patient</p>
                    <p className="text-sm text-blue-600 font-medium">2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-shrink-0">
                    <Utensils className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Meal Assistance</h3>
                    <p className="text-gray-600">Help Margaret Smith with dinner</p>
                    <p className="text-sm text-green-600 font-medium">5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Enhanced for Caregivers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <QuickActionCard
                title="Emergency Call"
                description="Contact emergency services"
                icon={Phone}
                color="red"
                urgent={true}
              />
              <QuickActionCard
                title="Medication Administration"
                description="Record medication given"
                icon={Pill}
                color="blue"
              />
              <QuickActionCard
                title="Vital Signs Entry"
                description="Log patient vitals"
                icon={Heart}
                color="green"
              />
              <QuickActionCard
                title="Daily Care Log"
                description="Update care activities"
                icon={FileText}
                color="purple"
              />
              <QuickActionCard
                title="Family Contact"
                description="Call patient's family"
                icon={Phone}
                color="indigo"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'patients' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Assigned Patients</h2>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Patients</option>
                  <option>High Priority</option>
                  <option>Stable</option>
                  <option>Critical</option>
                  <option>New Admissions</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Schedule</button>
              </div>
            </div>
          </div>
          <div>
            {patientsList.map((patient, index) => (
              <PatientCard key={index} {...patient} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Today's Care Tasks</h2>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Tasks</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>High Priority</option>
                  </select>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Mark All Complete</button>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {careTasks.map((task, index) => (
                <CareTaskCard key={index} {...task} />
              ))}
            </div>
          </div>

          {/* Care Guidelines */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Care Guidelines Reminder</h3>
                <p className="text-gray-700 mb-4">
                  Remember to wash hands between patients, check medication labels twice, and document all care activities. 
                  If you notice any changes in patient condition, report immediately to the nursing supervisor.
                </p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">View Full Guidelines</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity - Always Visible */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Care Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Medication given to Robert Johnson - Insulin</p>
                <p className="text-sm text-gray-500">Administered 1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Vitals recorded for Eleanor Davis: BP 118/76, HR 72</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Utensils className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Assisted Margaret Smith with lunch</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Bath className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Personal care assistance provided to William Brown</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
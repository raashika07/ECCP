import React, { useState } from 'react';
import { MessageSquare, Calendar, Pill, Activity, AlertTriangle, Clock, TrendingUp, Users, FileText, Stethoscope, Heart, Brain, Thermometer, User, Phone, Mail, ChevronRight, Plus, Search } from 'lucide-react';

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

const PatientHistoryItem = ({ date, type, description, provider, status }: any) => (
  <div className="flex items-start space-x-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      type === 'appointment' ? 'bg-blue-100' :
      type === 'medication' ? 'bg-green-100' :
      type === 'test' ? 'bg-purple-100' :
      type === 'emergency' ? 'bg-red-100' : 'bg-gray-100'
    }`}>
      {type === 'appointment' && <Calendar className="w-5 h-5 text-blue-600" />}
      {type === 'medication' && <Pill className="w-5 h-5 text-green-600" />}
      {type === 'test' && <Activity className="w-5 h-5 text-purple-600" />}
      {type === 'emergency' && <AlertTriangle className="w-5 h-5 text-red-600" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{description}</h4>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">Provider: {provider}</p>
      {status && (
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
          status === 'Critical' ? 'bg-red-100 text-red-800' :
          status === 'Normal' ? 'bg-green-100 text-green-800' :
          status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )}
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

const MedicalAdviceCard = ({ title, advice, priority, category }: any) => (
  <div className={`p-4 rounded-lg border-l-4 ${
    priority === 'high' ? 'border-red-500 bg-red-50' :
    priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
    'border-green-500 bg-green-50'
  }`}>
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
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-700">{advice}</p>
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const patientHistory = [
    {
      date: 'Dec 20, 2024',
      type: 'appointment',
      description: 'Cardiology Follow-up',
      provider: 'Dr. Johnson',
      status: 'Normal'
    },
    {
      date: 'Dec 15, 2024',
      type: 'test',
      description: 'Blood Work - Lipid Panel',
      provider: 'Lab Corp',
      status: 'Follow-up'
    },
    {
      date: 'Dec 10, 2024',
      type: 'medication',
      description: 'Lisinopril Prescription Updated',
      provider: 'Dr. Johnson',
      status: 'Active'
    },
    {
      date: 'Nov 28, 2024',
      type: 'emergency',
      description: 'Chest Pain - ER Visit',
      provider: 'General Hospital',
      status: 'Critical'
    }
  ];

  const medicalAdvice = [
    {
      title: 'Blood Pressure Monitoring',
      advice: 'Patient shows elevated readings. Recommend daily monitoring and consider medication adjustment.',
      priority: 'high',
      category: 'Cardiovascular'
    },
    {
      title: 'Medication Compliance',
      advice: 'Patient has missed 2 doses this week. Schedule medication review and consider pill organizer.',
      priority: 'medium',
      category: 'Pharmacy'
    },
    {
      title: 'Exercise Program',
      advice: 'Current activity levels are good. Continue with physical therapy and add 10-minute walks.',
      priority: 'low',
      category: 'Wellness'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header - Enhanced for Doctor View */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Morning, Dr. Johnson</h1>
          <p className="text-gray-600 mt-1">Welcome to your clinical dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Search className="w-4 h-4" />
            <span>Search Records</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'history', 'advice'].map((tab) => (
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
              {tab === 'history' && 'Patient History'}
              {tab === 'advice' && 'Medical Advice'}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value="3"
          subtitle="Next: Today 2:00 PM"
          icon={Calendar}
          color="blue"
          trend="+1 this week"
        />
        <StatCard
          title="Active Medications"
          value="7"
          subtitle="2 require monitoring"
          icon={Pill}
          color="green"
        />
        <StatCard
          title="Unread Messages"
          value="5"
          subtitle="3 from patient"
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Risk Score"
          value="6.2"
          subtitle="Moderate risk"
          icon={Activity}
          color="yellow"
          trend="-0.3 points"
        />
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Cardiology Follow-up</h3>
                    <p className="text-gray-600">Review recent test results and medication adjustment</p>
                    <p className="text-sm text-blue-600 font-medium">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-shrink-0">
                    <Pill className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Medication Review</h3>
                    <p className="text-gray-600">Blood pressure medication effectiveness</p>
                    <p className="text-sm text-green-600 font-medium">6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <div className="flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Care Team Meeting</h3>
                    <p className="text-gray-600">Discuss treatment plan with PT and pharmacist</p>
                    <p className="text-sm text-purple-600 font-medium">4:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Enhanced for Doctors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <QuickActionCard
                title="Emergency Protocol"
                description="Initiate emergency response"
                icon={AlertTriangle}
                color="red"
                urgent={true}
              />
              <QuickActionCard
                title="Order Lab Tests"
                description="Request new laboratory work"
                icon={Activity}
                color="blue"
              />
              <QuickActionCard
                title="Prescription Management"
                description="Update or prescribe medications"
                icon={Pill}
                color="green"
              />
              <QuickActionCard
                title="Referral System"
                description="Refer to specialists"
                icon={Users}
                color="purple"
              />
              <QuickActionCard
                title="Clinical Notes"
                description="Add progress notes"
                icon={FileText}
                color="indigo"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Patient History</h2>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Records</option>
                  <option>Appointments</option>
                  <option>Medications</option>
                  <option>Lab Results</option>
                  <option>Emergency Visits</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Export</button>
              </div>
            </div>
          </div>
          <div>
            {patientHistory.map((item, index) => (
              <PatientHistoryItem key={index} {...item} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'advice' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Clinical Recommendations</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Generate Report</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {medicalAdvice.map((advice, index) => (
                <MedicalAdviceCard key={index} {...advice} />
              ))}
            </div>
          </div>

          {/* AI-Powered Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">AI Clinical Insights</h3>
                <p className="text-gray-700 mb-4">
                  Based on recent vitals and medication adherence patterns, the patient shows improved cardiovascular stability. 
                  Consider gradually reducing monitoring frequency and discuss lifestyle modifications during next visit.
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Detailed Analysis</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity - Always Visible */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Clinical Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Lisinopril 10mg - Patient compliant</p>
                <p className="text-sm text-gray-500">Documented 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Vitals recorded: BP 125/82, HR 68</p>
                <p className="text-sm text-gray-500">4 hours ago by nursing staff</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Progress note added by Dr. Johnson</p>
                <p className="text-sm text-gray-500">Yesterday, 3:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
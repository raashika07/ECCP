import React from 'react';
import { MessageSquare, Calendar, Pill, Activity, AlertTriangle, Clock, TrendingUp, Users } from 'lucide-react';

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

const QuickActionCard = ({ title, description, icon: Icon, color, urgent = false }: any) => (
  <div className={`p-4 rounded-lg border-2 ${urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'} hover:shadow-md transition-all cursor-pointer`}>
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

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header - Simplified */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Good Morning, Margaret</h1>
        <p className="text-gray-600 mt-1">Here's your care summary for today</p>
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
          title="Medications Due"
          value="2"
          subtitle="Blood pressure pills"
          icon={Pill}
          color="green"
        />
        <StatCard
          title="Unread Messages"
          value="5"
          subtitle="From care team"
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Health Score"
          value="92"
          subtitle="Excellent condition"
          icon={Activity}
          color="emerald"
          trend="+3 points"
        />
      </div>

      {/* Main Content Grid */}
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
                  <h3 className="font-semibold text-gray-900">Dr. Johnson Appointment</h3>
                  <p className="text-gray-600">Regular checkup - Cardiology</p>
                  <p className="text-sm text-blue-600 font-medium">2:00 PM - 3:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex-shrink-0">
                  <Pill className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Medication Reminder</h3>
                  <p className="text-gray-600">Blood pressure medication</p>
                  <p className="text-sm text-green-600 font-medium">6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Physical Therapy</h3>
                  <p className="text-gray-600">Session with Sarah Thompson</p>
                  <p className="text-sm text-purple-600 font-medium">4:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <QuickActionCard
              title="Emergency Alert"
              description="Contact emergency services"
              icon={AlertTriangle}
              color="red"
              urgent={true}
            />
            <QuickActionCard
              title="Message Care Team"
              description="Send a message to your care team"
              icon={MessageSquare}
              color="blue"
            />
            <QuickActionCard
              title="Log Vitals"
              description="Record blood pressure, weight, etc."
              icon={Activity}
              color="green"
            />
            <QuickActionCard
              title="Medication Log"
              description="Mark medications as taken"
              icon={Pill}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Blood pressure medication taken</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Blood pressure logged: 120/80</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Message from Dr. Johnson</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
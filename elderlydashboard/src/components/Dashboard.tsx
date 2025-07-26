import React, { useState } from 'react';
import { MessageSquare, Calendar, Pill, Activity, AlertTriangle, Clock, TrendingUp, Users, FileText, Stethoscope, Heart, Brain, Thermometer, User, Phone, Mail, ChevronRight, Plus, Search, Star, MapPin } from 'lucide-react';

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

const DoctorCard = ({ name, specialty, location, distance, nextAvailable }: any) => (
  <div className="flex items-start space-x-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
      <User className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{name}</h4>
      </div>
      <p className="text-sm text-blue-600 font-medium mt-1">{specialty}</p>
      <p className="text-sm text-gray-600 mt-1">{location} • {distance}</p>
      <span className="text-sm text-green-600 font-medium">Next available: {nextAvailable}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

const AppointmentCard = ({ date, time, doctor, specialty, type, location, status }: any) => (
  <div className="flex items-start space-x-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      type === 'checkup' ? 'bg-green-100' :
      type === 'specialist' ? 'bg-blue-100' :
      type === 'followup' ? 'bg-purple-100' :
      'bg-gray-100'
    }`}>
      {type === 'checkup' && <Heart className="w-5 h-5 text-green-600" />}
      {type === 'specialist' && <Stethoscope className="w-5 h-5 text-blue-600" />}
      {type === 'followup' && <Activity className="w-5 h-5 text-purple-600" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{doctor}</h4>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{specialty}</p>
      <p className="text-sm text-gray-600">{time} • {location}</p>
      {status && (
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
          status === 'confirmed' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status === 'confirmed' ? 'Confirmed' : status === 'pending' ? 'Pending' : status}
        </span>
      )}
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const recommendedDoctors = [
    {
      name: 'Dr. Sarah Williams',
      specialty: 'Family Medicine',
      location: 'Chennai Medical Center',
      distance: '2.5 km away',
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      location: 'Heart Care Clinic',
      distance: '3.2 km away',
      nextAvailable: 'Friday 2:00 PM'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Geriatrics',
      location: 'Senior Care Hospital',
      distance: '1.8 km away',
      nextAvailable: 'Monday 11:00 AM'
    },
    {
      name: 'Dr. Anil Reddy',
      specialty: 'Orthopedics',
      location: 'Bone & Joint Clinic',
      distance: '4.1 km away',
      nextAvailable: 'Next Week'
    }
  ];

  const upcomingAppointments = [
    {
      date: 'Tomorrow',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Williams',
      specialty: 'Family Medicine - Regular Checkup',
      type: 'checkup',
      location: 'Chennai Medical Center',
      status: 'confirmed'
    },
    {
      date: 'Dec 30, 2024',
      time: '2:00 PM',
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology - Heart Health Review',
      type: 'specialist',
      location: 'Heart Care Clinic',
      status: 'confirmed'
    },
    {
      date: 'Jan 3, 2025',
      time: '11:00 AM',
      doctor: 'Dr. Priya Sharma',
      specialty: 'Geriatrics - Follow-up Visit',
      type: 'followup',
      location: 'Senior Care Hospital',
      status: 'pending'
    },
    {
      date: 'Jan 8, 2025',
      time: '9:00 AM',
      doctor: 'Dr. Anil Reddy',
      specialty: 'Orthopedics - Knee Assessment',
      type: 'specialist',
      location: 'Bone & Joint Clinic',
      status: 'confirmed'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header - Elderly Version */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Morning, Mr. Patel</h1>
          <p className="text-gray-600 mt-1">Your health dashboard is ready</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Phone className="w-4 h-4" />
            <span>Emergency</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'doctors', 'appointments'].map((tab) => (
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
              {tab === 'doctors' && 'Recommended Doctors'}
              {tab === 'appointments' && 'Upcoming Appointments'}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Next Appointment"
          value="Tomorrow"
          subtitle="10:00 AM with Dr. Williams"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Daily Medications"
          value="3"
          subtitle="All taken today"
          icon={Pill}
          color="green"
          trend="100% compliance"
        />
        <StatCard
          title="Health Score"
          value="85"
          subtitle="Very Good"
          icon={Heart}
          color="purple"
          trend="+5 points"
        />
        <StatCard
          title="Emergency Contacts"
          value="4"
          subtitle="Family & doctors"
          icon={Phone}
          color="orange"
        />
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Health Summary */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Today's Health Summary</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-shrink-0">
                    <Pill className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Medications Taken</h3>
                    <p className="text-gray-600">All 3 medications taken on time today</p>
                    <p className="text-sm text-green-600 font-medium">Next dose: Evening 7:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-shrink-0">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Daily Activity</h3>
                    <p className="text-gray-600">30 minutes of walking completed</p>
                    <p className="text-sm text-blue-600 font-medium">Goal achieved! Keep it up</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <div className="flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Vitals Check</h3>
                    <p className="text-gray-600">Blood pressure: 125/80 mmHg recorded this morning</p>
                    <p className="text-sm text-purple-600 font-medium">Within normal range</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Health Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <QuickActionCard
                title="Emergency Help"
                description="Call for immediate assistance"
                icon={AlertTriangle}
                color="red"
                urgent={true}
              />
              <QuickActionCard
                title="Medication Reminder"
                description="View today's medicines"
                icon={Pill}
                color="green"
              />
              <QuickActionCard
                title="Call Family"
                description="Contact your loved ones"
                icon={Phone}
                color="blue"
              />
              <QuickActionCard
                title="Health Records"
                description="View your medical history"
                icon={FileText}
                color="purple"
              />
              <QuickActionCard
                title="Video Call Doctor"
                description="Connect with your physician"
                icon={Stethoscope}
                color="indigo"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recommended Doctors</h2>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Specialties</option>
                  <option>Family Medicine</option>
                  <option>Cardiology</option>
                  <option>Geriatrics</option>
                  <option>Orthopedics</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Search</button>
              </div>
            </div>
          </div>
          <div>
            {recommendedDoctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Schedule New</button>
            </div>
          </div>
          <div>
            {upcomingAppointments.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Health Activity - Always Visible */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Health Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Morning medications taken successfully</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Blood pressure recorded: 125/80 mmHg</p>
                <p className="text-sm text-gray-500">This morning, 8:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Completed 30-minute walk in the park</p>
                <p className="text-sm text-gray-500">Yesterday, 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
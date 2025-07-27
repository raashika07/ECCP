import React from 'react';
import ElderlyView from './ElderlyView';
import CaregiverDashboard from './CaregiverDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminPanel from './AdminPanel';

const Dashboard: React.FC = () => {
  const role = localStorage.getItem('role');

  return (
    <>
      {role === 'elderly' && <ElderlyView />}
      {role === 'caregiver' && <CaregiverDashboard />}
      {role === 'doctor' && <DoctorDashboard />}
      {role === 'admin' && <AdminPanel />}
    </>
  );
};

export default Dashboard;
const role = localStorage.getItem('role');



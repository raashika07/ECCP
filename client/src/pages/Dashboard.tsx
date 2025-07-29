import React from 'react';
import ElderlyView from './ElderlyView';
import CaregiverDashboard from './CaregiverDashboard';
import DoctorDashboard from './DoctorDashboard';

const Dashboard: React.FC = () => {
  const role = localStorage.getItem('role');

  return (
    <>
      {role === 'elderly' && <ElderlyView />}
      {role === 'caregiver' && <CaregiverDashboard />}
      {role === 'doctor' && <DoctorDashboard />}
    </>
  );
};

export default Dashboard;
const role = localStorage.getItem('role');



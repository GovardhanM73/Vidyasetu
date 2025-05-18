import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardTeacher from './DashboardTeacher';
import DashboardStudent from './DashboardStudent';

function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'teacher') {
    return <DashboardTeacher />;
  }

  return <DashboardStudent />;
}

export default Dashboard;
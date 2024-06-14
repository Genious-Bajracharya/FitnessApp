"use client"
import React from 'react';
import ProgressChart from '../components/progressChart';

const Dashboard: React.FC = () => {
  const userId=localStorage.getItem('userId')
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ProgressChart userId={Number(userId)} />
    </div>
  );
};

export default Dashboard;

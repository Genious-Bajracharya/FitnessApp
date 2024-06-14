"use client"
import React, { useEffect, useState } from 'react';
import GoalForm from '../components/goalform';

const GoalsPage: React.FC = () => {
  const [goalsUpdated, setGoalsUpdated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(()=>{
    setUserId(localStorage.getItem('userId'))
  },[])


  const handleGoalCreated = () => {
    setGoalsUpdated(!goalsUpdated);
  };

  if(!userId){
    return <div>loading....</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Set Your Goals</h1>
      <GoalForm userId={Number(userId)} onGoalCreated={handleGoalCreated} />
    </div>
  );
};

export default GoalsPage;

"use client"
import React, { useState } from 'react';
import GoalsTable from '../components/showgoals';
import { useEffect } from 'react';

const GoalsPage: React.FC = () => {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(()=>{
    setUserId(localStorage.getItem('userId'))
  },[])

  if(!userId){
    return <div>loading....</div>
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Set Your Goals</h1>
      <GoalsTable  userId={Number(userId)} />
    </div>
  );
};

export default GoalsPage;

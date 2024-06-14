"use client"
import React, { useEffect, useState } from 'react';
import { setAuthToken } from '../api';
import CreateWorkout from '../components/createworkout';
import UserWorkouts from '../components/showWorkouts';

interface User {
  id: number;
  token: string;
}

const MainComponent: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(()=>{
    setUserId(localStorage.getItem('userId'))
  },[])

  return (
    <div className=' p-10'>
      <CreateWorkout userId={Number(userId)} />
    </div>
  );
};

export default MainComponent;
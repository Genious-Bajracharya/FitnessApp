"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import DisplayWorkouts from '../components/showWorkouts';
import { Button } from '@/components/ui/button';
import { useEffect,useState } from 'react';

export default function Workout(){
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(()=>{
    setUserId(localStorage.getItem('userId'))
  },[])
  const router=useRouter()

  if(!userId){
    return <div>loading..</div>
  }
  return(
    <>
    <div className='flex justify-center gap-3 p-28'> 
      <DisplayWorkouts userId={Number(userId)} /> 
      <Button  onClick={()=>router.push('../createworkout')}>Start Workout</Button>
    </div>
    
    </>
  )
}
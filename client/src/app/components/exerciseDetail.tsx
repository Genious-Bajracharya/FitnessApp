"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { getExerciseById } from '../api';

interface Exercise {
  id: number;
  name: string;
  description: string;
}

const ExerciseDetail: React.FC = () => {
  const params = useParams(); 
  const { exerciseId } = params; // Destructure exerciseId from params
  const [exercise, setExercise] = useState<Exercise | null>(null);
  

  useEffect(() => {
    const fetchExercise = async () => {
      if (exerciseId) { 
        const data = await getExerciseById(Number(exerciseId)); 
        setExercise(data);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{exercise.name}</h1>
      <p>{exercise.description}</p>
    </div>
  );
};

export default ExerciseDetail;


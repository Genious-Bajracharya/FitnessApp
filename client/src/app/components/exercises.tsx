"use client"
import React, { useEffect, useState } from 'react';
import { getExercises } from '../api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Exercise {
    id: number;
    name: string;
    description: string;
  }

const ExerciseList: React.FC = () => {
  const router=useRouter()
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (error) {
        setError('Failed to fetch exercises');
      }
    };

    fetchExercises();
  }, []);
  console.log(exercises)
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" min-h-screen p-8">
    <h1 className="text-center font-bold text-4xl text-blue-950 mb-12">Exercises</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className=" bg-gray-100 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
          onClick={() => router.push(`/exercises/${exercise.id}`)}
        >
          <h2 className="text-xl font-semibold text-blue-950 mb-2">{exercise.name}</h2>
          <p className="text-gray-400">Click to learn more</p>
        </div>
      ))}
    </div>
  </div>
    );


  };

export default ExerciseList;

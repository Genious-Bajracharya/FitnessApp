
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api, { getExercises } from '../api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface GoalFormProps {
  userId: number;
  onGoalCreated: () => void;
}

interface Exercise {
    id: number;
    name: string;
  }

const GoalForm: React.FC<GoalFormProps> = ({ userId, onGoalCreated }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [targetWeight, setTargetWeight] = useState<number | null>(null);
  const {toast}=  useToast();
  const router =useRouter();


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data =  await getExercises();
        setExercises(data);
      } catch (error) {
        console.log('Failed to fetch exercises');
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (exerciseId && targetWeight) {
        const authToken = localStorage.getItem("authToken");
      await api.post('/goals', {
        userId,
        exerciseId,
        targetWeight,
      },{headers:{Authorization: `Bearer ${authToken}`,}});
      toast({
        title: "Goal",
        description: "Goal set Successfull",
      })
      router.push('/goals');

      onGoalCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise</label>
        <select
          onChange={(e) => setExerciseId(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
        <input
          type="number"
          value={targetWeight || ''}
          onChange={(e) => setTargetWeight(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Set Goal
      </button>
    </form>
  );
};

export default GoalForm;

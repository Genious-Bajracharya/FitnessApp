"use client"
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface Workout {
  workoutDate: string;
  exercises: {
    sets: number;
    reps: number;
    weight: number;
  }[];
}

interface Chartprops{
  userId: number
}

const ProgressChart: React.FC<Chartprops> = ({userId}) => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('authToken');
      

      try {
        const response = await api.get(`/workouts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkoutData(response.data);
      } catch (error) {
        console.error('Failed to fetch workouts', error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (workoutData.length > 0) {
      const dates = workoutData.map(workout => new Date(workout.workoutDate).toLocaleDateString());
      const weights = workoutData.map(workout => 
        workout.exercises.reduce((total, exercise) => total + (exercise.weight * exercise.reps * exercise.sets), 0)
        
      );

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Weight Lifted (kg)',
            data: weights,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: true,
          },
        ],
      });
    }
  }, [workoutData]);

  return (
    <div className=" max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Progress</h2>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ProgressChart;

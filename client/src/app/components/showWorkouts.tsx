import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Workout {
  id: number;
  workoutDate: string;
  exercises: {
    id: number;
    exercise: {
      name: string;
    };
    sets: number;
    reps: number;
    weight: number;
  }[];
}

const DisplayWorkouts: React.FC<{ userId: number }> = ({ userId }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5000/api/workouts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWorkouts(response.data);
        console.log(response.data)
      }
        catch (error) {
        console.error('Failed to fetch workouts', error);
      }
    };

    fetchWorkouts();
  }, [userId]);

  return (
    <div className="workouts-container p-6 bg-gray-50 min-h-screen">
  <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">My Workouts</h2>
  {workouts.map((workout) => (
    <div key={workout.id} className="workout mb-8 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {new Date(workout.workoutDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h3>
      <div className="space-y-4">
        {workout.exercises.map((exercise) => (
          <div key={exercise.id} className="flex justify-between items-center bg-gray-100 p-6 rounded-md">
            <strong className="text-lg font-medium text-gray-700">{exercise.exercise?.name}</strong>
            <span className="text-gray-600">{exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} kg</span>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

  

  );
};

export default DisplayWorkouts;

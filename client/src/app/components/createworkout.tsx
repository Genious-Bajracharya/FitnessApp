import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api,{getExercises} from '../api';
import { useToast } from '@/components/ui/use-toast';

interface ExerciseForm {
  exerciseId: number;
  sets: number;
  reps: number;
  weight: number;
}

interface Exercise {
  id: number;
  name: string;
}

interface CreateWorkoutProps{
  userId: number;
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({userId}) => {
  const router = useRouter();
  const [workoutDate, setWorkoutDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseForms, setExerciseForms] = useState<ExerciseForm[]>([]);
  const {toast}=useToast()
  // const [authToken, setAuthToken] = useState<string | null>(null);
//   const [userId, setUserId] = useState<number | null>(1);
  // const userId=1;

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

  //understand.....
  const handleAddExerciseForm = () => {
    setExerciseForms([...exerciseForms, { exerciseId: 0, sets: 0, reps: 0, weight: 0 }]);
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updatedForms = [...exerciseForms];
    updatedForms[index] = { ...updatedForms[index], [name]: Number(value) };
    setExerciseForms(updatedForms);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const authToken=localStorage.getItem('authToken')
    
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      
      const response = await api.post('/workouts', {
        userId,
        workoutDate,
        exercises: exerciseForms
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 201) {
        
        router.push('/workouts');
        toast({
          title: "workout",
          description: "Workout Session saved Successfuly",
        })
      }
    } catch (error) {
      console.error('Failed to create workout', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Workout Date</label>
          <input
            type="date"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        {exerciseForms.map((form, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Exercise</label>
            <select
              name="exerciseId"
              value={form.exerciseId}
              onChange={(e) => handleInputChange(index, e)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-700 mt-2">Sets</label>
            <input
              type="number"
              name="sets"
              value={form.sets}
              onChange={(e) => handleInputChange(index, e)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">Reps</label>
            <input
              type="number"
              name="reps"
              value={form.reps}
              onChange={(e) => handleInputChange(index, e)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={(e) => handleInputChange(index, e)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleAddExerciseForm}
            className=" text-white p-2 rounded-md mr-2"
          >
            Add Exercise
          </Button>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Save Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkout;
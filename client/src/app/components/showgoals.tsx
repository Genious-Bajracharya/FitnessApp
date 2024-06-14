import React, { useEffect, useState } from 'react';
import api from '../api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Goal {
  id: number;
  exercise: {
    name: string;
  };
  targetWeight: number;
  status: string;
}

interface GoalsTableProps {
  userId: number;
}

const GoalsTable: React.FC<GoalsTableProps> = ({ userId }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  
  const [updateGoalId, setUpdateGoalId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [newWeight, setNewWeight] = useState<number | null>(null);
  const router=useRouter()

  useEffect(() => {
    const authToken =localStorage.getItem("authToken")
    try{
        const fetchgoals = async ()=>{
            const res=await api.get(`/goals/${userId}`,{headers: {
                Authorization: `Bearer ${authToken}`,
              },})
              setGoals(res.data)
              
        } 
        fetchgoals()
    }catch(err){
        console.log(err)
    }
    

  }, [userId]);

  const updateGoalStatus = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await api.put(
          `/goals/status/${id}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === id ? { ...goal, status: newStatus } : goal
          )
        );
      } catch (error) {
        console.error('Failed to update goal status:', error);
      }
    }
  };

  const updateGoalWeight = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (token && newWeight !== null) {
      try {
        await api.put(
          `/goals/weight/${id}`,
          { targetWeight: newWeight },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === id ? { ...goal, targetWeight: newWeight } : goal
          )
        );
      } catch (error) {
        console.error('Failed to update goal weight:', error);
      }
    }
  };

 
  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
        <Button onClick={()=> router.push('../setgoal')}>Set new Goals</Button>
        </div>
      
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Exercise</th>
            <th className="px-4 py-2">Target Weight</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.id}>
              <td className="border px-4 py-2">{goal.exercise.name}</td>
              <td className="border px-4 py-2">{goal.targetWeight} kg</td>
              <td className="border px-4 py-2">{goal.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    setUpdateGoalId(goal.id);
                    setNewStatus(goal.status === 'pending' ? 'achieved' : 'pending');
                  }}
                >
                  Toggle Status
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setUpdateGoalId(goal.id);
                    setNewWeight(goal.targetWeight);
                  }}
                >
                  Update Weight
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateGoalId && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Update Goal</h3>
          <div className="mb-2">
            <label className="block mb-1">Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="pending">Pending</option>
              <option value="achieved">Achieved</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => updateGoalStatus(updateGoalId)}
          >
            Update Status
          </button>
          <div className="mb-2 mt-4">
            <label className="block mb-1">Weight:</label>
            <input
              type="number"
              value={newWeight || ''}
              onChange={(e) => setNewWeight(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => updateGoalWeight(updateGoalId)}
          >
            Update Weight
          </button>
        </div>
      )}
    </div>
  );
};


export default GoalsTable;

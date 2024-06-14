"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {  useRouter } from 'next/navigation';




const RegistrationForm = () => {
  const { toast } = useToast()
  const router =useRouter();
  const [formData, setFormData] = useState<UserData>({
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast({
        title: "Signup",
        description: "Signup Successfull",
      })
      router.push('/login');

      
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Signup error please try again",
      })
      
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-900 to-teal-900 p-8">
      <div className="h-auto w-full max-w-lg rounded-xl bg-gray-800 p-8 shadow-xl relative">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Register at Fitnessfreakz</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input 
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" 
            type="text" 
            name="userName" 
            placeholder="Username" 
            value={formData.userName} 
            onChange={handleChange} 
          />
          <Input 
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <Input 
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          <Button 
            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300" 
            type="submit"
          >
            Register
          </Button>
        </form>
        <div className="mt-4 text-center">
            <Button variant='link' onClick={()=>router.push('../login')} className="text-sm text-indigo-400 hover:underline">Already have an account?</Button>
          </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

interface UserData {
  userName: string;
  email: string;
  password: string;
}

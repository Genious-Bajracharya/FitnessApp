"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from '../api';
import { useRouter } from 'next/navigation';

interface LoginData {
    userName: string;
    password: string;
  }

 const LoginForm = () => {
    const { toast } = useToast()
    const router = useRouter();

    const [formData, setFormData] = useState<LoginData>({
      
      userName: '',
      password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await loginUser(formData);
          toast({
            title: "Login",
            description: "Login Successfull",
          })
          
        localStorage.setItem('authToken', response.accessToken);
      
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', response.role);
        console.log(response)


      
        router.push('/'); 
          
        } catch (error) {
          console.error('Registration failed:', error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Login error please try again",
          })
          
        }
      };
      return(
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 p-8">
        <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-8">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8">Fitnessfreakz</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
              type="text" 
              name="userName" 
              placeholder="Username" 
              value={formData.userName} 
              onChange={handleChange} 
            />
            <Input 
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
            />
            <Button 
              className="w-full py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition duration-300" 
              type="submit"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant='link' onClick={()=>router.push('../Register')} className="text-sm text-indigo-400 hover:underline">Dont have an account?</Button>
          </div>
        </div>
      </div>
      
      )
      
}

export default LoginForm;


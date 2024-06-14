'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '../api';
import { Button } from '@/components/ui/button';
import { Toast } from '@radix-ui/react-toast';
import { useToast } from '@/components/ui/use-toast';

const LogoutButton = () => {
  const router = useRouter();
  const {toast}= useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      toast({
        
        title: "SignOut.",
        description: "Logout Successful!",
      })
      router.push('/login'); 
      

      
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Logout error please try again",
          })
      console.error('Logout failed:', error);
    }
  };

  return <div onClick={handleLogout}>Logout</div>;//
};

export default LogoutButton;

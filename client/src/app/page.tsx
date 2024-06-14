"use client"
import { Button } from "@/components/ui/button";
import { link } from "fs";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import refreshAuthToken from "./components/refreshtoken";
import startTokenRefresh from "./components/tokentimer";
import ExerciseList from "./components/exercises";
import Footer from "./components/Footer";



export default function Home() {

  useEffect(() => {
    startTokenRefresh();
  }, []);
  
  const router = useRouter()
  return (
    <>
      <div className="bg-[url('https://as2.ftcdn.net/v2/jpg/06/08/15/95/1000_F_608159569_F8wmT73HkeGgcWWGvlAEG4cioFffGCMl.jpg')] font-serif relative h-[70vh] bg-cover bg-center flex items-end">
        <div className="p-8">
          <div className="text-7xl font-medium text-white">Fitness Freaks</div>
          <div className="text-white">How Much Can You Bench!!</div>
          <Button className=" bg-yellow-400 text-blue-950 hover:text-white my-5" onClick={()=> router.push('/Register')}>Start Your Journey</Button>
          <div className="text-white">Already have an account? <Button onClick={()=>router.push('/login')} className="text-yellow-400 hover:text-white" variant='link'>Login</Button></div>
        </div>
      </div>

      {/*  */}
      <div className="features py-16 text-blue-950">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="feature text-center p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Personalized Plans</h2>
      <p>Get a workout plan tailored to your goals and preferences.</p>
    </div>
    <div className="feature text-center p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
      <p>Monitor your workouts and see your progress over time.</p>
    </div>
    <div className="feature text-center p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Community Support</h2>
      <p>Join a community of fitness enthusiasts for support and motivation.</p>
    </div>
  </div>
</div>
{/*  */}
<div className="testimonials py-16  text-blue-950">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="testimonial p-6 bg-gray-200 rounded-lg shadow-lg">
        <p className="mb-4">This app changed my life! The personalized plans are amazing.</p>
        <h3 className="font-bold">- John Doe</h3>
      </div>
      <div className="testimonial p-6 bg-gray-200 rounded-lg shadow-lg">
        <p className="mb-4">I love the community support. It keeps me motivated.</p>
        <h3 className="font-bold">- Jane Smith</h3>
      </div>
      <div className="testimonial p-6 bg-gray-200 rounded-lg shadow-lg">
        <p className="mb-4">Tracking my progress has never been easier.</p>
        <h3 className="font-bold">- Chris Johnson</h3>
      </div>
    </div>
  </div>
</div>
{/*  */}
<div className="bg-gray-50 py-24 px-10 md:px-20">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-4">Campaigns</h1>
    <p className="text-lg text-gray-600">
    Strength does not come from the physical capacity. It comes from an indomitable will
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg"
        alt="Campaign 1"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Gym</h2>
        <p className="text-gray-700 mb-4">
        Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity...        </p>
        <div className="flex items-center text-blue-600 cursor-pointer">
          <p>Learn more</p>
          
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg"
        alt="Campaign 2"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Cardio</h2>
        <p className="text-gray-700 mb-4">
        Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity...        </p>
        <div className="flex items-center text-blue-600 cursor-pointer">
          <p>Learn more</p>
          
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg"
        alt="Campaign 3"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Fitness</h2>
        <p className="text-gray-700 mb-4">
        Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity...
        </p>
        <div className="flex items-center text-blue-600 cursor-pointer">
          <p>Learn more</p>
          
        </div>
      </div>
    </div>
  </div>
</div>
{/*  */}
<div className="blog py-16  text-blue-950">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8">Latest Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="article p-6 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">10 Tips for a Healthy Lifestyle</h3>
        <p className="mb-4">Discover how to maintain a healthy lifestyle with these simple tips.</p>
        <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg">Read More</button>
      </div>
      <div className="article p-6 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">The Best Exercises for Beginners</h3>
        <p className="mb-4">Start your fitness journey with these beginner-friendly exercises.</p>
        <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg">Read More</button>
      </div>
      <div className="article p-6 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">How to Stay Motivated</h3>
        <p className="mb-4">Learn how to stay motivated and achieve your fitness goals.</p>
        <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg">Read More</button>
      </div>
    </div>
  </div>
</div>
{/*  */}


<Footer/>


    
     
  </>
    
  );
}

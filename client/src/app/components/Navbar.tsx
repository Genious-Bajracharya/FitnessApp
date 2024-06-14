"use client"
import { useRouter } from "next/navigation"
import LogoutButton from "./logout"
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
  


export default function Navbar(){
    const [isLoggedin,setIsLoggedin]=useState(false)
    const router= useRouter()

    useEffect(() => {

        try {
            const token = localStorage.getItem('authToken');
            if(!token){
            setIsLoggedin(!isLoggedin)
        }
        } catch(err) {
            console.log(err)
        }
        
    }, []);
    

    return(
        <div className="flex p-6 bg-slate-950 justify-between ">  
            <div className="flex justify-between items-center gap-5 text-white">
                <div onClick={()=> router.push('/')} className=" cursor-pointer text-2xl font-bold">FitFreaK</div>
                <div onClick={()=> router.push('/')} className=" cursor-pointer font-semibold">Home</div>
                <div onClick={()=> router.push('/exercises')} className=" cursor-pointer font-semibold">Exercises</div>
            </div>
            <div className="flex text-white items-center  gap-5">
            { isLoggedin ? <Button onClick={()=> router.push('/login')}>Login</Button>: <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar  className=" cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>GB</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=" cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer" onClick={()=> router.push('/workouts')} >workout</DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer" onClick={()=> router.push('/goals')}> Goals</DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer" onClick={()=> router.push('/progress')} >Progress</DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer"><LogoutButton/></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> }
            
            </div>
        </div>
    )
}
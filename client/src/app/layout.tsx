
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "./components/Navbar";
import refreshAuthToken from "./components/refreshtoken";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitFreak",
  description: "How much can you Bench? ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   
 
  
  return (
    <html lang="en">
      
      
      <body className={inter.className}> <Navbar/>{children} <Toaster /></body>
      
    </html>
  );
}

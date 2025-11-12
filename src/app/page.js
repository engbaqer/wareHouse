"use client"
import Image from "next/image";
import { useEffect } from "react";  

import LogInComponent from "../app/(blank-layout)/login/page";

export default function Home() {
 

 // This will clear ALL localStorage items as soon as the site loads
useEffect(() => {
  localStorage.clear();
}, []);

  return (
    <>
      {/* <nav className="bg-white shadow-md py-4 px-6 fixed w-screen" dir="rtl">
        {/* <div className="container mx-auto flex flex-row justify-between items-center">
          <div className="flex justify-center items-center flex-row">
            <Image
              src={"/Pictogrammers-Material-Warehouse.svg"}
              alt="Logo"
              width={50}
              height={50}
              priority
            />
          </div>

          <div>
            <p
              className="text-xl font-bold"
              style={{ color: "lab(32 -1.69 -39.12)" }}
            >
              Ware<span className="text-orange-400">house </span>
              <span className="text-black">System</span>
            </p>
          </div>
        </div> */}
      {/* </nav> */}
      {/* Login Component */}
      <div className="">
        <LogInComponent />
      </div>

      {/* 🟢 Friendly test credentials box */}
   
        <div className="fixed bottom-6 right-6 bg-green-300 shadow-lg border p-4 rounded-2xl animate-fade-in text-sm">
          <p className="font-semibold mb-1 text-gray-800">Demo Login</p>
          <p>Username: <span className="font-mono">superadmin</span></p>
          <p>Password: <span className="font-mono">123</span></p>
        </div>
     
    </>
  );
}

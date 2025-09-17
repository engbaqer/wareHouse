import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, Pointer } from "lucide-react";
import LogInComponent from "../app/(blank-layout)/login/page";
export default function Home() {
  return (
   <>    <nav className="bg-white shadow-md py-4 px-6 fixed w-screen" dir="rtl">
          <div className="container mx-auto flex flex-row justify-between items-center">
            <div className="flex justify-center items-center flex-row">
             
              <Image 
                src={"/Pictogrammers-Material-Warehouse.svg"} 
                alt="Logo" 
                width={50} 
                height={50} 
                priority 
              />
              <p
                className="text-xl font-bold"
                style={{ color: "lab(32 -1.69 -39.12)" }}
              >
                <span className="text-orange-400"></span>
              </p>
            </div>

            <div>
               <p
                className="text-xl font-bold "
                style={{ color: "lab(32 -1.69 -39.12)" }}
              >Ware
                <span className="text-orange-400">house </span>
                <span className="text-black"> System</span>
              </p>
            </div>
          </div>
        </nav> 

    <LogInComponent />  
</>

  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request"; // adjust path if needed

export default function SectionCards({ setShowItemInfo, setSelectedItem, showItemInfo, selectedItem}) {
  const [item, setItem] = useState(null);
console.log("im hear", selectedItem)
console.log("im hear", showItemInfo)
//   Fetch the item when component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("jwt"); // if you’re using JWT
        const data = await apiRequest(`api/Items/${selectedItem}`, {
          method: "GET",
          token,
        });
        setItem(data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };

    fetchItem();
  }, []);

  if (!item) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="  grid grid-cols-1 gap-4">
      <Card
        className=" w-70 h-90  hover:shadow-lg transition p-10">
        <CardHeader className=" flex justify-center items-center ">
          <Image
            src={"/9284767.png"}
            alt="Logo"
            width={60}
            height={60}
            priority
          />
        </CardHeader>
        <CardFooter className="flex-col gap-2 w-full">
          <CardTitle className=" text-center">Name:  {item.name}</CardTitle>
          <CardDescription>Description: {item.details.description} </CardDescription>
           <CardDescription>Price: {item.details.unitPrice} </CardDescription>
           <Button variant="" className='w-60 cursor-pointer' >Stock in</Button>
           <Button variant="destructive" className='w-60 cursor-pointer'>Stock out</Button>
           <Button onClick={() => { setShowItemInfo(false)}} variant="secondary" className='w-60 cursor-pointer'>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

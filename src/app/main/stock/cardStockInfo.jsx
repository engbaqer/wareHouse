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

export default function SectionCards({ setShowItemInfo, setSelectedItem, showItemInfo, selectedItem , setShowTheForm }) {
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
    <div className=" w-f grid grid-cols-1 gap-4">
      <Card
        className=" w-fit h-fit  hover:shadow-lg transition p-10">
        <CardHeader className=" flex justify-center items-center ">
          <Image
            src={"/9284767.png"}
            alt="Logo"
            width={60}
            height={60}
            priority
          />
        </CardHeader>
        <CardFooter className="flex-col  gap-2 w-full">
          <CardTitle className=" ">Name:  {item.name}</CardTitle>
          <CardDescription>Description: {item.details.description} </CardDescription>
           <CardDescription>Price: {item.details.unitPrice} </CardDescription>
           <CardDescription> <div className="mt-3 w-full">
            <h3 className="font-bold mb-2">Stock by Warehouse:</h3>
            {item.warehouses && item.warehouses.length > 0 ? (
              item.warehouses.map((wh, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-1 text-sm text-gray-700"
                >
                  <span>{wh.warehouseName}</span>
                  <span className="font-semibold">{wh.quantityOnHand}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No warehouse data</p>
            )}
          </div></CardDescription>
           <Button variant="success" className='w-60 cursor-pointer bg-green-500 text-white' onClick={() => setShowTheForm("in")}>Stock in</Button>
           <Button variant="destructive" className='w-60 cursor-pointer' onClick={() => setShowTheForm("out")}>Stock out</Button>
            <Button variant="" className='w-60 cursor-pointer' onClick={() => setShowTheForm("transfer")}>Transfer</Button>
           <Button onClick={() => { setShowItemInfo(false)}} variant="secondary" className='w-60 cursor-pointer'>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/request"; // your helper

export default function Branches() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem("jwt"); // ⬅️ get JWT
        const data = await apiRequest("api/Warehouses", {
          method: "GET",
          token, // ⬅️ pass it to apiRequest
        });
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {warehouses.map((warehouse) => {
        const status = warehouse.isActive ? "active" : "inactive";
        const normalized = status?.toLowerCase();

        return (
          <Card
            key={warehouse.id}
            className="w-90 sm:h-75 hover:shadow-lg transition cursor-pointer"
          >
            <CardHeader className="flex justify-center items-center">
              <Image
                src={"/images.jfif"}
                alt="Logo"
                width={200}
                height={80}
                priority
                className="rounded-lg"
              />
            </CardHeader>
            <CardFooter className="flex-col gap-4">
              <CardTitle className="w-20 sm:w-40  text-center">
                Name:{" "}
                <span className="font-bold">{warehouse.name}</span>
              </CardTitle>
              <CardTitle className="w-20 sm:w-40  text-center">
                Location:{" "}
                <span className="font-bold">{warehouse.location}</span>
              </CardTitle>

              <div>
                <Badge
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    normalized === "active" &&
                      "bg-green-600 text-white hover:bg-green-700",
                    normalized === "inactive" &&
                      "bg-red-600 text-white hover:bg-red-700"
                  )}
                >
                  {status}
                </Badge>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

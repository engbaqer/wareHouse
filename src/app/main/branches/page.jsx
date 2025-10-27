"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AddBranch from "./addBranch";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/request";
import { useGlobalState } from "../../(blank-layout)/login/GlobalState";

export default function Branches() {
  const { setBranch } = useGlobalState();
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await apiRequest("api/Warehouses", {
        method: "GET",
        token,
      });
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this warehouse?")) return;

    try {
      const token = localStorage.getItem("jwt");
      await apiRequest(
        `/api/Warehouses/${id}`,
        {
          method: "DELETE",
          token,
        }
      );

      // remove from state
      setWarehouses((prev) => prev.filter((w) => w.id !== id));

      alert("✅ Warehouse deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting warehouse:", error);
      alert("Failed to delete warehouse");
    }
  };

  return (
    <>
      <Button
        className="ml-5 mb-5 sm:ml-10 bg-green-400"
        onClick={() => setShowForm(true)}
      >
        Add new branch
      </Button>

      <div className="flex flex-wrap justify-center items-center gap-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => {
            const status = warehouse.isActive ? "active" : "inactive";
            const normalized = status?.toLowerCase();

            return (
              <Card
                key={warehouse.id}
                className="w-90 sm:h-75 hover:shadow-lg transition cursor-pointer"
              >
                <CardHeader
                  onClick={() => {
                    localStorage.setItem("warehouseId", warehouse.id);
                    setBranch(warehouse.name);
                    router.push(`/main/stockInBranch`);
                  }}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={"/images.jfif"}
                    alt="Logo"
                    width={200}
                    height={80}
                    priority
                    className="rounded-lg"
                  />
                </CardHeader>
                <CardFooter className="flex-col gap-2.5">
                  <CardTitle className="w-20 sm:w-40 text-center">
                    Name: <span className="font-bold">{warehouse.name}</span>
                  </CardTitle>
                  <CardTitle className="w-20 sm:w-40 text-center">
                    Location:{" "}
                    <span className="font-bold">{warehouse.location}</span>
                  </CardTitle>

                  <div>
                    <Badge
                      className={cn(
                        "px-3 py-1 text-sm font-medium",
                        normalized === "active" && "bg-green-600 text-white",
                        normalized === "inactive" && "bg-red-600 text-white"
                      )}
                    >
                      {status}
                    </Badge>
                  </div>

                  <Button
                    className="cursor-pointer bg-red-600"
                    onClick={() => handleDelete(warehouse.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <AddBranch setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
}

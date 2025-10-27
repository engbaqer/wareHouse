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

export default function SectionCards({
  setShowItemInfo,
  setSelectedItem,
  showItemInfo,
  selectedItem,
  addItem,
  setAddItem,
  setTempOfData,
}) {
  const [item, setItem] = useState(null);
 const token = localStorage.getItem("jwt");
  // 🔹 Fetch the item
  useEffect(() => {
    const fetchItem = async () => {
      try {
       
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
  }, [selectedItem]); // 👈 better: refetch if id changes

  if (!item) {
    return <p className="text-gray-500">Loading...</p>;
  }

  function Update() {
    setShowItemInfo(false);
    setAddItem(true);
    setTempOfData(item);
  }

  // 🔹 Delete handler
  async function handleDelete() {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    const token = localStorage.getItem("jwt");
    await apiRequest(`api/Items/${selectedItem}`, {
      method: "DELETE",
      token: token, // ✅ correctly passed
    });

    alert("Item deleted successfully!");
    setShowItemInfo(false); // close the modal
    setSelectedItem(null);  // clear selection
  } catch (err) {
    console.error("❌ Failed to delete item:", err);
    alert("this item was used in stock, you can't delete it.");
  }
}

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="w-70 h-90 hover:shadow-lg transition p-10">
        <CardHeader className="flex justify-center items-center">
          <Image
            src={"/9284767.png"}
            alt="Logo"
            width={60}
            height={60}
            priority
          />
        </CardHeader>
        <CardFooter className="flex-col gap-2 w-full">
          <CardTitle className="text-center">Name: {item.name}</CardTitle>
          <CardDescription>
            Description: {item.details?.description}
          </CardDescription>
          <CardDescription>
            Price: {item.details?.unitPrice}
          </CardDescription>

          <Button
            variant=""
            className="w-60 cursor-pointer"
            onClick={Update}
          >
            Update
          </Button>

          <Button
            variant="destructive"
            className="w-60 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Button
            onClick={() => setShowItemInfo(false)}
            variant="secondary"
            className="w-60 cursor-pointer"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

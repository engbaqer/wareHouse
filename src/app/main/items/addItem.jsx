"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/request"; // your helper

export default function CardDemo({ setAddItem, setSelectedItem, addItem, selectedItem ,tempOfData , setTempOfData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "",
    unitPrice: "",
  });

  // ✅ Sync formData with selectedItem
  useEffect(() => {
    console.log("selected:" , tempOfData)
    if (tempOfData) {
      setFormData({
        name: tempOfData.name || "",
        description: tempOfData.details.description || "",
        color: tempOfData.details.color || "",
        unitPrice: tempOfData.details.unitPrice || "",
      });
    } else {
      // reset when adding a new item
      setFormData({ name: "", description: "", color: "", unitPrice: "" });
    }
  }, [tempOfData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "unitPrice" ? Number(value) : value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
 const payload = tempOfData
  ? { ...formData, id: tempOfData.id } // include id for update
  : formData;

      // ✅ Use PUT for update, POST for new
      const response = await apiRequest(
  tempOfData ? `api/Items/${tempOfData.id}` : "api/Items",
  {
    method: tempOfData ? "PUT" : "POST",
    body: payload,
    token : token,
  }
);
     setFormData({ name: "", description: "", color: "", unitPrice: "" });
      if (typeof setTempOfData === "function") setTempOfData(null);
      alert("Item saved successfully!");
      setSelectedItem(null); // reset selected after saving
      setAddItem(false);
    } catch (error) {
      console.error("❌ Error saving item:", error);
      alert("Failed to save item");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{tempOfData ? "Update Item" : "Add Item"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="text"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="unitPrice">Price</Label>
            <Input
              id="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={handleChange} 
              required
            />
          </div>

          <CardFooter className="flex-col gap-2 px-0">
            <Button type="submit" className="w-full">
              {selectedItem ? "UPDATE" : "ADD"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setFormData({ name: "", description: "", color: "", unitPrice: "" });
                 if (typeof setTempOfData === "function") setTempOfData(null);
                setSelectedItem(null);
                setAddItem(false);
              }}
            >
              CANCEL
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

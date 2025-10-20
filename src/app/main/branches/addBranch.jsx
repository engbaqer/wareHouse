"use client";
import { useState } from "react";
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
import { apiRequest } from "@/lib/request"; // same helper

export default function WarehouseForm({ setShowForm }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");

      await apiRequest("/api/Warehouses", {
        method: "POST",
        body: formData,
        token,
      });

      alert("✅ Warehouse saved successfully!");
      setFormData({ name: "", location: "" });

      if (typeof setShowForm === "function") setShowForm(false);
    } catch (error) {
      console.error("❌ Error saving warehouse:", error);
      alert("Failed to save warehouse");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Warehouse</CardTitle>
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <CardFooter className="flex-col gap-2 px-0">
            <Button type="submit" className="w-full">
              SAVE
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setFormData({ name: "", location: "" });
                if (typeof setShowForm === "function") setShowForm(false);
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

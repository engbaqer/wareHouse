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
import { apiRequest } from "@/lib/request";
import { useGlobalState } from "@/hooks/globalHook";

export default function CardDemo({
  setAddItem,
  setSelectedItem,
  addItem,
  selectedItem,
  tempOfData,
  setTempOfData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    description: "",
    color: "",
    unitPrice: "",
  });

  const { setReRequest } = useGlobalState();

  // ✅ Sync formData with selected item
  useEffect(() => {
    if (tempOfData) {
      setFormData({
        name: tempOfData.name || "",
        degree: tempOfData.degree || "",
        description: tempOfData.details?.description || "",
        color: tempOfData.details?.color || "",
        unitPrice: tempOfData.details?.unitPrice || "",
      });
    } else {
      setFormData({
        name: "",
        degree: "",
        description: "",
        color: "",
        unitPrice: "",
      });
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
        ? { ...formData, id: tempOfData.id }
        : formData;

      const response = await apiRequest(
        tempOfData ? `api/Items/${tempOfData.id}` : "api/Items",
        {
          method: tempOfData ? "PUT" : "POST",
          body: payload,
          token,
        }
      );

      setFormData({
        name: "",
        degree: "",
        description: "",
        color: "",
        unitPrice: "",
      });
      if (typeof setTempOfData === "function") setTempOfData(null);
      alert("Item saved successfully!");
      setSelectedItem(null);
      setAddItem(false);
      setReRequest("addItem");
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
          {/* Name */}
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

          {/* Degree */}
          <div className="grid gap-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              type="text"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
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

          {/* Color */}
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

          {/* Unit Price */}
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
                setFormData({
                  name: "",
                  degree: "",
                  description: "",
                  color: "",
                  unitPrice: "",
                });
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

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
export default function StockInForm({ setShowForm , showTheForm , selectedItem }) {
  
  const warehouseId = localStorage.getItem("warehouseId");
  const [formData, setFormData] = useState({
    itemId: selectedItem,
    warehouseId: warehouseId,
    quantity: "",
    unitPrice: "",
    referenceNo: "",
    note: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: ["itemId", "warehouseId", "quantity", "unitPrice"].includes(id)
        ? Number(value) // convert numbers
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");

      await apiRequest(`api/Stock/${showTheForm}`, {
        method: "POST",
        body: formData,
        token,
      });

      alert(`Stock ${showTheForm} saved successfully!`);
      setFormData({
        itemId: "",
        warehouseId: "",
        quantity: "",
        unitPrice: "",
        referenceNo: "",
        note: "",
      });
      if (typeof setShowForm === "function") setShowForm(false);
    } catch (error) {
      console.error(`❌ Error saving stock : ${showTheForm}`, error);
      alert(`Failed to save stock ${showTheForm}`);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Stock {showTheForm}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="unitPrice">Unit Price</Label>
            <Input
              id="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="referenceNo">Reference Number</Label>
            <Input
              id="referenceNo"
              type="text"
              value={formData.referenceNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              type="text"
              value={formData.note}
              onChange={handleChange}
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
                setFormData({
                  itemId: "",
                  warehouseId: "",
                  quantity: "",
                  unitPrice: "",
                  referenceNo: "",
                  note: "",
                });
                if (typeof setShowForm === "function") setShowForm("");
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

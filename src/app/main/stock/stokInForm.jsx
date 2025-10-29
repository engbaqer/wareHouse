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
export default function StockInForm({ setShowForm, showTheForm, selectedItem  , warehouseHaveThisItem }) {
  const [warehouses, setWarehouses] = useState([]);
  const warehousesId = localStorage.getItem("warehouseId");
  const { setReRequest } = useGlobalState();
  // Initialize form based on the mode
  const getInitialForm = () => {
    if (showTheForm === "transfer") {
      return {
        itemId: selectedItem,
        fromWarehouseId:"" ,
        toWarehouseId: "",
        quantity: "",
        unitPrice: "0",
        referenceNo: "0",
        note: "",
      };
    } else {
      return {
        itemId: selectedItem,
        warehouseId: warehousesId,
        quantity: "",
        unitPrice: "",
        referenceNo: "",
        note: "",
      };
    }
  };

  const [formData, setFormData] = useState(getInitialForm());

  // Reset form when showTheForm changes
  useEffect(() => {
    setFormData(getInitialForm());
  }, [showTheForm]);

  // Load warehouse list
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const data = await apiRequest("api/Warehouses", {
          method: "GET",
          token,
        });
        setWarehouses(data);
      } catch (error) {
        console.error("❌ Failed to load warehouses:", error);
      }
    };
    fetchWarehouses();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: ["quantity", "unitPrice", "itemId", "warehouseId", "fromWarehouseId", "toWarehouseId"].includes(id)
        ? Number(value)
        : value,
    }));
  };

  // Submit handler
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
      setFormData(getInitialForm());
      if (typeof setShowForm === "function") setShowForm("");
      setReRequest("stock"); // trigger re-fetch
    } catch (error) {
      console.error(`❌ Error saving stock ${showTheForm}:`, error);
      alert(`Failed to save stock ${showTheForm}`);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="capitalize">Stock {showTheForm}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Quantity */}
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

          {/* Unit Price */}
           {showTheForm !== "transfer" ? (
            <>
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
</>
 ) : null}
          {/* Reference Number */}
             {showTheForm !== "transfer" ? (
            <>
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
   </>
          ) : null}
          {/* Conditional warehouse fields */}
          {showTheForm === "transfer" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="toWarehouseId">Transfer from</Label>
                <select
                  id="fromWarehouseId"
                  className="border p-2 rounded"
                  value={formData.fromWarehouseId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select source branch...</option>
                  { warehouseHaveThisItem.map((wh) => (
                      <option key={wh.warehouseId} value={wh.warehouseId}>
                        {wh.warehouseName}
                      </option>
                    ))}
                </select>
              </div>
            </>
          ) : null}
          {showTheForm === "transfer" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="toWarehouseId">Transfer To</Label>
                <select
                  id="toWarehouseId"
                  className="border p-2 rounded"
                  value={formData.toWarehouseId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select destination branch...</option>
                  { warehouses.map((wh) => (
                      <option key={wh.id} value={wh.id}>
                        {wh.name}
                      </option>
                    ))}
                </select>
              </div>
            </>
          ) : null}
  

          {/* Note */}
          <div className="grid gap-2">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              type="text"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <CardFooter className="flex-col gap-2 px-0">
            <Button type="submit" className="w-full">
              SAVE
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setFormData(getInitialForm());
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

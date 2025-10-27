"use client";
// import CardStock from '../stock/cardStockInfo'
import Card from '../stock/card'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";

// import { id } from 'zod/v4/locales';
// import StockInForm from './stokInForm';
export default function Items() {
  
  // const [id, setId] = useState(""); 
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTheForm, setShowTheForm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  
  const getItems = async (query = "") => {
    setIsLoading(true);
    setError(""); 
    const token = localStorage.getItem("jwt");
    const warehouseId = localStorage.getItem("warehouseId");
    try {
      const result = await apiRequest(
        `api/Items?q=${query}&page=1&pageSize=20&warehouseId=${warehouseId}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      console.log(result+"mmm")
      setItems(Array.isArray(result?.items) ? result.items : []);
    } catch (error) {
      setError("Failed to load items. Please try again.");
    }
    setIsLoading(false);
  };

  // Fetch items by default on page load
  useEffect(() => {
    getItems();
  }, []);

  // Debounced search when query changes
  useEffect(() => {
    if (!query) return; // avoid double-call with initial load
    const handle = setTimeout(() => {
      getItems(query);
    }, 400);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <div className='-full flex flex-col relative justify-center items-center'>
      <div className='w-full flex sm:px-[7%]'>
        <form
          className="flex items-center gap-2 sm:w-[50%]"
          role="search"
          aria-label="Search items"
          onSubmit={(e) => {
            e.preventDefault();
            getItems(query);
          }}
        >
          <Input
            type="text"
            placeholder="Search items"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search items by name"
          />
          <Button type="submit" variant="outline" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
<div className=' *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1 cursor-pointer transition-transform duration-200 ease-in-out'>
      <div className='w-fit pt-8 flex flex-wrap gap-5 sm:px-[5%]'>
        {error && (
          <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2'>
            {error}
          </div>
        )}
      </div>

      <div className='w-full pt-6 sm:px-[7%]'>
        {isLoading && items.length === 0 ? (
          <div className='text-sm text-muted-foreground'>Loading items...</div>
        ) : null}
        {!isLoading && items.length === 0 && !error ? (
          <div className='text-sm text-muted-foreground'>No items found.</div>
        ) : null}
      </div>

      <div className='w-full pt-4 sm:px-[7%] grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {items
          .filter(item => Array.isArray(item.warehouses) && item.warehouses.length > 0 )
          .map((item) => (
            <Card
              key={item.id}
              {...item}
              setShowItemInfo={setShowItemInfo}
              setSelectedItem={setSelectedItem}
            />
          ))}
      </div>
    </div>
    </div>
  );
}

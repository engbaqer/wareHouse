"use client";
import Card from './card'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";

export default function Items() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const getItems = async (search = "") => {
    const token = localStorage.getItem("jwt");
    try {
      const result = await apiRequest(
        `api/Items?page=1&pageSize=20&search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setItems(result.items); // store fetched items in state
      console.log(result.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch items by default on page load
  useEffect(() => {
    getItems();
  }, []);

  return (
   <div className='w-full   flex flex-col    '>
    <div className='     '>
      <form
        className="flex  items-center gap-2 "
        onSubmit={(e) => {
          e.preventDefault();
          getItems(query); // fetch items by search query
        }}
      >
        <Input
          type="text"
          placeholder="Search items"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
  </div>
<div className='w-fit  pt-8  flex flex-wrap gap-5 '>
    {items.map((item) => (
        <Card key={item.id} {...item} />
      ))}
</div>

      {/* <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b py-2">
            {item.name}
          </li>
        ))}
      </ul> */}
    </ div>
     
  );
}

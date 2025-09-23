"use client";
import CardStock from './cardStockInfo'
import Card from './card'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";
// import { id } from 'zod/v4/locales';
import StockInForm from './stokInForm';
export default function Items() {
  // const [id, setId] = useState(""); 
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTheForm, setShowTheForm] = useState("");


  console.log(showItemInfo)
  console.log(selectedItem)
  const getItems = async (query = "") => {
    const token = localStorage.getItem("jwt");
    try {
      const result = await apiRequest(
        `api/Items?q=${query}&page=1&pageSize=20`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setItems(result.items); // store fetched items in state
      console.log(' im hear ' ,result.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch items by default on page load
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className='w-full    flex flex-col relative  justify-center items-center   '>
      <div className='w-full  flex sm:px-[7%]   '>
        <form
          className="flex  items-center gap-2 sm:w-[50%]   "
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
          <Button onClick={() => getItems(query)} type="submit" variant="outline">
            Search
          </Button>
        </form>
      </div>
      <div className='w-fit  pt-8  flex flex-wrap gap-5 sm:px-[7%]    '>
        {items.map((item) => (
          <Card key={item.id} {...item} setShowItemInfo={setShowItemInfo} 
          setSelectedItem={setSelectedItem}  />
        ))}
      </div>
      {showItemInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <CardStock
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            showItemInfo={showItemInfo}
            selectedItem={selectedItem}
            setShowTheForm={setShowTheForm}
            className="relative bg-white rounded-xl shadow-xl p-6"
          />
        </div>
      )}

  {showTheForm !== "" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <StockInForm
            setShowForm={setShowTheForm}
            showTheForm={showTheForm}
            selectedItem={selectedItem}
            className="relative bg-white rounded-xl shadow-xl p-6"
          />
        </div>
      )}
    </ div>

  );
}

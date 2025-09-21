"use client";
import CardItem from './cardItemInfo'
import Card from './card'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";
import AddItem from './addItem'
export default function Items() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [tempOfData , setTempOfData]=useState(null)
  console.log(showItemInfo)
  console.log(selectedItem)
  const getItems = async (search = query) => {
    const token = localStorage.getItem("jwt");
    try {
      console.log('search ,', search)
      const result = await apiRequest(
        `api/Items?q=${search}&page=1&pageSize=20`,
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
    <div className='w-full    flex flex-col relative  justify-center items-center  '>
      <div className='w-full sm:px-15 flex   '>
        <form
          className="flex  items-center gap-2 sm:w-[50%] "
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
          <Button type="submit" variant="outline" className="hover:cursor-pointer">
            Search
          </Button>
          <Button className="bg-green-400 hover:bg-green-200 text-black cursor-pointer" onClick={()=>setAddItem(true)}>Add Item</Button>
        </form>
        
      </div>
      <div className='w-fit  pt-8  flex flex-wrap gap-5  '>
        {items.map((item) => (
          <Card key={item.id} {...item} setShowItemInfo={setShowItemInfo} 
          setSelectedItem={setSelectedItem}  />
        ))}
      </div>
      {showItemInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <CardItem
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
             setAddItem={setAddItem}
            showItemInfo={showItemInfo}
             selectedItem={selectedItem}
             setTempOfData={setTempOfData}
            addItem={addItem}
            className="relative bg-white rounded-xl shadow-xl p-6"
          />
        </div>
      )}
    {addItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <AddItem
            setAddItem={setAddItem}
            setSelectedItem={setSelectedItem}
            addItem={addItem}
            selectedItem={selectedItem}
            tempOfData={tempOfData}
              setTempOfData={setTempOfData}
            className="relative bg-white rounded-xl shadow-xl p-6"
          />
        </div>
      )}

    </ div>

  );
}

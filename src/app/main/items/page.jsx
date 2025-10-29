"use client";
import CardItem from "./cardItemInfo";
import Card from "./card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";
import AddItem from "./addItem";
import { useGlobalState } from "@/hooks/globalHook";
import { set } from "zod";
export default function Items() {
  const { reRequest , setReRequest } = useGlobalState();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [tempOfData, setTempOfData] = useState(null);

  // pagination states
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getItems = async (search = query, pageNumber = page) => {
    const token = localStorage.getItem("jwt");
    try {
      setLoading(true);
      const result = await apiRequest(
        `api/Items?q=${search}&page=${pageNumber}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      // Expecting your API to return: { items, totalPages } or totalCount
      setItems(result.items || []);
      if (result.totalPages) {
        setTotalPages(result.totalPages);
      } else if (result.totalCount) {
        setTotalPages(Math.ceil(result.totalCount / pageSize));
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when page or query changes
  useEffect(() => {
    getItems(query, page );
    setReRequest("");
  }, [page , query , reRequest]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getItems(query, 1);
  };

  return (
    <div className="w-full flex flex-col relative justify-center items-center">
      {/* 🔍 Search + Add Buttons */}
      <div className="w-full flex sm:px-[7%]">
        <form
          className="flex items-center gap-2 sm:w-[50%]"
          onSubmit={handleSearch}
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
          <Button
            className="bg-green-400 hover:bg-green-200 text-black"
            onClick={() => setAddItem(true)}
            type="button"
          >
            Add Item
          </Button>
        </form>
      </div>

      {/* 🧾 Items list */}
      <div className="w-fit pt-8 flex flex-wrap gap-5 sm:px-[5%]">
        {loading ? (
          <p className="text-gray-500">Loading items...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <Card
              key={item.id}
              {...item}
              setShowItemInfo={setShowItemInfo}
              setSelectedItem={setSelectedItem}
            />
          ))
        ) : (
          <p className="text-gray-500">No items found.</p>
        )}
      </div>

      {/* 🔄 Pagination buttons */}
      <div className="flex items-center justify-end gap-4 py-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || loading}
        >
          Next
        </Button>
      </div>

      {/* 🧩 Modals */}
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
    </div>
  );
}

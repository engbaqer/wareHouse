"use client";
import CardStock from "./cardStockInfo";
import Card from "./card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";
import { useState, useEffect } from "react";
import StockInForm from "./stokInForm";

export default function Items() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTheForm, setShowTheForm] = useState("");

  // 🔹 Pagination states
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

      // Expecting API to return { items, totalPages } or { totalCount }
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

  // 🔹 Fetch when component mounts or page changes
  useEffect(() => {
    getItems(query, page);
  }, [page , query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getItems(query, 1);
  };

  return (
    <div className="w-full flex flex-col relative justify-center items-center">
      {/* 🔍 Search Bar */}
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
          <Button
            onClick={() => getItems(query)}
            type="submit"
            variant="outline"
          >
            Search
          </Button>
        </form>
      </div>

      {/* 🧾 Items List */}
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

      {/* 🔄 Pagination */}
      <div className="flex items-center justify-center gap-4 py-6">
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
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { useOwnerKos } from "@/lib/hooks";

export default function BoardingHousePage() {
  const [search, setSearch] = useState("");
  const { kosList, loading, error, refetch } = useOwnerKos();

  // Filter based on search
  const filteredHouses = kosList.filter((house) =>
    house.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419B98] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading boarding houses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => refetch()} 
            className="mt-4 px-4 py-2 bg-[#419B98] text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for boarding house..."
          className="w-full max-w-md rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mb-6">Boarding House</h1>

      {/* Table Header */}
      <div className="grid grid-cols-6 font-medium text-gray-600 mb-4">
        <span>Name</span>
        <span>Address</span>
        <span>Price</span>
        <span>Gender</span>
        <span>Status</span>
        <span></span>
      </div>

      {/* Table Body */}
      <div className="space-y-4">
        {filteredHouses.map((house) => (
          <div
            key={house.id}
            className="grid grid-cols-6 items-center shadow-sm p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src={house.images?.[0]?.image_url || "/image/kos.png"}
                alt={house.name}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <span>{house.name}</span>
            </div>
            <span className="truncate">{house.address}</span>
            <span>Rp {typeof house.price_per_month === 'number' ? house.price_per_month.toLocaleString() : house.price_per_month}/month</span>
            <span className="uppercase">{house.gender === 'male' ? 'L' : house.gender === 'female' ? 'P' : 'All'}</span>
            <span className="text-green-600">
              Available
            </span>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

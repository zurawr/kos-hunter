"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "../../components/ui/input";

interface BoardingHouse {
  id: number;
  name: string;
  address: string;
  price: string;
  gender: string;
  status: string;
  image: string;
}

const boardingHouses: BoardingHouse[] = [
  {
    id: 1,
    name: "Cluster Puri Indah II",
    address: "Jalan Sawojajar, Kota Malang",
    price: "500K/month",
    gender: "L",
    status: "Available",
    image: "/image/kos.png",
  },
  {
    id: 2,
    name: "Cluster Puri Indah II",
    address: "Jalan Sawojajar, Kota Malang",
    price: "500K/month",
    gender: "L",
    status: "Available",
    image: "/image/kos.png",
  },
  {
    id: 3,
    name: "Cluster Puri Indah II",
    address: "Jalan Sawojajar, Kota Malang",
    price: "500K/month",
    gender: "L",
    status: "Available",
    image: "/image/kos.png",
  },
];

export default function BoardingHousePage() {
  const [search, setSearch] = useState("");

  const filteredHouses = boardingHouses.filter((house) =>
    house.name.toLowerCase().includes(search.toLowerCase())
  );

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
                src={house.image}
                alt={house.name}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <span>{house.name}</span>
            </div>
            <span className="truncate">{house.address}</span>
            <span>{house.price}</span>
            <span>{house.gender}</span>
            <span
              className={`${
                house.status === "Available" ? "text-green-600" : "text-red-500"
              }`}
            >
              {house.status}
            </span>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

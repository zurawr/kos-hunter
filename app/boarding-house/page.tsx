"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, Trash2, Phone, Mail, ArrowLeft, Upload } from "lucide-react";

/** Type */
type Boarding = {
  id: number;
  name: string;
  address: string;
  price: string;
  gender: string;
  status: string;
  image: string;
  about?: string;
};

export default function BoardingHousePage() {
  const [list, setList] = useState<Boarding[]>(() => [
    {
      id: 1,
      name: "Cluster Puri Indah II",
      address: "Jalan Sawojajar, Kota Malang",
      price: "500k/month",
      gender: "L",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      about: "SEGO SAMBEL MBK PIT, Perumahan Puri Indah 3. Tutup • Buka hari jam 07:00. Aneka nasi.",
    },
    {
      id: 2,
      name: "Cluster Puri Indah II",
      address: "Jalan Sawojajar, Kota Malang",
      price: "500k/month",
      gender: "L",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      about: "Keterangan singkat kos.",
    },
    {
      id: 3,
      name: "Cluster Puri Indah II",
      address: "Jalan Sawojajar, Kota Malang",
      price: "500k/month",
      gender: "L",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      about: "Keterangan singkat kos.",
    },
    {
      id: 4,
      name: "Cluster Puri Indah II",
      address: "Jalan Sawojajar, Kota Malang",
      price: "500k/month",
      gender: "L",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      about: "Keterangan singkat kos.",
    },
    {
      id: 5,
      name: "Cluster Puri Indah II",
      address: "Jalan Sawojajar, Kota Malang",
      price: "500k/month",
      gender: "L",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      about: "Keterangan singkat kos.",
    },
  ]);

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [showModal, setShowModal] = useState(false);

  const selected = useMemo(
    () => list.find((i) => i.id === selectedId) || null,
    [list, selectedId]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return list;
    return list.filter(
      (i) =>
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        i.address.toLowerCase().includes(query.toLowerCase())
    );
  }, [list, query]);

  const handleAdd = (payload: Omit<Boarding, "id">) => {
    const next: Boarding = { ...payload, id: Date.now() };
    setList((s) => [next, ...s]);
    setShowModal(false);
    setSelectedId(next.id);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setList((s) => s.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className="flex-1 p-10 bg-gray-50">
      {/* top search */}
      <div className="flex items-center justify-between mb-6 gap-6">
        <div className="relative w-1/2 max-w-lg">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for boarding house..."
            className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex-1" />
      </div>

      {/* title + actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Boarding House</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Boarding House
          </button>

          <button
            onClick={handleDelete}
            disabled={!selectedId}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              selectedId
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Trash2 size={16} /> Delete Boarding House
          </button>
        </div>
      </div>

      {/* main grid: table center + detail right */}
      <div className="flex gap-6">
        {/* table (center) */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Address</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Gender</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`cursor-pointer transition-all ${
                      isActive ? "bg-teal-600 text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className={`font-medium ${isActive ? "text-white" : "text-gray-900"}`}>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={isActive ? "text-white/90" : "text-gray-600"}>
                        {item.address}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${isActive ? "text-white" : "text-gray-900"}`}>
                        {item.price}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={isActive ? "text-white" : "text-gray-900"}>
                        {item.gender}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        isActive ? "bg-white/20 text-white" : "bg-green-50 text-green-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* right detail panel */}
        <aside className="w-80 bg-teal-50 rounded-xl shadow-sm border border-teal-100 flex flex-col justify-start pt-8 pb-6 px-6">
          {selected ? (
            <div>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-xl overflow-hidden mb-4 shadow-md">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{selected.name}</h3>

                <div className="flex gap-3 mb-6">
                  <button className="p-3 rounded-full bg-white shadow-sm text-teal-600 hover:bg-teal-50 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-3 rounded-full bg-white shadow-sm text-teal-600 hover:bg-teal-50 transition-colors">
                    <Mail size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {selected.about}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Gender</p>
                    <p className="font-medium text-gray-900">{selected.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="font-medium text-gray-900">{selected.price}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="font-medium text-gray-900">{selected.status}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="font-medium text-gray-900">{selected.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              Select a boarding house to see details
            </div>
          )}
        </aside>
      </div>

      {/* Add Modal */}
      {showModal && <AddModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  );
}

/** Add Modal component - 100% Sesuai Desain Figma */
function AddModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (data: Omit<Boarding, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Boarding, "id">>({
    name: "",
    address: "",
    price: "",
    gender: "Female",
    status: "Available",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    about: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.price) return;
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-gray-100 rounded-3xl w-full max-w-2xl shadow-2xl relative">
        {/* Back Button - Top Left */}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 p-2.5 hover:bg-gray-200 rounded-full transition-colors border border-gray-300 bg-white"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>

        {/* Title - Centered at Top */}
        <div className="pt-6 pb-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">
            Create Beautiful Your Boarding House!
          </h3>
        </div>

        {/* Form Content */}
        <div className="px-16 pb-10">
          {/* Basic Details Section */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Basic Details</h4>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-900 mb-2 ml-1">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Enter Boarding House Name"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Address Field */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-900 mb-2 ml-1">
                Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
                placeholder="Enter Address"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 text-sm resize-none placeholder:text-gray-400"
                rows={3}
              />
            </div>

            {/* Price and Gender - Side by Side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Price per Month */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2 ml-1">
                  Price per Month
                </label>
                <input
                  value={form.price}
                  onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                  placeholder="Enter Price"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Gender Radio Buttons */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-2 ml-1">
                  Gender
                </label>
                <div className="flex gap-4 items-center pt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={form.gender === "Male"}
                      onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}
                      className="w-4 h-4 text-teal-600 border-gray-400"
                    />
                    <span className="text-sm text-gray-700">Male</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}
                      className="w-4 h-4 text-teal-600 border-gray-400"
                    />
                    <span className="text-sm text-gray-700">Female</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="All"
                      checked={form.gender === "All"}
                      onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}
                      className="w-4 h-4 text-teal-600 border-gray-400"
                    />
                    <span className="text-sm text-gray-700">All</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities & Images Section */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Facilities & Images</h4>

            <div className="grid grid-cols-[180px_1fr] gap-4">
              {/* Upload Images Button */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Upload size={18} />
                <span>Upload Images</span>
              </button>

              {/* Description Facilities Input */}
              <input
                value={form.about}
                onChange={(e) => setForm((s) => ({ ...s, about: e.target.value }))}
                placeholder="Enter Description Facilities"
                className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Action Buttons - Bottom Right */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition-colors font-medium text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
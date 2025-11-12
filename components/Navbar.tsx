"use client";

import Image from "next/image";
import { Menu, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Pilih Provinsi");
  const [selectedCity, setSelectedCity] = useState("Pilih Kota");

  const cityOptions: Record<string, string[]> = {
    "Jawa Barat": ["Malang", "Surabaya", "Jakarta", "Bandung", "Yogyakarta"],
    "Jawa Timur": ["Malang", "Kediri", "Blitar", "Madiun", "Jember"],
    "Jawa Tengah": ["Lowokwaru", "Sukun", "Klojen", "Blimbing", "Sawojajar"],
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCityDropdown = () => setIsCityDropdownOpen(!isCityDropdownOpen);

  const handleSelectCountry = (location: string) => {
    setSelectedLocation(location);
    setSelectedCity("Pilih Kota");
    setIsDropdownOpen(false);
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  return (
    <header className="ml-10 bg-white shadow-md px-10 py-4 flex justify-between items-center relative">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="relative w-[45px] h-[45px]">
          <Image
            src="/image/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Navigasi kiri */}
        <nav className="text-gray-600 flex items-center gap-4">
          {/* Dropdown Provinsi */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none flex items-center gap-1 text-sm"
            >
              {selectedLocation}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <ul className="py-1 text-sm text-gray-700">
                  {["Jawa Barat", "Jawa Timur", "Jawa Tengah"].map(
                    (provinsi) => (
                      <li key={provinsi}>
                        <button
                          onClick={() => handleSelectCountry(provinsi)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {provinsi}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown Kota */}
          {selectedLocation !== "Pilih Provinsi" &&
            cityOptions[selectedLocation] && (
              <div className="relative">
                <button
                  onClick={toggleCityDropdown}
                  className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none flex items-center gap-1 text-sm"
                >
                  {selectedCity}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <ul className="py-1 text-sm text-gray-700">
                      {cityOptions[selectedLocation].map((city) => (
                        <li key={city}>
                          <button
                            onClick={() => handleSelectCity(city)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {city}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          {/* Menu */}
          <div className="flex items-center gap-6 ml-6">
            <a href="#" className="hover:text-[#2E6D6A] font-medium">
              Rent
            </a>
            <a href="#" className="hover:text-[#2E6D6A] font-medium">
              Sewa
            </a>
            <a href="#" className="hover:text-[#2E6D6A] font-medium">
              Help Center
            </a>
          </div>
        </nav>
      </div>

      {/* Bagian kanan */}
      <div className="flex items-center gap-4 px-4 py-2 rounded-md">
        <a href="#" className="text-[#419B98] font-semibold">
          KoSpace
        </a>
        <Menu className="text-black w-5 h-5 cursor-pointer" />
        <User className="text-[#419B98] w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
}

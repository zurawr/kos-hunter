"use client";

import Image from "next/image";
import { Mail, Phone, User, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between">
      <section className="w-full max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-1">Your Order</h1>
        <p className="text-sm text-gray-500 mb-8">
          Order ID :{" "}
          <span className="text-gray-800 font-medium">#KS-00123</span>
        </p>
        <p className="text-gray-600 mb-10">
          Thank you, your order has been confirmed.
        </p>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Kost Info */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6 bg-white ring-1 ring-blue-200">
              <Image
                src="/image/kos.png"
                alt="Kost Remaja Sawojajar"
                width={150}
                height={120}
                className="rounded-xl object-cover"
              />
              <div className="space-y-1">
                <h2 className="font-semibold text-lg text-gray-900">
                  Kost Remaja Sawojajar
                </h2>
                <p className="text-sm text-gray-500">
                  Entire House in Sawojajar
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Location:{" "}
                  <span className="font-medium">Sawojajar, Kota Malang</span>
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-6 text-gray-900">
                Order Summary
              </h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">500.00K</span>
                </div>
                <div className="flex justify-between">
                  <span>Charge</span>
                  <span className="font-medium">15.00K</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-medium">5.00K</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-</span>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between font-semibold text-gray-900 text-base">
                <span>Total</span>
                <span>520.00K</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex flex-col justify-between gap-6">
            {/* Customer Information */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-gray-900 mb-4 text-[15px]">
                Customer Information
              </h3>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>.azzura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <a
                    href="mailto:aazzuraaku736@gmail.com"
                    className="text-blue-500 hover:underline"
                  >
                    aazzura@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+62-852-1550-5960</span>
                </div>
              </div>
            </div>

            {/* Information Detail */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-gray-900 mb-4 text-[15px]">
                Information Detail
              </h3>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Azzuraa</span>
                </div>
                <div className="flex items-start gap-2 leading-relaxed">
                  <MapPin size={16} className="mt-1" />
                  <p>
                    Jl. Danau Maninjau Selatan 21/D/C2 Sawojajar, Kedungkandang,
                    Kota Malang
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-gray-900 mb-6 text-[15px]">
                Tracking Information
              </h3>
              <div className="relative flex flex-col gap-6 text-sm text-gray-700">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-[10px] bottom-[10px] w-[2px] bg-gray-200"></div>

                <div className="flex items-center gap-3 relative z-10">
                  <span className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></span>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></span>
                  <span>Process</span>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  <span>Verified Boarding House</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#2E6D6A] text-white mt-16 w-full py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-[120px] h-[120px] drop-shadow-xl">
              <Image
                src="/image/logo.png"
                alt="KoSpace Logo"
                fill
                className="object-contain brightness-110 contrast-110"
              />
            </div>
          </div>

          {/* Menu kanan */}
          <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0 mt-6 md:mt-0">
            {/* KoSpace */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-wide">KoSpace</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>Site Map</li>
                <li>Rent</li>
                <li>Status</li>
                <li>Help Center</li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold tracking-wide">Legal</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>Privacy Policy</li>
                <li>Terms of Services</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold tracking-wide">Contact Us</h4>
              <div className="flex space-x-4 mt-2 text-xl">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <SiTiktok className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

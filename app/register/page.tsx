"use client";

import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const makerID = "1";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://learn.smktelkom-mlg.sch.id/kos/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "makerID": makerID, // ✅ header wajib
        },
        body: JSON.stringify({
          email,
          name,
          password,
          phone,
          role : "society"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Register success:", data);
        // Redirect ke login kalau mau:
        window.location.href = "/login";
      } else {
        setMessage(`Gagal daftar: ${data.message || "Periksa kembali data Anda."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#82C4BE]">
      {/* Bagian kiri */}
      <div className="w-1/2 bg-[#82C4BE] flex flex-col justify-center items-center text-white p-10">
        <div className="flex flex-col items-start mb-10">
          <div className="text-4xl font-bold mb-1">K</div>
          <p className="text-sm opacity-90">Find Your Home, Live Your Life</p>
        </div>

        <h2 className="text-3xl font-semibold leading-snug mb-10 text-white">
          Connect With <br /> Verified Landlords <br /> Everywhere 
        </h2>

        <div className="w-64">
          <Image
            src="/livingroom.png"
            alt="Living room"
            width={250}
            height={250}
          />
        </div>
      </div>

      {/* Bagian kanan */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center rounded-l-[50px] shadow-lg">
        <div className="w-3/5">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Create Account
          </h1>

          <form className="flex flex-col space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-[#82C4BE] py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-[#82C4BE] py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-[#82C4BE] py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-[#82C4BE] py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#a0c6c4] hover:bg-[#419B98] text-white font-semibold py-2 mt-6 rounded-full transition duration-200 disabled:opacity-70"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {message && (
              <p
                className={`text-sm text-center mt-4 ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-sm text-gray-500 text-center mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-[#419B98] hover:underline">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

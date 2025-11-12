"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const makerID = "1";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://learn.smktelkom-mlg.sch.id/kos/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "makerID": makerID, // ✅ pakai snake_case
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login berhasil!");
        console.log("Login success:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        window.location.href = "/dashboard";
      } else {
        setMessage(`Login gagal: ${data.message || "Cek kembali email dan password."}`);
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
      <div className="w-1/2 bg-[#82C4BE] flex flex-col justify-center items-center text-white p-10">
        <div className="flex flex-col items-start mb-10">
          <div className="text-4xl font-bold mb-1">K</div>
          <p className="text-sm opacity-90">Find Your Home, Live Your Life</p>
        </div>

        <h2 className="text-3xl font-semibold leading-snug mb-10">
          Connect With <br /> Verified Landlords <br /> Everywhere
        </h2>

        <div className="w-64">
          <Image
            src="/livingroom.png"
            alt="Living room"
            width={250}
            height={250}
            priority
            style={{ height: "auto" }} // ✅ fix warning aspect ratio
          />
        </div>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center rounded-l-[50px] shadow-lg">
        <div className="w-3/5">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome Back, Login!
          </h1>

          <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
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
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-[#82C4BE] py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#a0c6c4] hover:bg-[#419B98] text-white font-semibold py-2 mt-6 rounded-full transition duration-200 disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
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
              Don’t have an account yet?{" "}
              <a href="/register" className="text-[#419B98] hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

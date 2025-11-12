"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [gender, setGender] = useState("female");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "Azura Smk Telkom",
    email: "Azuraw@gmail.com",
    phone: "+62 812-5248-6116",
    password: "••••••••••••••••••",
  });

  return (
    <div className="flex-1 p-12">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold mb-8">Personal Information</h1>

        <div className="flex gap-12">
          {/* Left Column - Form */}
          <div className="flex-1">
            {/* Gender Selection */}
            <div className="mb-6">
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Male</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="w-4 h-4 accent-teal-700"
                  />
                  <span className="text-gray-700">Female</span>
                </label>
              </div>
            </div>

            {/* Username */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Phone & Password */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Discard
              </button>
              <button className="px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
                Save
              </button>
            </div>
          </div>

          {/* Right Column - Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700">
                <span className="text-lg">+</span>
              </button>
            </div>
            <p className="text-gray-700 font-medium">{formData.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

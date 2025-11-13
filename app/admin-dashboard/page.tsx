"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User, MessageSquare, CreditCard, Calendar } from "lucide-react";

interface PaymentData {
  id: number;
  username: string;
  email: string;
  price: string;
  gender: string;
  status: "done" | "unpaid";
  avatar: string;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  // TODO: Replace with API fetching
  // const { stats, loading: statsLoading } = useAdminStats();
  // const { payments, loading: paymentsLoading } = usePayments();
  
  // Static data - will be replaced with API calls
  const [stats, setStats] = useState({
    totalSociety: 25,
    totalReviews: 19,
    totalPayment: 10,
    lastUpdate: "10 august 2025",
  });

  // Static payment data - will be replaced with API calls
  const [payments, setPayments] = useState<PaymentData[]>([
    {
      id: 1,
      username: "Atha.diantha",
      email: "athaDiantha@gmail.com",
      price: "500k/month",
      gender: "P",
      status: "done",
      avatar: "",
    },
    {
      id: 2,
      username: "sultansyahir",
      email: "AzuraBaik@gmail.com",
      price: "500k/month",
      gender: "P",
      status: "done",
      avatar: "",
    },
    {
      id: 3,
      username: "valeant",
      email: "rizq.syafriano@gmail.com",
      price: "500k/month",
      gender: "L",
      status: "unpaid",
      avatar: "",
    },
    {
      id: 4,
      username: "keisya",
      email: "keisya8tu@gmail.com",
      price: "500k/month",
      gender: "P",
      status: "unpaid",
      avatar: "",
    },
  ]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "owner") {
        // Redirect non-admin users
        router.push("/dashboard");
      }
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419B98]"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "owner") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back {user?.name || "Azura"}!
        </h1>
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user?.name || "Azura Smk Telkom"}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-100 overflow-hidden flex items-center justify-center">
            <span className="text-teal-700 font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Society Card */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalSociety}</h3>
              <p className="text-sm opacity-90">Society</p>
              <p className="text-xs opacity-75 mt-1">total society in boarding house</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <User size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-75 mt-4">
            <Calendar size={14} />
            <span>{stats.lastUpdate}</span>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalReviews}</h3>
              <p className="text-sm opacity-90">Reviews</p>
              <p className="text-xs opacity-75 mt-1">total reviews in boarding house</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <MessageSquare size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-75 mt-4">
            <Calendar size={14} />
            <span>{stats.lastUpdate}</span>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalPayment}</h3>
              <p className="text-sm opacity-90">Payment</p>
              <p className="text-xs opacity-75 mt-1">amount pay in boarding house</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <CreditCard size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-75 mt-4">
            <Calendar size={14} />
            <span>{stats.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* Payment Reminder Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-colors">
          <CreditCard size={18} />
          Payment Reminder
        </button>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          <div>Username</div>
          <div>Email</div>
          <div>Price</div>
          <div>Gender</div>
          <div>Status Payment</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
            >
              {/* Username with Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {payment.avatar ? (
                    <Image
                      src={payment.avatar}
                      alt={payment.username}
                      width={40}
                      height={40}
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-600 font-semibold text-sm">
                      {payment.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-gray-800 font-medium">{payment.username}</span>
              </div>

              {/* Email */}
              <div className="text-gray-600">{payment.email}</div>

              {/* Price */}
              <div className="text-gray-800 font-medium">{payment.price}</div>

              {/* Gender */}
              <div className="text-gray-800">{payment.gender}</div>

              {/* Status */}
              <div>
                {payment.status === "done" ? (
                  <span className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                    Done
                  </span>
                ) : (
                  <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    haven't paid yet
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

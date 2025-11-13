"use client";

import React from "react";
import SidebarOwner from "../../components/sidebar-owner";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarOwner />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

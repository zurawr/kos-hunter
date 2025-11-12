"use client";

import SidebarOwner from "../../components/sidebar-owner";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarOwner />
      <main className="flex-1">{children}</main>
    </div>
  );
}


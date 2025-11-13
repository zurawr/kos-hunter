"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Settings } from "lucide-react";

export default function SidebarOwner() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { name: "Boarding House", href: "/boarding-house", icon: Home },
    { name: "Settings", href: "/profile_owner", icon: Settings },
  ];

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col items-start px-6 py-10">
      <div className="mb-10 self-center">
        <img src="/image/logo.png" alt="Logo" className="mr-20 pb-5 w-25 h-25 object-contain" />
      </div>
      <nav className="flex flex-col gap-6 w-full">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-[#E9F4F3] text-[#3E7C77] font-medium"
                  : "text-gray-600 hover:text-[#3E7C77]"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

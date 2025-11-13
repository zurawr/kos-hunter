import type { Metadata } from "next";
import Navbar from "components/Navbar";
import { DivideCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "KoSpace Dashboard",
  description: "Dashboard kost management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="id">
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    // </html>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, DoorClosed, MessageSquare } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { kostData } from "@/data/kosData";

export default function DashboardUser() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const kosList = kostData;

  // // // Proteksi route - hanya untuk user society
  // // useEffect(() => {
  // //   if (!loading) {
  // //     if (!isAuthenticated) {
  // //       router.push("/login");
  // //     } else if (user?.role === "owner") {
  // //       // Redirect owner ke admin dashboard
  // //       router.push("/admin-dashboard");
  // //     }
  // //   }
  // // }, [user, isAuthenticated, loading, router]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419B98]"></div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated || user?.role !== "society") {
  //   return null;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Peta Indonesia (FULL BACKGROUND) */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/peta.png')" }}
      ></section>

      {/* Konten utama (Card Kost) */}
      <main className="flex-1 bg-white py-10 px-20">
        <div className="grid grid-cols-3 gap-8">
          {kosList.map((kost) => (
            <div
              key={kost.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
            >
              {/* Gambar */}
              <div className="relative">
                <Image
                  src={kost.image}
                  alt={kost.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#419B98] text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md">
                  Rp {kost.price_per_month.toLocaleString()}/bulan
                </div>
              </div>

              {/* Konten */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {kost.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{kost.address}</p>

                <hr className="mb-4 border-gray-200" />

                {/* Icon info */}
                <div className="flex justify-center items-center gap-8 text-gray-600 text-sm mb-5">
                  <div className="flex items-center gap-1.5">
                    <Bed size={17} />
                    <span>{kost.facilities} facilities</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath size={17} />
                    <span>{kost.gender}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DoorClosed size={17} />
                    <span>{kost.photos} photos</span>
                  </div>
                </div>

                {/* Tombol */}
                <div className="flex flex-row justify-between items-center">
                  <button className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition text-sm">
                    <MessageSquare size={16} />
                    Contact Owner
                  </button>

                  {/* Link ke detail per ID */}
                  <Link href={`/detail/${kost.id}`}>
                    <button className="text-gray-400 text-xs mt-2 hover:underline">
                      More Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#2E6D6A] text-white mt-10 py-10 px-20 flex justify-between items-start">
        <div className="flex flex-col items-start space-y-3">
          <div className="relative w-[140px] h-[140px] drop-shadow-lg">
            <Image
              src="/image/logo.png"
              alt="KoSpace Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-wide">KoSpace</h3>
            <h4 className="font-semibold text-lg">Site Map</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Rent</li>
              <li>Status</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div className="space-y-2 mt-9">
            <h4 className="font-semibold text-lg">Legal</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className="space-y-2 mt-9">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="flex space-x-4 mt-2 text-xl">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <FaInstagram className="w-6 h-6" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <SiTiktok className="w-6 h-6" />
              </a>

              {/* LinkedIn */}
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
      </footer>
    </div>
  
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link"; // ✅ Tambahkan import ini!
// import { Bed, Bath, DoorClosed, MessageSquare } from "lucide-react";
// import { SiTiktok } from "react-icons/si";
// import { FaInstagram, FaLinkedin } from "react-icons/fa";
// import { useState, useEffect } from "react";

// export default function DashboardUser() {
//   const [kostList, setKostList] = useState<any[]>([]);

//   useEffect(() => {
//     const dummy = [
//       {
//         id: 1,
//         name: "Kost Remaja Sawojajar",
//         location: "Entire House in Sawojajar",
//         price: "Rp500.000/bulan",
//         image: "/image/kos.png",
//         bed: "6bd.",
//         bath: "3ba.",
//         door: "7dr.",
//       },
//       {
//         id: 2,
//         name: "Kost Putra Idaman",
//         location: "Entire House in Klojen",
//         price: "Rp700.000/bulan",
//         image: "/image/kos.png",
//         bed: "4bd.",
//         bath: "2ba.",
//         door: "5dr.",
//       },
//       {
//         id: 3,
//         name: "Kost Harmoni",
//         location: "Entire House in Lowokwaru",
//         price: "Rp650.000/bulan",
//         image: "/image/kos.png",
//         bed: "5bd.",
//         bath: "2ba.",
//         door: "6dr.",
//       },
//       {
//         id: 4,
//         name: "Kost Remaja Sawojajar",
//         location: "Entire House in Sawojajar",
//         price: "Rp500.000/bulan",
//         image: "/image/kos.png",
//         bed: "6bd.",
//         bath: "3ba.",
//         door: "7dr.",
//       },
//       {
//         id: 5,
//         name: "Kost Putra Idaman",
//         location: "Entire House in Klojen",
//         price: "Rp700.000/bulan",
//         image: "/image/kos.png",
//         bed: "4bd.",
//         bath: "2ba.",
//         door: "5dr.",
//       },
//       {
//         id: 6,
//         name: "Kost Harmoni",
//         location: "Entire House in Lowokwaru",
//         price: "Rp650.000/bulan",
//         image: "/image/kos.png",
//         bed: "5bd.",
//         bath: "2ba.",
//         door: "6dr.",
//       },
//     ];
//     setKostList(dummy);
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Peta Indonesia (FULL BACKGROUND) */}
//       <section
//         className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('/image/peta.png')" }}
//       ></section>

//       {/* Konten utama (Card Kost) */}
//       <main className="flex-1 bg-white py-10 px-20">
//         <div className="grid grid-cols-3 gap-8">
//           {kostList.map((kost) => (
//             <div
//               key={kost.id}
//               className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
//             >
//               {/* Gambar */}
//               <div className="relative">
//                 <Image
//                   src={kost.image}
//                   alt={kost.name}
//                   width={400}
//                   height={200}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-3 right-3 bg-[#419B98] text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md">
//                   {kost.price}
//                 </div>
//               </div>

//               {/* Konten */}
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                   {kost.name}
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-4">{kost.location}</p>

//                 <hr className="mb-4 border-gray-200" />

//                 {/* Icon info */}
//                 <div className="flex justify-center items-center gap-8 text-gray-600 text-sm mb-5">
//                   <div className="flex items-center gap-1.5">
//                     <Bed size={17} className="text-gray-700" />
//                     <span>{kost.bed}</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <Bath size={17} className="text-gray-700" />
//                     <span>{kost.bath}</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <DoorClosed size={17} className="text-gray-700" />
//                     <span>{kost.door}</span>
//                   </div>
//                 </div>

//                 {/* Tombol ask for subs + More Details */}
//                 <div className="flex flex-row justify-between items-center">
//                   <button className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition text-sm">
//                     <MessageSquare size={16} />
//                     ask for subs
//                   </button>

//                   {/* ✅ Tombol menuju halaman detail */}
//                   <Link href={`/detail`}>
//                     <button className="text-gray-400 text-xs mt-2 hover:underline">
//                       More Details
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

      
  

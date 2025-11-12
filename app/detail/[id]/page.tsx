"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Bed, Bath, DoorClosed } from "lucide-react";
import { kostData } from "@/data/kosData";

export default function KostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const kost = kostData.find((k) => k.id === Number(id));

  if (!kost) {
    return <p className="text-center mt-20 text-gray-600">Kost not found.</p>;
  }

  return (
    <div className="flex flex-col items-center py-10 px-6 md:px-20 lg:px-32 text-gray-800">
      {/* Tombol Kembali */}
      <div className="w-full max-w-3xl mb-6 mr-60">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-gray-700 border border-gray-400 px-5 py-2 rounded-md hover:bg-gray-100 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Gambar utama */}
      <div className="relative w-full h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-md">
        <Image src={kost.image} alt={kost.name} fill className="object-cover" />
      </div>

      {/* Judul */}
      <h1 className="text-2xl md:text-3xl font-semibold mt-10 text-center">
        {kost.name}
      </h1>

      {/* Bagian info */}
      <div className="w-full max-w-1xl mt-10 space-y-6 bg-gray-50 p-6 shadow-sm rounded-lg">
        {/* Informasi utama disusun sejajar kiri-kanan */}
        <div className="flex flex-col gap-6 text-sm md:text-base">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700 w-40">
              rent per mont:
            </span>
            <span className="text-gray-600">{kost.price}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700 w-40">
              refund payment:
            </span>
            <span className="text-gray-600">-</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700 w-40">
              tenure in mont:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">3</span>
              <span className="border border-gray-400 rounded-full px-2 text-[#2E6D6A] font-medium">
                6
              </span>
              <span className="text-gray-600">9</span>
              <span className="text-gray-600">12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fasilitas ikon */}
      <div className="flex justify-center items-center gap-16 mt-10 text-gray-700">
        <div className="flex flex-col items-center">
          <div className="p-3 border-2 border-black rounded-full flex items-center justify-center">
            <Bed size={28} className="font-bold" />
          </div>
          <span className="text-sm mt-2">{kost.bed} bed</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-3 border-2 border-black rounded-full flex items-center justify-center">
            <Bath size={28} className="font-bold" />
          </div>
          <span className="text-sm mt-2">{kost.bath} bathroom</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-3 border-2 border-black rounded-full flex items-center justify-center">
            <DoorClosed size={28} className="font-bold" />
          </div>
          <span className="text-sm mt-2">{kost.door} door room </span>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="w-full mt-10">
        <h2 className="font-semibold text-base md:text-lg mb-3">
          Description Facilitie:
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
          {kost.description}
        </p>
      </div>

      {/* Tombol Rent */}
      <div className="flex justify-end w-full max-w-3xl mt-12">
        <button className="border border-gray-400 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-100 transition text-sm md:text-base">
          Rent Now
        </button>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";

// export default function KostDetailPage() {
//   return (
//     <div className="flex flex-col items-center py-10 px-6 md:px-20 lg:px-32 text-gray-800">
//       {/* Image */}
//       <div className="relative w-full max-w-4xl h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md">
//         <Image
//           src="/image/kamar.png"
//           alt="Kost Remaja Sawojajar"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Title */}
//       <h1 className="text-2xl md:text-3xl font-semibold mt-8">
//         Kost Remaja Sawojajar
//       </h1>

//       {/* Info Section */}
//       <div className="mt-8 space-y-3 text-sm md:text-base">
//         <p>
//           <span className="font-semibold">rent per month:</span> 500 $
//         </p>
//         <p>
//           <span className="font-semibold">refund payment:</span> -
//         </p>
//         <p className="flex items-center gap-2">
//           <span className="font-semibold">tenure in month:</span>
//           <span>3</span> -{" "}
//           <span className="border border-gray-400 rounded-full px-2 py-0.5">
//             6
//           </span>{" "}
//           - <span>9</span> - <span>12</span>
//         </p>
//       </div>

//       {/* Facilities Icons */}
//       <div className="flex justify-center items-center gap-8 text-gray-600 text-sm mb-5">
//         <div className="flex items-center gap-1.5">
//           <Bed size={17} className="text-gray-700" />
//           <span>{kost.bed}</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <Bath size={17} className="text-gray-700" />
//           <span>{kost.bath}</span>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <DoorClosed size={17} className="text-gray-700" />
//           <span>{kost.door}</span>
//         </div>
//       </div>
//       <div className="flex flex-wrap justify-center gap-8 mt-10">
//         <div className="flex flex-col items-center">
//           <Image
//             src="/icons/bed.svg"
//             alt="Bed Icon"
//             width={40}
//             height={40}
//             className="opacity-80"
//           />
//           <p className="text-sm mt-2">6bed</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <Image
//             src="/icons/bathroom.svg"
//             alt="Bathroom Icon"
//             width={40}
//             height={40}
//             className="opacity-80"
//           />
//           <p className="text-sm mt-2">3bathroom</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <Image
//             src="/icons/room.svg"
//             alt="Room Icon"
//             width={40}
//             height={40}
//             className="opacity-80"
//           />
//           <p className="text-sm mt-2">7door room</p>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="max-w-3xl mt-10 text-justify">
//         <h2 className="font-semibold text-base md:text-lg mb-3">
//           Description Facilities:
//         </h2>
//         <p className="text-sm md:text-base leading-relaxed">
//           Kost Sawojajar merupakan pilihan hunian yang nyaman dan strategis di
//           Malang. Terletak di lingkungan yang aman dan tenang, kost ini cocok
//           untuk mahasiswa maupun pekerja. Setiap kamar tersedia dalam kondisi
//           bersih dengan fasilitas tempat tidur, lemari, serta meja belajar, dan
//           beberapa kamar dilengkapi kamar mandi dalam maupun pendingin ruangan
//           sesuai kebutuhan. Penghuni juga dapat menggunakan fasilitas umum
//           seperti dapur bersama, ruang santai, parkiran luas, serta akses
//           internet WiFi yang stabil.
//         </p>
//       </div>

//       {/* Button */}
//       <button className="mt-12 bg-[#2E6D6A] text-white px-8 py-3 rounded-md shadow hover:bg-[#245a57] transition">
//         Rent Now
//       </button>
//     </div>
//   );
// }

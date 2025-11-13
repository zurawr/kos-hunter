// Static data for dashboard user and detail page
export interface KosData {
  id: number;
  name: string;
  address: string;
  location: string;
  price: string;
  price_per_month: number;
  gender: "male" | "female" | "all";
  image: string;
  bed: string;
  bath: string;
  door: string;
  facilities: number;
  photos: number;
  description: string;
}

export const kostData: KosData[] = [
  {
    id: 1,
    name: "Kost Remaja Sawojajar",
    address: "Jalan Sawojajar, Kota Malang",
    location: "Entire House in Sawojajar",
    price: "Rp500.000/bulan",
    price_per_month: 500000,
    gender: "male",
    image: "/image/kos.png",
    bed: "6",
    bath: "3",
    door: "7",
    facilities: 6,
    photos: 8,
    description:
      "Kost Sawojajar merupakan pilihan hunian yang nyaman dan strategis di Malang. Terletak di lingkungan yang aman dan tenang, cocok untuk mahasiswa maupun pekerja. Setiap kamar tersedia dalam kondisi bersih dengan fasilitas tempat tidur, lemari, serta meja belajar, dan beberapa kamar dilengkapi kamar mandi dalam maupun pendingin ruangan sesuai kebutuhan. Penghuni juga dapat menggunakan fasilitas umum seperti dapur bersama, ruang santai, parkiran luas, serta akses internet WiFi yang stabil.",
  },
  {
    id: 2,
    name: "Kost Putra Idaman",
    address: "Jalan Klojen, Kota Malang",
    location: "Entire House in Klojen",
    price: "Rp700.000/bulan",
    price_per_month: 700000,
    gender: "female",
    image: "/image/kos.png",
    bed: "4",
    bath: "2",
    door: "5",
    facilities: 5,
    photos: 6,
    description:
      "Kost Putra Idaman berlokasi di Klojen, dekat pusat kota Malang. Dilengkapi dengan kamar yang luas dan nyaman, area parkir yang memadai, ruang bersama untuk bersosialisasi, serta sistem keamanan 24 jam. Lokasi strategis dengan akses mudah ke berbagai fasilitas umum seperti minimarket, warung makan, dan transportasi umum.",
  },
  {
    id: 3,
    name: "Kost Harmoni",
    address: "Jalan Lowokwaru, Kota Malang",
    location: "Entire House in Lowokwaru",
    price: "Rp650.000/bulan",
    price_per_month: 650000,
    gender: "all",
    image: "/image/kos.png",
    bed: "5",
    bath: "2",
    door: "6",
    facilities: 7,
    photos: 10,
    description:
      "Kost Harmoni menawarkan hunian nyaman dengan harga terjangkau di area Lowokwaru. Fasilitas lengkap termasuk WiFi gratis, dapur bersama yang bersih, ruang tamu yang nyaman, dan kamar mandi dalam. Lingkungan bersih dan aman, cocok untuk mahasiswa dan karyawan. Dekat dengan kampus dan pusat perbelanjaan.",
  },
  {
    id: 4,
    name: "Kost Sejahtera",
    address: "Jalan Blimbing, Kota Malang",
    location: "Entire House in Blimbing",
    price: "Rp550.000/bulan",
    price_per_month: 550000,
    gender: "male",
    image: "/image/kos.png",
    bed: "5",
    bath: "2",
    door: "6",
    facilities: 5,
    photos: 7,
    description:
      "Kost Sejahtera terletak di daerah Blimbing yang tenang dan nyaman. Menyediakan kamar dengan ukuran yang cukup luas, dilengkapi dengan tempat tidur, lemari pakaian, dan meja belajar. Fasilitas pendukung meliputi WiFi unlimited, laundry, dan parkir motor yang aman. Lingkungan bersih dengan akses mudah ke berbagai tempat penting.",
  },
  {
    id: 5,
    name: "Kost Melati",
    address: "Jalan Sukun, Kota Malang",
    location: "Entire House in Sukun",
    price: "Rp600.000/bulan",
    price_per_month: 600000,
    gender: "female",
    image: "/image/kos.png",
    bed: "4",
    bath: "3",
    door: "5",
    facilities: 6,
    photos: 9,
    description:
      "Kost Melati khusus untuk wanita, menawarkan kenyamanan dan keamanan maksimal. Setiap kamar dilengkapi dengan AC, kamar mandi dalam, dan jendela lebar untuk sirkulasi udara yang baik. Fasilitas tambahan seperti dapur bersih, ruang jemur, dan area parkir yang luas. Pengelola ramah dan responsif terhadap kebutuhan penghuni.",
  },
  {
    id: 6,
    name: "Kost Graha Indah",
    address: "Jalan Dinoyo, Kota Malang",
    location: "Entire House in Dinoyo",
    price: "Rp750.000/bulan",
    price_per_month: 750000,
    gender: "all",
    image: "/image/kos.png",
    bed: "6",
    bath: "3",
    door: "8",
    facilities: 8,
    photos: 12,
    description:
      "Kost Graha Indah adalah pilihan premium untuk Anda yang mengutamakan kualitas. Kamar-kamar berukuran besar dengan interior modern, AC, kamar mandi dalam, dan balkon pribadi. Fasilitas lengkap termasuk WiFi fiber optik, smart TV di ruang bersama, dapur modern, mesin cuci, dan keamanan 24 jam dengan CCTV. Lokasi strategis dekat kampus dan pusat bisnis.",
  },
];

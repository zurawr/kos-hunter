# 🏠 Kos Hunter - API Integration Complete

Implementasi lengkap semua endpoint API dari dokumentasi UKK KOS Postman Collection.

## 📦 Apa yang Sudah Diimplementasikan?

### ✅ Files yang Dibuat/Diupdate

1. **`types/index.ts`** - TypeScript type definitions untuk semua data
2. **`lib/api.ts`** - Fungsi API lengkap untuk semua endpoint
3. **`lib/hooks.ts`** - Custom React hooks untuk operasi API
4. **`contexts/AuthContext.tsx`** - Context untuk authentication
5. **`components/ProtectedRoute.tsx`** - Component untuk protected routes
6. **`app/layout.tsx`** - Updated dengan AuthProvider
7. **`tsconfig.json`** - Updated path aliases

### 📚 Dokumentasi

1. **`docs/API_IMPLEMENTATION_COMPLETE.md`** - Dokumentasi lengkap semua endpoint
2. **`docs/API_QUICK_REFERENCE.md`** - Quick reference guide

---

## 🚀 Cara Menggunakan

### 1. Setup (Sudah Selesai)
Semua file sudah dibuat dan siap digunakan. Tidak perlu instalasi package tambahan.

### 2. Authentication

```typescript
// Di component login
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    await login({
      email: 'user@email.com',
      password: '12345678'
    });
  };
}
```

### 3. Menggunakan API

#### Option A: Direct API Calls
```typescript
import { societyApi, ownerApi } from '@/lib/api';

// Society - Browse kos
const kosList = await societyApi.kos.getAll();

// Owner - Create kos
await ownerApi.kos.create({
  user_id: 1,
  name: 'Kos Sejahtera',
  address: 'Malang',
  price_per_month: 500000,
  gender: 'all'
});
```

#### Option B: Menggunakan Custom Hooks (Recommended)
```typescript
import { useKosList, useBookings } from '@/lib/hooks';

export default function KosPage() {
  const { kosList, loading } = useKosList();
  const { createBooking } = useBookings();
  
  // Automatic loading, error handling, dan state management
}
```

---

## 📋 API Endpoints yang Tersedia

### 🔐 Authentication
- ✅ Login
- ✅ Register
- ✅ Logout

### 👤 Society (User) Endpoints
- ✅ Browse & Search Kos
- ✅ Get Kos Detail
- ✅ Create Booking
- ✅ View My Bookings (with filters)
- ✅ Print Booking Receipt
- ✅ View Reviews
- ✅ Add Review
- ✅ Delete Review
- ✅ Update Profile

### 🏢 Owner (Admin) Endpoints
- ✅ Create Kos
- ✅ View All Kos (with search)
- ✅ Get Kos Detail
- ✅ Update Kos
- ✅ Delete Kos
- ✅ Manage Facilities (CRUD)
- ✅ Manage Images (CRUD + Upload)
- ✅ View Bookings (with filters)
- ✅ Update Booking Status (Accept/Reject)
- ✅ View Reviews
- ✅ Add Review (as owner)
- ✅ Update Profile

### 🔧 App Maker
- ✅ Register App Maker
- ✅ Get Maker Info

---

## 🎯 Contoh Implementasi Lengkap

### 1. Login Page
```typescript
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Auto redirect to dashboard based on role
    } catch (error) {
      alert('Login gagal!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
        required
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

### 2. Kos List Page (Society)
```typescript
'use client';
import { useKosList } from '@/lib/hooks';
import Link from 'next/link';

export default function KosListPage() {
  const { kosList, loading, search, setSearch } = useKosList();

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari kos..."
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {kosList.map((kos) => (
            <Link key={kos.id} href={`/detail/${kos.id}`}>
              <div className="border p-4 rounded">
                <h3 className="font-bold">{kos.name}</h3>
                <p>{kos.address}</p>
                <p className="text-green-600">
                  Rp {kos.price_per_month.toLocaleString()}/bulan
                </p>
                <span className="text-sm text-gray-500">
                  {kos.gender === 'all' ? 'Campur' : kos.gender === 'male' ? 'Putra' : 'Putri'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3. Booking Management (Owner)
```typescript
'use client';
import { useState } from 'react';
import { useOwnerBookings } from '@/lib/hooks';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BookingManagementPage() {
  const [filter, setFilter] = useState<'pending' | 'accept' | 'reject' | ''>('pending');
  const { bookings, updateBookingStatus, loading } = useOwnerBookings(filter);

  const handleAccept = async (id: number) => {
    try {
      await updateBookingStatus(id, 'accept');
      alert('Booking diterima!');
    } catch (error) {
      alert('Gagal update status!');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateBookingStatus(id, 'reject');
      alert('Booking ditolak!');
    } catch (error) {
      alert('Gagal update status!');
    }
  };

  return (
    <ProtectedRoute requiredRole="owner">
      <div>
        <h1 className="text-2xl font-bold mb-4">Manajemen Booking</h1>
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as any)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">Semua</option>
          <option value="pending">Pending</option>
          <option value="accept">Diterima</option>
          <option value="reject">Ditolak</option>
        </select>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded">
                <h3 className="font-bold">{booking.kos?.name}</h3>
                <p>User: {booking.user?.name}</p>
                <p>Periode: {booking.start_date} s/d {booking.end_date}</p>
                <p>Status: 
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    booking.status === 'pending' ? 'bg-yellow-200' :
                    booking.status === 'accept' ? 'bg-green-200' :
                    'bg-red-200'
                  }`}>
                    {booking.status}
                  </span>
                </p>

                {booking.status === 'pending' && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleAccept(booking.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Terima
                    </button>
                    <button
                      onClick={() => handleReject(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
```

### 4. Image Upload (Owner)
```typescript
'use client';
import { useState } from 'react';
import { useKosImages } from '@/lib/hooks';

export default function ImageManager({ kosId }: { kosId: number }) {
  const { images, uploadImage, deleteImage, loading } = useKosImages(kosId);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadImage(file);
      alert('Gambar berhasil diupload!');
    } catch (error) {
      alert('Upload gagal!');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus gambar ini?')) return;
    
    try {
      await deleteImage(id);
      alert('Gambar berhasil dihapus!');
    } catch (error) {
      alert('Hapus gambar gagal!');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Galeri Kos</h2>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="border p-2 rounded"
        />
        {uploading && <span className="ml-2">Uploading...</span>}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img 
                src={image.image_url} 
                alt="Kos" 
                className="w-full h-40 object-cover rounded"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🔒 Protected Routes

Gunakan `ProtectedRoute` component untuk halaman yang memerlukan authentication:

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

// Owner only
export default function OwnerPage() {
  return (
    <ProtectedRoute requiredRole="owner">
      <div>Owner Dashboard</div>
    </ProtectedRoute>
  );
}

// Society only
export default function UserPage() {
  return (
    <ProtectedRoute requiredRole="society">
      <div>User Dashboard</div>
    </ProtectedRoute>
  );
}

// Any authenticated user
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
}
```

---

## 🎣 Available Custom Hooks

### Society Hooks
- `useKosList(initialSearch?)` - Browse & search kos
- `useKosDetail(id)` - Get kos detail
- `useBookings(statusFilter?)` - Manage user bookings
- `useReviews(kosId)` - Manage reviews

### Owner Hooks
- `useOwnerKos(initialSearch?)` - Manage kos list
- `useFacilities(kosId)` - Manage facilities
- `useKosImages(kosId)` - Manage images
- `useOwnerBookings(statusFilter?, dateFilter?)` - Manage bookings

Semua hooks include:
- Automatic loading state
- Error handling
- CRUD operations
- Auto refetch after mutations

---

## 📖 Dokumentasi Lengkap

1. **API Implementation Complete**: `docs/API_IMPLEMENTATION_COMPLETE.md`
   - Dokumentasi detail semua endpoint
   - Contoh request/response
   - Type definitions

2. **API Quick Reference**: `docs/API_QUICK_REFERENCE.md`
   - Quick reference untuk development
   - Common use cases
   - Code snippets

---

## 🔧 Configuration

### API Base URL
```typescript
// lib/api.ts
const API_BASE_URL = 'https://learn.smktelkom-mlg.sch.id/kos/api';
const MAKER_ID = '1';
```

### Headers
Semua request otomatis include:
- `MakerID: 1`
- `Content-Type: application/json` (kecuali FormData)
- `Authorization: Bearer {token}` (untuk protected endpoints)

---

## 🎯 Next Steps

1. **Styling**: Tambahkan styling ke component-component
2. **Error Messages**: Implementasi error handling yang lebih baik dengan toast/notifications
3. **Loading States**: Tambahkan skeleton loaders
4. **Image Optimization**: Gunakan Next.js Image component
5. **Form Validation**: Tambahkan validasi form
6. **Pagination**: Implementasi pagination untuk list
7. **Search Debounce**: Tambahkan debounce untuk search

---

## 📝 Notes

- ✅ Semua endpoint dari Postman collection sudah diimplementasikan
- ✅ TypeScript types lengkap untuk type safety
- ✅ Custom hooks untuk easy state management
- ✅ Protected routes untuk authorization
- ✅ Authentication context dengan auto-redirect
- ✅ Error handling di semua API calls
- ✅ Support untuk file upload (images)
- ✅ LocalStorage untuk persistent auth

---

## 🐛 Troubleshooting

### Token expired
```typescript
// Token akan expired setelah 1 jam (3600 detik)
// User perlu login ulang
```

### 401 Unauthorized
```typescript
// Pastikan user sudah login dan token tersimpan
const isAuth = apiUtils.isAuthenticated();
if (!isAuth) {
  router.push('/login');
}
```

### CORS Issues
```typescript
// API sudah menghandle CORS
// Pastikan request include proper headers
```

---

## 📧 Support

Jika ada pertanyaan atau issue, silakan check dokumentasi lengkap di `docs/` folder.

---

**Status**: ✅ READY TO USE

Semua endpoint API sudah diimplementasikan dan siap digunakan dalam development!

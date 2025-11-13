# API Quick Reference Guide

## 🚀 Quick Start

### 1. Import API Functions
```typescript
import { authApi, societyApi, ownerApi, apiUtils } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
```

### 2. Authentication
```typescript
// Login
const { login } = useAuth();
await login({ email: 'user@email.com', password: '12345678' });

// Register
await authApi.register({
  name: 'John Doe',
  email: 'john@email.com',
  phone: '08123456789',
  password: '12345678',
  role: 'society' // or 'owner'
});

// Logout
const { logout } = useAuth();
logout();
```

---

## 🏠 Society (User) APIs

### Browse Kos
```typescript
// Get all kos
const response = await societyApi.kos.getAll();
const kosList = response.data;

// Search kos
const results = await societyApi.kos.getAll({ search: 'malang' });

// Get kos detail
const detail = await societyApi.kos.getDetail(kosId);
```

### Bookings
```typescript
// Create booking
await societyApi.bookings.create({
  kos_id: 2,
  start_date: '2025-08-01',
  end_date: '2025-12-20'
});

// Get my bookings
const allBookings = await societyApi.bookings.getAll();
const pending = await societyApi.bookings.getAll('pending');
const accepted = await societyApi.bookings.getAll('accept');

// Print receipt
const receipt = await societyApi.bookings.printReceipt(bookingId);
```

### Reviews
```typescript
// Get reviews
const reviews = await societyApi.reviews.getAll(kosId);

// Add review
await societyApi.reviews.create(kosId, { review: 'Great place!' });

// Delete review
await societyApi.reviews.delete(reviewId);
```

### Profile
```typescript
// Update profile
await societyApi.profile.update({
  name: 'John Updated',
  email: 'new@email.com',
  phone: '08999999999'
});
```

---

## 🏢 Owner (Admin) APIs

### Manage Kos
```typescript
// Create kos
await ownerApi.kos.create({
  user_id: 1,
  name: 'Kos Sejahtera',
  address: 'Jl. Malang No. 123',
  price_per_month: 500000,
  gender: 'all' // 'male', 'female', or 'all'
});

// Get all kos
const kosList = await ownerApi.kos.getAll();
const search = await ownerApi.kos.getAll({ search: 'sejahtera' });

// Get kos detail
const detail = await ownerApi.kos.getDetail(kosId);

// Update kos
await ownerApi.kos.update(kosId, {
  name: 'Updated Name',
  price_per_month: 600000
});

// Delete kos
await ownerApi.kos.delete(kosId);
```

### Manage Facilities
```typescript
// Get all facilities
const facilities = await ownerApi.facilities.getAll(kosId);

// Add facility
await ownerApi.facilities.create(kosId, { facility_name: 'WiFi' });

// Update facility
await ownerApi.facilities.update(facilityId, { facility_name: 'AC' });

// Delete facility
await ownerApi.facilities.delete(facilityId);
```

### Manage Images
```typescript
// Get all images
const images = await ownerApi.images.getAll(kosId);

// Upload image
const file = event.target.files[0];
await ownerApi.images.upload(kosId, file);

// Update image
await ownerApi.images.update(imageId, newFile);

// Delete image
await ownerApi.images.delete(imageId);
```

### Manage Bookings
```typescript
// Get all bookings
const all = await ownerApi.bookings.getAll();

// Filter by status
const pending = await ownerApi.bookings.getAll({ status: 'pending' });

// Filter by date
const today = await ownerApi.bookings.getAll({ tgl: '2025-08-31' });

// Filter by both
const filtered = await ownerApi.bookings.getAll({ 
  status: 'accept', 
  tgl: '2025-08-31' 
});

// Update booking status
await ownerApi.bookings.updateStatus(bookingId, { status: 'accept' });
await ownerApi.bookings.updateStatus(bookingId, { status: 'reject' });
```

### Manage Reviews (Owner)
```typescript
// Get reviews for kos
const reviews = await ownerApi.reviews.getAll(kosId);

// Add review as owner
await ownerApi.reviews.create(kosId, { review: 'Thank you!' });
```

---

## 🎣 Using Custom Hooks

### Society Hooks
```typescript
import { useKosList, useBookings, useReviews } from '@/lib/hooks';

// Kos list with search
const { kosList, loading, search, setSearch } = useKosList();

// User bookings
const { bookings, createBooking } = useBookings('pending');
await createBooking(kosId, '2025-08-01', '2025-12-20');

// Reviews
const { reviews, addReview, deleteReview } = useReviews(kosId);
await addReview('Great kos!');
await deleteReview(reviewId);
```

### Owner Hooks
```typescript
import { useOwnerKos, useFacilities, useKosImages, useOwnerBookings } from '@/lib/hooks';

// Manage kos
const { kosList, deleteKos } = useOwnerKos();
await deleteKos(kosId);

// Manage facilities
const { facilities, addFacility, deleteFacility } = useFacilities(kosId);
await addFacility('WiFi');

// Manage images
const { images, uploadImage, deleteImage } = useKosImages(kosId);
await uploadImage(file);

// Manage bookings
const { bookings, updateBookingStatus } = useOwnerBookings('pending');
await updateBookingStatus(bookingId, 'accept');
```

---

## 🛡️ Protected Routes

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

// Society only page
export default function UserPage() {
  return (
    <ProtectedRoute requiredRole="society">
      <div>Society Content</div>
    </ProtectedRoute>
  );
}

// Owner only page
export default function OwnerPage() {
  return (
    <ProtectedRoute requiredRole="owner">
      <div>Owner Content</div>
    </ProtectedRoute>
  );
}

// Any authenticated user
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard Content</div>
    </ProtectedRoute>
  );
}
```

---

## 🔧 Utility Functions

```typescript
import { apiUtils } from '@/lib/api';

// Check authentication
const isLoggedIn = apiUtils.isAuthenticated();

// Get current user
const user = apiUtils.getCurrentUser();

// Check role
const isOwner = apiUtils.isOwner();
const isSociety = apiUtils.isSociety();
```

---

## 📋 Complete Component Examples

### Login Component
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
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
}
```

### Kos List Component
```typescript
'use client';
import { useKosList } from '@/lib/hooks';

export default function KosListPage() {
  const { kosList, loading, search, setSearch } = useKosList();

  return (
    <div>
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search..." 
      />
      {loading ? <p>Loading...</p> : (
        kosList.map(kos => (
          <div key={kos.id}>
            <h3>{kos.name}</h3>
            <p>Rp {kos.price_per_month.toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

### Booking Form Component
```typescript
'use client';
import { useState } from 'react';
import { useBookings } from '@/lib/hooks';

export default function BookingForm({ kosId }: { kosId: number }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { createBooking } = useBookings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking(kosId, startDate, endDate);
      alert('Booking successful!');
    } catch (error) {
      alert('Booking failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button type="submit">Book Now</button>
    </form>
  );
}
```

### Image Upload Component
```typescript
'use client';
import { useKosImages } from '@/lib/hooks';

export default function ImageUpload({ kosId }: { kosId: number }) {
  const { uploadImage } = useKosImages(kosId);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadImage(file);
        alert('Upload successful!');
      } catch (error) {
        alert('Upload failed!');
      }
    }
  };

  return <input type="file" accept="image/*" onChange={handleUpload} />;
}
```

### Booking Management Component
```typescript
'use client';
import { useOwnerBookings } from '@/lib/hooks';

export default function BookingManagement() {
  const { bookings, updateBookingStatus, loading } = useOwnerBookings('pending');

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        bookings.map(booking => (
          <div key={booking.id}>
            <h3>{booking.kos?.name}</h3>
            <p>Status: {booking.status}</p>
            <button onClick={() => updateBookingStatus(booking.id, 'accept')}>
              Accept
            </button>
            <button onClick={() => updateBookingStatus(booking.id, 'reject')}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}
```

---

## 🎯 API Endpoints Summary

### Authentication
- `POST /login` - Login
- `POST /register` - Register

### Society
- `GET /society/show_kos?search=` - Browse kos
- `GET /society/detail_kos/:id` - Kos detail
- `POST /society/booking` - Create booking
- `GET /society/show_bookings?status=` - My bookings
- `GET /society/cetak_nota/:id` - Print receipt
- `GET /society/show_reviews/:kosId` - Get reviews
- `POST /society/store_reviews/:kosId` - Add review
- `DELETE /society/delete_review/:id` - Delete review
- `PUT /society/update_profile` - Update profile

### Owner/Admin
- `POST /admin/store_kos` - Create kos
- `GET /admin/show_kos?search=` - Get all kos
- `GET /admin/detail_kos/:id` - Kos detail
- `PUT /update_kos/:id` - Update kos
- `DELETE /delete_kos/:id` - Delete kos
- `GET /show_facilities/:kosId` - Get facilities
- `POST /store_facility/:kosId` - Add facility
- `PUT /update_facility/:id` - Update facility
- `DELETE /delete_facility/:id` - Delete facility
- `GET /admin/show_image/:kosId` - Get images
- `POST /admin/upload_image/:kosId` - Upload image
- `POST /admin/update_image/:id` - Update image
- `DELETE /admin/delete_image/:id` - Delete image
- `GET /admin/show_bookings?status=&tgl=` - Get bookings
- `PUT /admin/update_status_booking/:id` - Update booking status
- `GET /admin/show_reviews/:kosId` - Get reviews
- `PUT /admin/update_profile` - Update profile

---

## ⚙️ Environment Setup

No additional environment variables needed. The API base URL is hardcoded:
```typescript
const API_BASE_URL = 'https://learn.smktelkom-mlg.sch.id/kos/api';
```

All requests include:
- `MakerID: 1` header
- `Authorization: Bearer {token}` header (for protected routes)

---

## 🐛 Error Handling

All API functions throw errors:
```typescript
try {
  const response = await societyApi.kos.getAll();
  // Success
} catch (error) {
  console.error(error);
  alert(error.message);
}
```

---

## 📱 TypeScript Types

All types are available from `@/types`:
```typescript
import { User, Kos, Booking, Review, Facility, KosImage } from '@/types';
```

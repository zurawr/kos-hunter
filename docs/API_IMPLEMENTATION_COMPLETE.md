# API Implementation - Complete Documentation

This document provides comprehensive documentation for all implemented API endpoints based on the UKK KOS Postman collection.

## Base URL
```
https://learn.smktelkom-mlg.sch.id/kos/api
```

## Table of Contents
- [Authentication](#authentication)
- [App Maker](#app-maker)
- [Owner/Admin Endpoints](#owneradmin-endpoints)
- [Society/User Endpoints](#societyuser-endpoints)
- [Usage Examples](#usage-examples)

---

## Authentication

### Login
```typescript
import { authApi } from '@/lib/api';

// Login
const handleLogin = async () => {
  try {
    const response = await authApi.login({
      email: 'admin@gmail.com',
      password: '12345678'
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Register
```typescript
// Register as Owner
const handleRegister = async () => {
  try {
    const response = await authApi.register({
      name: 'Budi',
      email: 'owner@gmail.com',
      phone: '09876543456',
      password: '12345678',
      role: 'owner' // or 'society'
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### Logout
```typescript
// Logout (client-side)
authApi.logout();
```

---

## App Maker

### Register App Maker
```typescript
import { appMakerApi } from '@/lib/api';

const registerMaker = async () => {
  const response = await appMakerApi.register({
    name: 'admin',
    school_class: 'sarpra'
  });
};
```

### Get Maker
```typescript
const getMaker = async () => {
  const response = await appMakerApi.getMaker();
  console.log('Maker info:', response.data);
};
```

---

## Owner/Admin Endpoints

### Master Kos Management

#### Create Kos
```typescript
import { ownerApi } from '@/lib/api';

const createKos = async () => {
  const response = await ownerApi.kos.create({
    user_id: 1,
    name: 'Kos Biru',
    address: 'Malang',
    price_per_month: 10000,
    gender: 'male' // 'male', 'female', or 'all'
  });
};
```

#### Get All Kos (with search)
```typescript
// Get all kos
const allKos = await ownerApi.kos.getAll();

// Search kos
const searchKos = await ownerApi.kos.getAll({ search: 'biru' });
```

#### Get Kos Detail
```typescript
const kosDetail = await ownerApi.kos.getDetail(1);
console.log('Kos details:', kosDetail.data);
```

#### Update Kos
```typescript
const updateKos = async () => {
  const response = await ownerApi.kos.update(2, {
    name: 'Kos Biru Updated',
    address: 'Malang',
    price_per_month: 15000,
    gender: 'all'
  });
};
```

#### Delete Kos
```typescript
const deleteKos = async () => {
  await ownerApi.kos.delete(1);
};
```

### Facilities Management

#### Get All Facilities for a Kos
```typescript
const facilities = await ownerApi.facilities.getAll(2);
console.log('Facilities:', facilities.data);
```

#### Get Facility Detail
```typescript
const facility = await ownerApi.facilities.getDetail(1);
```

#### Add Facility
```typescript
const addFacility = async () => {
  const response = await ownerApi.facilities.create(2, {
    facility_name: 'TV'
  });
};
```

#### Update Facility
```typescript
const updateFacility = async () => {
  await ownerApi.facilities.update(2, {
    facility_name: 'AC'
  });
};
```

#### Delete Facility
```typescript
await ownerApi.facilities.delete(2);
```

### Images Management

#### Get All Images for a Kos
```typescript
const images = await ownerApi.images.getAll(2);
console.log('Images:', images.data);
```

#### Get Image Detail
```typescript
const image = await ownerApi.images.getDetail(3);
```

#### Upload Image
```typescript
const uploadImage = async (file: File) => {
  const response = await ownerApi.images.upload(2, file);
  console.log('Image uploaded:', response.data);
};

// Usage in component
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    await uploadImage(file);
  }
};
```

#### Update Image
```typescript
const updateImage = async (file: File) => {
  await ownerApi.images.update(3, file);
};
```

#### Delete Image
```typescript
await ownerApi.images.delete(3);
```

### Reviews Management (Owner)

#### Get Reviews for a Kos
```typescript
const reviews = await ownerApi.reviews.getAll(2);
console.log('Reviews:', reviews.data);
```

#### Add Review (as owner)
```typescript
const addReview = async () => {
  await ownerApi.reviews.create(2, {
    review: 'Bagus ini'
  });
};
```

### Bookings Management

#### Get All Bookings with Filters
```typescript
// Get all bookings
const allBookings = await ownerApi.bookings.getAll();

// Filter by status
const pendingBookings = await ownerApi.bookings.getAll({ status: 'pending' });

// Filter by date
const dateBookings = await ownerApi.bookings.getAll({ 
  tgl: '2025-08-31' 
});

// Filter by both
const filteredBookings = await ownerApi.bookings.getAll({ 
  status: 'accept',
  tgl: '2025-08-31' 
});
```

#### Update Booking Status
```typescript
// Accept booking
const acceptBooking = async () => {
  await ownerApi.bookings.updateStatus(1, {
    status: 'accept'
  });
};

// Reject booking
const rejectBooking = async () => {
  await ownerApi.bookings.updateStatus(1, {
    status: 'reject'
  });
};
```

### Profile Management (Owner)

#### Update Profile
```typescript
const updateProfile = async () => {
  await ownerApi.profile.update({
    name: 'Admin Updated',
    email: 'admin@gmail.com',
    phone: '09876543456'
  });
};
```

---

## Society/User Endpoints

### Kos Browsing

#### Get All Kos (with search)
```typescript
import { societyApi } from '@/lib/api';

// Get all kos
const allKos = await societyApi.kos.getAll();

// Search kos
const searchResults = await societyApi.kos.getAll({ search: 'malang' });
```

#### Get Kos Detail
```typescript
const kosDetail = await societyApi.kos.getDetail(2);
console.log('Kos details:', kosDetail.data);
```

### Reviews

#### Get Reviews for a Kos
```typescript
const reviews = await societyApi.reviews.getAll(2);
console.log('Reviews:', reviews.data);
```

#### Add Review
```typescript
const addReview = async () => {
  await societyApi.reviews.create(2, {
    review: 'Bagus ini'
  });
};
```

#### Delete Review
```typescript
await societyApi.reviews.delete(1);
```

### Bookings

#### Create Booking
```typescript
const createBooking = async () => {
  const response = await societyApi.bookings.create({
    kos_id: 2,
    start_date: '2025-08-01',
    end_date: '2025-12-20'
  });
  console.log('Booking created:', response.data);
};
```

#### Get User's Bookings
```typescript
// Get all bookings
const allBookings = await societyApi.bookings.getAll();

// Filter by status
const pendingBookings = await societyApi.bookings.getAll('pending');
const acceptedBookings = await societyApi.bookings.getAll('accept');
const rejectedBookings = await societyApi.bookings.getAll('reject');
```

#### Print Booking Receipt
```typescript
const printReceipt = async () => {
  const receipt = await societyApi.bookings.printReceipt(1);
  console.log('Receipt:', receipt.data);
};
```

### Profile Management (Society)

#### Update Profile
```typescript
const updateProfile = async () => {
  await societyApi.profile.update({
    name: 'Society Updated',
    email: 'society@gmail.com',
    phone: '09876543456'
  });
};
```

---

## Utility Functions

### Check Authentication Status
```typescript
import { apiUtils } from '@/lib/api';

// Check if user is authenticated
const isLoggedIn = apiUtils.isAuthenticated();

// Get current user
const currentUser = apiUtils.getCurrentUser();

// Check user role
const isOwner = apiUtils.isOwner();
const isSociety = apiUtils.isSociety();
```

---

## Usage Examples in React Components

### Login Page Component
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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

### Kos List Component (Society)
```typescript
'use client';

import { useState, useEffect } from 'react';
import { societyApi } from '@/lib/api';
import { Kos } from '@/types';

export default function KosListPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKos();
  }, []);

  const loadKos = async () => {
    try {
      setLoading(true);
      const response = await societyApi.kos.getAll({ search });
      if (response.success && response.data) {
        setKosList(response.data);
      }
    } catch (error) {
      console.error('Error loading kos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadKos();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search kos..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {kosList.map((kos) => (
            <div key={kos.id}>
              <h3>{kos.name}</h3>
              <p>{kos.address}</p>
              <p>Rp {kos.price_per_month.toLocaleString()}/month</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Booking Component
```typescript
'use client';

import { useState } from 'react';
import { societyApi } from '@/lib/api';

export default function BookingForm({ kosId }: { kosId: number }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await societyApi.bookings.create({
        kos_id: kosId,
        start_date: startDate,
        end_date: endDate,
      });

      if (response.success) {
        alert('Booking berhasil dibuat!');
      }
    } catch (error) {
      alert('Booking gagal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  );
}
```

### Image Upload Component (Owner)
```typescript
'use client';

import { useState } from 'react';
import { ownerApi } from '@/lib/api';

export default function ImageUpload({ kosId }: { kosId: number }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await ownerApi.images.upload(kosId, file);
      
      if (response.success) {
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

### Booking Management (Owner)
```typescript
'use client';

import { useState, useEffect } from 'react';
import { ownerApi } from '@/lib/api';
import { Booking } from '@/types';

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'pending' | 'accept' | 'reject' | ''>('');

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    const response = await ownerApi.bookings.getAll({ status: filter });
    if (response.success && response.data) {
      setBookings(response.data);
    }
  };

  const handleStatusUpdate = async (id: number, status: 'accept' | 'reject') => {
    try {
      await ownerApi.bookings.updateStatus(id, { status });
      alert('Status updated!');
      loadBookings(); // Reload
    } catch (error) {
      alert('Failed to update status!');
    }
  };

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="accept">Accepted</option>
        <option value="reject">Rejected</option>
      </select>

      {bookings.map((booking) => (
        <div key={booking.id}>
          <h3>{booking.kos?.name}</h3>
          <p>User: {booking.user?.name}</p>
          <p>Status: {booking.status}</p>
          <p>Period: {booking.start_date} - {booking.end_date}</p>
          
          {booking.status === 'pending' && (
            <div>
              <button onClick={() => handleStatusUpdate(booking.id, 'accept')}>
                Accept
              </button>
              <button onClick={() => handleStatusUpdate(booking.id, 'reject')}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Protected Routes

### Create a Protected Route Component
```typescript
// components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'owner' | 'society';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (requiredRole && user?.role !== requiredRole) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, loading, requiredRole, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
```

### Usage in Pages
```typescript
// app/boarding-house-dashboard/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function OwnerDashboard() {
  return (
    <ProtectedRoute requiredRole="owner">
      <div>Owner Dashboard Content</div>
    </ProtectedRoute>
  );
}
```

---

## Error Handling

All API functions throw errors that you should handle:

```typescript
try {
  const response = await societyApi.kos.getAll();
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    // Show error to user
    alert(`Error: ${error.message}`);
  }
}
```

---

## TypeScript Types

All types are exported from `@/types`:

- `User` - User/Account data
- `Kos` - Boarding house data
- `Facility` - Facility data
- `KosImage` - Image data
- `Review` - Review data
- `Booking` - Booking data
- `AppMaker` - App maker data
- Request/Response types for each endpoint

---

## Notes

1. **MakerID Header**: All requests include `MakerID: 1` header as required
2. **Authentication**: Owner and Society endpoints require Bearer token authentication
3. **File Uploads**: Image uploads use FormData automatically
4. **LocalStorage**: Auth token and user data are stored in localStorage
5. **Response Format**: All responses follow the `ApiResponse<T>` format

---

## Complete API Object Export

You can use the default export for all APIs:

```typescript
import api from '@/lib/api';

// Auth
await api.auth.login({ email, password });

// Owner APIs
await api.owner.kos.getAll();
await api.owner.facilities.create(kosId, data);
await api.owner.images.upload(kosId, file);

// Society APIs
await api.society.kos.getAll();
await api.society.bookings.create(data);

// Utils
const isAuth = api.utils.isAuthenticated();
const currentUser = api.utils.getCurrentUser();
```

# Dashboard Separation - Admin vs User

## ✅ Implementation Complete

Berhasil membedakan Dashboard Admin (Owner) dan Dashboard User (Society) dengan karakteristik berbeda.

---

## 📊 Dashboard Comparison

| Feature | Dashboard User | Dashboard Admin |
|---------|---------------|-----------------|
| **Path** | `/dashboard` | `/boarding-house-dashboard` |
| **Data Source** | ✅ **Static Dummy** | ✅ **Dynamic API** |
| **User Role** | Society | Owner |
| **Layout** | Card Grid View | Table List View |
| **Data Count** | 6 static items | Real-time from API |
| **Search** | ❌ Not implemented | ✅ Live search |
| **CRUD** | ❌ View only | ✅ Full CRUD (future) |

---

## 🎯 Dashboard User (Society)

### Path: `/dashboard`

### Data Source: **Static Dummy Data**

```typescript
const dummyKosList = [
  {
    id: 1,
    name: "Kost Remaja Sawojajar",
    address: "Jalan Sawojajar, Kota Malang",
    price_per_month: 500000,
    gender: "male",
    image: "/image/kos.png",
    facilities: 6,
    photos: 8,
  },
  // ... 6 items total
];
```

### Features:
- ✅ Card grid layout (3 columns)
- ✅ Static 6 kos items
- ✅ Price display in Rupiah
- ✅ Gender badge
- ✅ Facilities & photos count
- ✅ Link to detail page
- ✅ Contact owner button
- ✅ Map background
- ✅ Footer with social links

### UI Components:
- Image card with price badge
- Name & address
- Icons: Bed (facilities), Bath (gender), Door (photos)
- "Contact Owner" & "More Details" buttons

---

## 🏢 Dashboard Admin (Owner)

### Path: `/boarding-house-dashboard`

### Data Source: **Dynamic API**

**Endpoint:** `GET /api/admin/show_kos`  
**Hook:** `useOwnerKos()`  
**Authentication:** Required (Owner role)

### Features:
- ✅ Table list layout
- ✅ Real-time data from API
- ✅ Live search filtering
- ✅ Loading state with spinner
- ✅ Error handling with retry
- ✅ Data normalization (kos_image → images)
- ✅ Console logging for debugging

### Table Columns:
1. **Name** - With thumbnail image
2. **Address** - Full address
3. **Price** - Formatted as "Rp X/month"
4. **Gender** - L (male), P (female), All
5. **Status** - Available (green badge)
6. **Actions** - (Future: Edit/Delete buttons)

### API Integration:
```typescript
const { kosList, loading, error, refetch } = useOwnerKos();

// API Response normalized:
// - kos_image → images[]
// - kos_facilities → facilities[]
// - price_per_month (string) → number
// - file path → full storage URL
```

### Loading State:
```typescript
if (loading) {
  return <LoadingSpinner text="Loading boarding houses..." />;
}
```

### Error State:
```typescript
if (error) {
  return <ErrorMessage error={error} onRetry={refetch} />;
}
```

### Search Feature:
```typescript
const filteredHouses = kosList.filter((house) =>
  house.name.toLowerCase().includes(search.toLowerCase())
);
```

---

## 🔧 Technical Implementation

### Dashboard User (`/dashboard/page.tsx`)
```typescript
// Static dummy data - no API calls
const kosList = dummyKosList;

// No loading/error states
// No authentication required
// Simple map rendering
```

### Dashboard Admin (`/boarding-house-dashboard/page.tsx`)
```typescript
// Dynamic API with useOwnerKos hook
const { kosList, loading, error, refetch } = useOwnerKos();

// With loading state
if (loading) return <LoadingSpinner />;

// With error handling
if (error) return <ErrorMessage />;

// With search filter
const filteredHouses = kosList.filter(...);
```

### Hook: `useOwnerKos()`
**File:** `lib/hooks.ts`

```typescript
export function useOwnerKos(initialSearch?: string) {
  const fetchKos = async () => {
    const response = await ownerApi.kos.getAll({ search });
    
    // Check both status fields
    const isSuccess = response.status === true || response.success === true;
    
    if (isSuccess && response.data) {
      // Normalize API data
      const normalized = apiUtils.normalizeKosList(response.data);
      setKosList(normalized);
    }
  };
  
  return { kosList, loading, error, search, setSearch, refetch };
}
```

---

## 🔐 Authentication & Routing

### AuthContext Redirect Logic:
```typescript
// After login:
if (userData.role === 'owner') {
  router.push('/boarding-house-dashboard'); // ✅ Admin
} else {
  router.push('/dashboard'); // ✅ User
}
```

### Role-based Access:
- **Owner** → `/boarding-house-dashboard` (API)
- **Society** → `/dashboard` (Dummy)

---

## 📝 Data Structure

### User Dashboard (Static):
```typescript
{
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
  image: string;
  facilities: number;
  photos: number;
}
```

### Admin Dashboard (Dynamic):
```typescript
{
  id: number;
  name: string;
  address: string;
  price_per_month: number | string;
  gender: 'male' | 'female' | 'all';
  images?: KosImage[];
  facilities?: Facility[];
  // ... normalized from API
}
```

---

## 🧪 Testing

### Test Dashboard User:
1. Login dengan society account
2. Redirect ke `/dashboard`
3. See 6 static kos cards
4. No API calls, no loading state

### Test Dashboard Admin:
1. Login dengan owner account (`admin@gmail.com`)
2. Redirect ke `/boarding-house-dashboard`
3. See API loading spinner
4. See real-time kos list from database
5. Try search functionality

### Console Logs (Admin only):
```
🔑 API Request: /admin/show_kos
🔐 Has Token: true
📥 API Response: /admin/show_kos 200 {...}
📊 Owner Kos List Response: { status: true, data: [...] }
✅ Normalized Owner Kos List: X items
```

---

## 🎨 UI Differences

### Dashboard User:
- **Layout:** Card grid (modern, visual)
- **Map:** Background peta Indonesia
- **Footer:** Social media links
- **Style:** Consumer-facing, friendly
- **Actions:** View details, contact owner

### Dashboard Admin:
- **Layout:** Table list (data-focused)
- **Search:** Live filter input
- **Style:** Admin panel, professional
- **Actions:** Manage (future: edit/delete)
- **Data:** Real-time, comprehensive

---

## 🚀 Future Enhancements

### Dashboard User:
- [ ] Add filter by price, gender, location
- [ ] Sort options (price, newest, popular)
- [ ] Favorites/wishlist
- [ ] Map view with markers

### Dashboard Admin:
- [ ] Add new kos button
- [ ] Edit kos functionality
- [ ] Delete kos with confirmation
- [ ] Upload images
- [ ] Manage facilities
- [ ] View bookings
- [ ] Analytics dashboard

---

## ✅ Summary

| Aspect | User Dashboard | Admin Dashboard |
|--------|---------------|-----------------|
| **Completed** | ✅ Static data | ✅ API integration |
| **Completed** | ✅ Card layout | ✅ Table layout |
| **Completed** | ✅ 6 dummy items | ✅ Real-time data |
| **Completed** | ✅ Simple view | ✅ Search filter |
| **Completed** | ✅ No auth needed | ✅ Owner auth |
| **Completed** | ✅ Footer & map | ✅ Loading/error |

Both dashboards are now fully functional with clear separation of concerns! 🎉

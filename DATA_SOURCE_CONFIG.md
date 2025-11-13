# Data Source Configuration

## Overview
Dokumen ini menjelaskan sumber data untuk setiap halaman dalam aplikasi.

## Data Sources by Page

### 1. Dashboard User Biasa (`/dashboard`)
**Data Source**: Static Data (`@/data/kosData`)

File yang digunakan:
- `data/kosData.ts`

Alasan menggunakan static data:
- User biasa hanya perlu melihat list kos yang tersedia
- Performa lebih cepat tanpa perlu fetch dari API
- Lebih stabil dan tidak bergantung pada koneksi API

```typescript
import { kostData } from "@/data/kosData";

export default function DashboardUser() {
  const kosList = kostData;
  // ... render kos list
}
```

### 2. Detail Kos Page (`/detail/[id]`)
**Data Source**: Static Data (`@/data/kosData`)

File yang digunakan:
- `data/kosData.ts`

Cara mengakses:
```typescript
import { kostData } from "@/data/kosData";

export default function KostDetailPage() {
  const { id } = useParams();
  const kost = kostData.find((k) => k.id === Number(id));
  // ... render detail
}
```

Data yang ditampilkan:
- Nama kos
- Harga per bulan
- Jumlah bed, bathroom, door
- Deskripsi lengkap
- Gambar kos
- Fasilitas

### 3. Admin Dashboard (`/admin-dashboard`)
**Data Source**: API Fetching (Future) / Static for now

Status: **Static data sementara, akan diganti dengan API**

Data yang akan di-fetch dari API:
- Total Society (jumlah penghuni)
- Total Reviews (jumlah review)
- Total Payment (jumlah pembayaran)
- Payment List (daftar pembayaran dengan status)

Placeholder API calls (untuk implementasi future):
```typescript
// TODO: Implement these API endpoints
const { stats } = useAdminStats(); // GET /api/admin/statistics
const { payments } = usePayments(); // GET /api/admin/payments
```

### 4. Boarding House Management (`/boarding-house`)
**Data Source**: API Fetching

Menggunakan hook:
- `useOwnerKos()` dari `@/lib/hooks`

API endpoint:
- GET `/kos/user/{user_id}` - Mendapatkan semua kos milik owner

```typescript
import { useOwnerKos } from "@/lib/hooks";

export default function BoardingHousePage() {
  const { kosList, loading, error, refetch } = useOwnerKos();
  // ... render boarding house list
}
```

## Static Data Structure

### File: `data/kosData.ts`

```typescript
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
  // 6 kos data objects
];
```

### Data Kos Available:
1. **Kost Remaja Sawojajar** (ID: 1)
   - Male only
   - Rp 500.000/bulan
   - 6 bed, 3 bath, 7 door

2. **Kost Putra Idaman** (ID: 2)
   - Female only
   - Rp 700.000/bulan
   - 4 bed, 2 bath, 5 door

3. **Kost Harmoni** (ID: 3)
   - All gender
   - Rp 650.000/bulan
   - 5 bed, 2 bath, 6 door

4. **Kost Sejahtera** (ID: 4)
   - Male only
   - Rp 550.000/bulan
   - 5 bed, 2 bath, 6 door

5. **Kost Melati** (ID: 5)
   - Female only
   - Rp 600.000/bulan
   - 4 bed, 3 bath, 5 door

6. **Kost Graha Indah** (ID: 6)
   - All gender
   - Rp 750.000/bulan
   - 6 bed, 3 bath, 8 door

## Migration Path: Static to API

### Phase 1: Current (Static)
- ✅ Dashboard user: Static data
- ✅ Detail page: Static data
- ⏳ Admin dashboard: Static data (placeholder)
- ✅ Boarding house: API fetching

### Phase 2: Future (API Integration)
When API endpoints become available:

1. **Admin Statistics API**
   ```typescript
   // GET /api/admin/statistics
   {
     totalSociety: number,
     totalReviews: number,
     totalPayment: number,
     lastUpdate: string
   }
   ```

2. **Payment List API**
   ```typescript
   // GET /api/admin/payments
   {
     payments: [
       {
         id: number,
         username: string,
         email: string,
         price: string,
         gender: string,
         status: "done" | "unpaid",
         avatar: string
       }
     ]
   }
   ```

3. **Public Kos List API** (Optional)
   ```typescript
   // GET /api/kos/public
   // Returns all available kos for society users
   ```

### Implementation Steps for API Migration:

1. Create API functions in `lib/api.ts`:
```typescript
export const adminApi = {
  getStatistics: async () => {
    return apiRequest<AdminStats>('/admin/statistics', {}, true);
  },
  
  getPayments: async () => {
    return apiRequest<Payment[]>('/admin/payments', {}, true);
  },
};
```

2. Create custom hooks in `lib/hooks.ts`:
```typescript
export function useAdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminApi.getStatistics();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  
  return { stats, loading };
}
```

3. Update admin dashboard to use hooks:
```typescript
export default function AdminDashboard() {
  const { stats, loading: statsLoading } = useAdminStats();
  const { payments, loading: paymentsLoading } = usePayments();
  
  if (statsLoading || paymentsLoading) {
    return <Loading />;
  }
  
  // ... render with real data
}
```

## Benefits of Current Approach

### Static Data (Dashboard & Detail)
✅ **Pros:**
- Fast loading time
- No API dependency
- Offline capable
- Predictable data structure
- Easy to test and debug

❌ **Cons:**
- Data not dynamic
- Can't show real-time updates
- Limited to predefined data

### API Fetching (Admin & Boarding House)
✅ **Pros:**
- Real-time data
- Dynamic content
- Can perform CRUD operations
- Reflects actual database state

❌ **Cons:**
- Requires API availability
- Network dependent
- Potential loading delays
- Need error handling

## File Structure

```
data/
└── kosData.ts          # Static kos data for user dashboard & detail

lib/
├── api.ts              # API functions for backend calls
└── hooks.ts            # Custom hooks for data fetching

app/
├── dashboard/
│   └── page.tsx        # Uses static data
├── detail/[id]/
│   └── page.tsx        # Uses static data
├── admin-dashboard/
│   └── page.tsx        # Uses static (will be API)
└── boarding-house/
    └── page.tsx        # Uses API
```

## Testing

### Test Static Data
1. Navigate to `/dashboard`
2. Verify 6 kos cards are displayed
3. Click "More Details" on any card
4. Verify detail page shows correct information
5. Try different kos IDs (1-6)

### Test API Data
1. Login as owner
2. Navigate to `/boarding-house`
3. Verify API fetching works
4. Check loading state
5. Verify error handling

### Test Admin Dashboard
1. Login as owner
2. Navigate to `/admin-dashboard`
3. Verify statistics display
4. Verify payment table renders
5. Check status badges

## Summary

| Page | Data Source | Status | File Location |
|------|-------------|--------|---------------|
| Dashboard User | Static | ✅ Active | `data/kosData.ts` |
| Detail Kos | Static | ✅ Active | `data/kosData.ts` |
| Admin Dashboard | Static (temp) | ⏳ Pending API | `app/admin-dashboard/page.tsx` |
| Boarding House | API | ✅ Active | `lib/api.ts` + `lib/hooks.ts` |

**Kesimpulan**: Dashboard user dan detail page menggunakan data statis yang stabil dan cepat. Admin dashboard akan menggunakan API ketika endpoint tersedia. Boarding house management sudah menggunakan API fetching.

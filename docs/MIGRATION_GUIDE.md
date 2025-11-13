# 🔄 Migration Guide - Existing Code to New API

Panduan untuk mengupdate code existing agar menggunakan API implementation yang baru.

---

## 🎯 Overview

File-file berikut sudah dibuat dan siap digunakan:
- ✅ `lib/api.ts` - All API functions
- ✅ `lib/hooks.ts` - Custom hooks
- ✅ `contexts/AuthContext.tsx` - Auth management
- ✅ `components/ProtectedRoute.tsx` - Route protection
- ✅ `types/index.ts` - TypeScript types

---

## 📋 Step-by-Step Migration

### Step 1: Update Imports

#### Before (Old Code)
```typescript
// Custom fetch calls
const response = await fetch('/api/kos');
const data = await response.json();
```

#### After (New Code)
```typescript
import { societyApi } from '@/lib/api';

const response = await societyApi.kos.getAll();
const data = response.data;
```

---

### Step 2: Replace Authentication Logic

#### Before
```typescript
// Manual localStorage handling
const handleLogin = async () => {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};
```

#### After
```typescript
import { useAuth } from '@/contexts/AuthContext';

const { login } = useAuth();
await login({ email, password }); // Auto-handles storage & redirect
```

---

### Step 3: Replace Data Fetching

#### Before
```typescript
const [kos, setKos] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchKos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kos');
      const data = await res.json();
      setKos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchKos();
}, []);
```

#### After
```typescript
import { useKosList } from '@/lib/hooks';

const { kosList, loading } = useKosList();
// That's it! Auto-loading, auto-error handling
```

---

### Step 4: Replace Form Submissions

#### Before (Booking)
```typescript
const handleBooking = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ kos_id, start_date, end_date })
    });
    const data = await res.json();
    alert('Success!');
  } catch (error) {
    alert('Failed!');
  } finally {
    setLoading(false);
  }
};
```

#### After
```typescript
import { useBookings } from '@/lib/hooks';

const { createBooking } = useBookings();

const handleBooking = async () => {
  try {
    await createBooking(kos_id, start_date, end_date);
    alert('Success!');
  } catch (error) {
    alert('Failed!');
  }
};
```

---

### Step 5: Replace File Uploads

#### Before
```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`/api/upload/${kosId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'MakerID': '1'
    },
    body: formData
  });
  
  const data = await res.json();
  // Handle response
};
```

#### After
```typescript
import { useKosImages } from '@/lib/hooks';

const { uploadImage } = useKosImages(kosId);

const handleUpload = async (file: File) => {
  try {
    await uploadImage(file);
    alert('Upload success!');
  } catch (error) {
    alert('Upload failed!');
  }
};
```

---

### Step 6: Add Protected Routes

#### Before
```typescript
// No protection
export default function OwnerDashboard() {
  return <div>Owner Content</div>;
}
```

#### After
```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function OwnerDashboard() {
  return (
    <ProtectedRoute requiredRole="owner">
      <div>Owner Content</div>
    </ProtectedRoute>
  );
}
```

---

## 🔄 Common Patterns Migration

### Pattern 1: List with Search

#### Before
```typescript
const [items, setItems] = useState([]);
const [search, setSearch] = useState('');

useEffect(() => {
  fetch(`/api/kos?search=${search}`)
    .then(res => res.json())
    .then(data => setItems(data));
}, [search]);

return (
  <>
    <input value={search} onChange={e => setSearch(e.target.value)} />
    {items.map(item => <div key={item.id}>{item.name}</div>)}
  </>
);
```

#### After
```typescript
import { useKosList } from '@/lib/hooks';

const { kosList, search, setSearch } = useKosList();

return (
  <>
    <input value={search} onChange={e => setSearch(e.target.value)} />
    {kosList.map(item => <div key={item.id}>{item.name}</div>)}
  </>
);
```

---

### Pattern 2: CRUD Operations

#### Before
```typescript
// Create
const create = async (data) => {
  await fetch('/api/kos', { method: 'POST', body: JSON.stringify(data) });
  fetchData(); // Refresh
};

// Update
const update = async (id, data) => {
  await fetch(`/api/kos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  fetchData(); // Refresh
};

// Delete
const remove = async (id) => {
  await fetch(`/api/kos/${id}`, { method: 'DELETE' });
  fetchData(); // Refresh
};
```

#### After
```typescript
import { ownerApi } from '@/lib/api';
import { useOwnerKos } from '@/lib/hooks';

const { kosList, deleteKos, refetch } = useOwnerKos();

// Create
const create = async (data) => {
  await ownerApi.kos.create(data);
  refetch(); // Auto-refresh
};

// Update
const update = async (id, data) => {
  await ownerApi.kos.update(id, data);
  refetch();
};

// Delete
const remove = async (id) => {
  await deleteKos(id); // Auto-refreshes
};
```

---

### Pattern 3: Filter & Sort

#### Before
```typescript
const [filter, setFilter] = useState('');
const [data, setData] = useState([]);

useEffect(() => {
  fetch(`/api/bookings?status=${filter}`)
    .then(res => res.json())
    .then(data => setData(data));
}, [filter]);
```

#### After
```typescript
import { useOwnerBookings } from '@/lib/hooks';

const [filter, setFilter] = useState<'pending' | 'accept' | 'reject' | ''>('');
const { bookings } = useOwnerBookings(filter);
// Auto-updates when filter changes
```

---

## 📝 Migration Checklist

### For Each Page/Component:

- [ ] Replace `fetch()` calls with API functions from `lib/api.ts`
- [ ] Replace manual state management with custom hooks from `lib/hooks.ts`
- [ ] Replace manual auth checks with `useAuth()` hook
- [ ] Wrap protected pages with `<ProtectedRoute>`
- [ ] Update type imports from `@/types`
- [ ] Remove manual localStorage handling
- [ ] Remove manual header construction
- [ ] Remove manual error handling (hooks handle it)
- [ ] Remove manual loading states (hooks provide it)
- [ ] Test the migration

---

## 🎯 Example: Full Page Migration

### Before: Kos List Page (Old)

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function KosPage() {
  const [kosList, setKosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchKos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `https://learn.smktelkom-mlg.sch.id/kos/api/society/show_kos?search=${search}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'MakerID': '1',
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        setKosList(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKos();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search kos..."
      />
      <div>
        {kosList.map((kos) => (
          <div key={kos.id}>
            <h3>{kos.name}</h3>
            <p>{kos.address}</p>
            <p>Rp {kos.price_per_month}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### After: Kos List Page (New)

```typescript
'use client';
import { useKosList } from '@/lib/hooks';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function KosPage() {
  const { kosList, loading, error, search, setSearch } = useKosList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute requiredRole="society">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search kos..."
        />
        <div>
          {kosList.map((kos) => (
            <div key={kos.id}>
              <h3>{kos.name}</h3>
              <p>{kos.address}</p>
              <p>Rp {kos.price_per_month.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

**Lines Reduced**: 60+ lines → 30 lines (50% reduction)
**Complexity**: High → Low
**Type Safety**: No → Yes
**Error Handling**: Manual → Automatic

---

## 🚨 Common Migration Issues

### Issue 1: Path Imports
```typescript
// ❌ Wrong
import { useAuth } from '../contexts/AuthContext';

// ✅ Correct
import { useAuth } from '@/contexts/AuthContext';
```

### Issue 2: Type Imports
```typescript
// ❌ Wrong
import { Kos } from '../types/index';

// ✅ Correct
import { Kos } from '@/types';
```

### Issue 3: Hook Usage
```typescript
// ❌ Wrong - calling hook conditionally
if (condition) {
  const { data } = useKosList();
}

// ✅ Correct - call at top level
const { data } = useKosList();
if (condition) {
  // use data
}
```

---

## 📊 Benefits After Migration

### Code Quality
- ✅ 50% less code
- ✅ TypeScript type safety
- ✅ Consistent error handling
- ✅ Reusable logic

### Developer Experience
- ✅ Auto-complete with TypeScript
- ✅ Less boilerplate
- ✅ Built-in loading states
- ✅ Better debugging

### Maintenance
- ✅ Single source of truth (lib/api.ts)
- ✅ Easy to update endpoints
- ✅ Centralized error handling
- ✅ Easier testing

---

## 🎓 Learning Path

1. **Start Small**: Migrate one simple component first
2. **Use Hooks**: Replace fetch with custom hooks
3. **Add Auth**: Wrap pages with ProtectedRoute
4. **Test**: Verify functionality
5. **Iterate**: Move to next component

---

## 🔗 Quick Reference

| Old Pattern | New Solution | File |
|-------------|--------------|------|
| Manual fetch | `societyApi.kos.getAll()` | `lib/api.ts` |
| useState + useEffect | `useKosList()` | `lib/hooks.ts` |
| localStorage auth | `useAuth()` | `contexts/AuthContext.tsx` |
| Manual route guard | `<ProtectedRoute>` | `components/ProtectedRoute.tsx` |
| Any types | Import from `@/types` | `types/index.ts` |

---

## ✅ Migration Complete Checklist

After migration, verify:

- [ ] All pages compile without errors
- [ ] Authentication works (login/logout)
- [ ] Protected routes redirect correctly
- [ ] Data fetching works
- [ ] Forms submit successfully
- [ ] File uploads work
- [ ] Search/filter functionality works
- [ ] Error messages display correctly
- [ ] Loading states show properly
- [ ] TypeScript has no errors

---

## 🆘 Need Help?

1. Check `docs/API_QUICK_REFERENCE.md` for code examples
2. Check `docs/API_IMPLEMENTATION_COMPLETE.md` for detailed docs
3. Check `docs/IMPLEMENTATION_README.md` for full examples
4. Look at type definitions in `types/index.ts`

---

**Migration Difficulty**: ⭐⭐ (Easy to Medium)
**Estimated Time**: 1-2 hours for full app
**Benefits**: High - Better code, less bugs, easier maintenance

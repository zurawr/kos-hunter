# Dashboard Error Fix - "anda tidak memiliki akses untuk halaman ini"

## Problem
Dashboard menampilkan error: **"anda tidak memiliki akses untuk halaman ini"**

Padahal API test di terminal berhasil dengan 93 kos data.

## Root Cause Analysis

### Issue 1: API Response Structure Mismatch
API mengembalikan `status: true`, bukan `success: true`

**Terminal Response:**
```json
{
  "status": true,    // ❌ Code mengecek 'success'
  "message": "...",
  "data": [...]
}
```

**Code Expected:**
```typescript
if (response.success && response.data) {  // ❌ Wrong field
  // ...
}
```

### Issue 2: Missing Debug Logging
Tidak ada logging untuk troubleshoot token dan API calls

## Solution Applied

### 1. Updated ApiResponse Type
**File:** `types/index.ts`

```typescript
// BEFORE
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// AFTER
export interface ApiResponse<T> {
  status?: boolean;    // ✅ API uses 'status'
  success?: boolean;   // ✅ Compatibility
  message: string;
  data?: T;
}
```

### 2. Added Debug Logging
**File:** `lib/api.ts`

```typescript
async function apiRequest<T>(...) {
  const headers = buildHeaders(includeAuth, ...);
  
  // ✅ Debug logging
  if (includeAuth) {
    const token = getAuthToken();
    console.log('🔑 API Request:', endpoint);
    console.log('🔐 Has Token:', !!token);
    console.log('📝 Headers:', headers);
  }

  const response = await fetch(...);
  const data = await response.json();
  
  console.log('📥 API Response:', endpoint, response.status, data);
  
  // ✅ Better error message
  if (!response.ok) {
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }
  
  return data;
}
```

### 3. Updated Hooks to Check Both Fields
**File:** `lib/hooks.ts`

```typescript
// useKosList hook
const fetchKos = useCallback(async () => {
  const response = await societyApi.kos.getAll({ search });
  console.log('📊 Kos List Response:', response);
  
  // ✅ Check both 'status' and 'success'
  const isSuccess = response.status === true || response.success === true;
  
  if (isSuccess && response.data) {
    const normalized = apiUtils.normalizeKosList(response.data);
    console.log('✅ Normalized Kos List:', normalized.length, 'items');
    setKosList(normalized);
  }
}, [search]);

// useKosDetail hook
const fetchKosDetail = async () => {
  const response = await societyApi.kos.getDetail(id);
  console.log('📊 Kos Detail Response:', response);
  
  // ✅ Check both 'status' and 'success'
  const isSuccess = response.status === true || response.success === true;
  
  if (isSuccess && response.data) {
    const normalized = apiUtils.normalizeKos(response.data);
    console.log('✅ Normalized Kos Detail:', normalized);
    setKos(normalized);
  }
};
```

## Debugging Steps

### 1. Open Browser Developer Console
Press `F12` or `Ctrl+Shift+I`

### 2. Check Login Token
After login, check console:
```
🔑 API Request: /login
📥 API Response: /login 200 { access_token: "...", user: {...} }
```

Check localStorage:
```javascript
localStorage.getItem('authToken')  // Should return JWT token
localStorage.getItem('user')       // Should return user JSON
```

### 3. Check Dashboard API Call
On dashboard page load:
```
🔑 API Request: /society/show_kos
🔐 Has Token: true
📝 Headers: { MakerID: '1', Authorization: 'Bearer ...', Content-Type: 'application/json' }
📥 API Response: /society/show_kos 200 { status: true, data: [...] }
📊 Kos List Response: { status: true, message: "...", data: [...] }
✅ Normalized Kos List: 93 items
```

### 4. Common Issues

#### ❌ Token Not Found
```
🔐 Has Token: false
```
**Solution:** Login lagi, check AuthContext saves token correctly

#### ❌ 401 Unauthorized
```
📥 API Response: /society/show_kos 401 { message: "Unauthorized" }
```
**Solution:** Token expired (60 min) atau invalid, login lagi

#### ❌ "anda tidak memiliki akses untuk halaman ini"
```
📥 API Response: /society/show_kos 403 { message: "anda tidak memiliki akses..." }
```
**Solution:** 
- User role mungkin bukan 'society'
- Endpoint requires different permission
- Check user role in localStorage

#### ❌ Empty Kos List
```
✅ Normalized Kos List: 0 items
```
**Solution:** Database kosong atau API filter by user

## Testing

### Manual Test Flow:
1. Clear localStorage: `localStorage.clear()`
2. Go to `/login`
3. Login dengan: `society@test.com / 12345678`
4. Check console for login logs
5. Should redirect to `/dashboard`
6. Check console for API calls
7. Should see 93+ kos cards

### Expected Console Output:
```
🔑 API Request: /login
📥 API Response: /login 200 {...}
🔑 API Request: /society/show_kos
🔐 Has Token: true
📝 Headers: {...}
📥 API Response: /society/show_kos 200 { status: true, ... }
📊 Kos List Response: { status: true, data: [93 items] }
✅ Normalized Kos List: 93 items
```

## Verification Checklist

- ✅ ApiResponse type supports both `status` and `success`
- ✅ Debug logging added to apiRequest()
- ✅ Hooks check both fields (status/success)
- ✅ Console logs show API flow
- ✅ Error messages are descriptive
- ✅ Token validation logs present

## Next Steps

1. **Test in browser** - Open app, check console logs
2. **Verify token** - Check localStorage after login
3. **Monitor API calls** - See full request/response flow
4. **Fix auth issues** - Based on console errors

## Notes

- Token expires in **60 minutes**
- API returns `status: true`, not `success: true`
- All debug logs prefixed with emoji for easy filtering:
  - 🔑 = API Request
  - 🔐 = Token Status
  - 📝 = Headers
  - 📥 = Response
  - 📊 = Data Processing
  - ✅ = Success
  - ❌ = Error

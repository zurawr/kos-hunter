# Authentication Fix - Login Token Issue

## Problem
Login API mengembalikan struktur response yang berbeda dari yang diharapkan:
- API mengembalikan `access_token` bukan `token`
- Response tidak menggunakan wrapper `ApiResponse<T>` standar
- Token tidak tersimpan dengan benar di localStorage

## API Response Structure

### Login Endpoint
```
POST https://learn.smktelkom-mlg.sch.id/kos/api/login
Header: MakerID: 1
Body: {
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

### Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 60,
  "user": {
    "id": 4,
    "name": "admin",
    "email": "admin@gmail.com",
    "phone": "09876543456",
    "role": "owner",
    "maker_id": 1,
    "created_at": "2025-09-03T01:02:39.000000Z",
    "updated_at": "2025-10-14T00:37:46.000000Z"
  }
}
```

## Changes Made

### 1. Updated LoginResponse Type
**File:** `types/index.ts`

```typescript
// BEFORE
export interface LoginResponse {
  token: string;
  user: User;
}

// AFTER
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
```

### 2. Updated authApi.login Function
**File:** `lib/api.ts`

```typescript
// BEFORE
login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

// AFTER
login: async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: buildHeaders(false, false),
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // API returns { access_token, token_type, expires_in, user }
    return data as LoginResponse;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
}
```

### 3. Updated AuthContext Login Handler
**File:** `contexts/AuthContext.tsx`

```typescript
// BEFORE
const login = async (credentials: LoginRequest) => {
  const response = await authApi.login(credentials);
  
  if (response.success && response.data) {
    const { token, user: userData } = response.data;
    apiUtils.saveAuthData(token, userData);
    // ...
  }
}

// AFTER
const login = async (credentials: LoginRequest) => {
  const response = await authApi.login(credentials);
  
  if (response && response.access_token) {
    const { access_token, user: userData } = response;
    apiUtils.saveAuthData(access_token, userData);
    // ...
  }
}
```

## Token Storage

Token disimpan di localStorage dengan key:
- `authToken`: Menyimpan access_token untuk digunakan di semua API calls
- `user`: Menyimpan data user (JSON string)

## Token Usage

Semua API endpoint yang memerlukan authentication menggunakan token dengan format:
```typescript
Authorization: Bearer {access_token}
```

Token otomatis diambil dari localStorage oleh fungsi `getAuthToken()` dan ditambahkan ke header oleh `buildHeaders(true)`.

## Test Credentials

```json
{
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

User role: `owner`

## Next Steps

1. ✅ Login sekarang berfungsi dengan benar
2. ✅ Token tersimpan di localStorage
3. ✅ Token digunakan untuk authenticated API calls
4. ⚠️ Token expires dalam 60 menit (expires_in: 60)
5. 🔜 Implementasi refresh token jika diperlukan
6. 🔜 Test semua endpoint yang memerlukan authentication

## Security Notes

- Token expired dalam 60 menit
- Token disimpan di localStorage (client-side)
- Setiap request memerlukan header `MakerID: 1`
- Authorization header: `Bearer {access_token}`

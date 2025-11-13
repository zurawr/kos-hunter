// Base API Response Types
export interface ApiResponse<T> {
  status?: boolean;  // API uses 'status'
  success?: boolean;  // Compatibility
  message: string;
  data?: T;
}

// User & Auth Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'society';
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'owner' | 'society';
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Kos Types
export interface Kos {
  id: number;
  user_id: number;
  name: string;
  address: string;
  price_per_month: number | string; // API returns string
  gender: 'male' | 'female' | 'all';
  created_at?: string;
  updated_at?: string;
  kos_image?: KosImage[];  // API uses kos_image
  kos_facilities?: Facility[];  // API uses kos_facilities
  images?: KosImage[];  // Alias for compatibility
  facilities?: Facility[];  // Alias for compatibility
  reviews?: Review[];
  owner?: User;
}

export interface KosCreateRequest {
  user_id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
}

export interface KosUpdateRequest {
  user_id?: number;
  name?: string;
  address?: string;
  price_per_month?: number;
  gender?: 'male' | 'female' | 'all';
}

// Facility Types
export interface Facility {
  id: number;
  kos_id: number;
  facility_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface FacilityRequest {
  facility_name: string;
}

// Image Types
export interface KosImage {
  id: number;
  kos_id: number;
  file?: string;  // API uses 'file' field
  image_url?: string;  // Alias for compatibility
  created_at?: string;
  updated_at?: string;
}

// Review Types
export interface Review {
  id: number;
  kos_id: number;
  user_id: number;
  review: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}

export interface ReviewRequest {
  review: string;
}

// Booking Types
export interface Booking {
  id: number;
  user_id: number;
  kos_id: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'accept' | 'reject';
  created_at?: string;
  updated_at?: string;
  kos?: Kos;
  user?: User;
}

export interface BookingCreateRequest {
  kos_id: number;
  start_date: string;
  end_date: string;
}

export interface BookingUpdateStatusRequest {
  status: 'accept' | 'reject';
}

// App Maker Types
export interface AppMaker {
  id: number;
  name: string;
  school_class: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppMakerRequest {
  name: string;
  school_class: string;
}

// Profile Update Types
export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
}

// Query Parameters
export interface KosSearchParams {
  search?: string;
}

export interface BookingFilterParams {
  status?: 'pending' | 'accept' | 'reject' | '';
  tgl?: string;
}

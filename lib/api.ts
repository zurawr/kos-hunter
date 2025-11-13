import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Kos,
  KosCreateRequest,
  KosUpdateRequest,
  KosSearchParams,
  Facility,
  FacilityRequest,
  KosImage,
  Review,
  ReviewRequest,
  Booking,
  BookingCreateRequest,
  BookingUpdateStatusRequest,
  BookingFilterParams,
  ProfileUpdateRequest,
  AppMakerRequest,
  AppMaker,
} from '@/types';

// Base API Configuration
const API_BASE_URL = 'https://learn.smktelkom-mlg.sch.id/kos/api';
const MAKER_ID = '1'; // Default Maker ID

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to build headers
const buildHeaders = (includeAuth: boolean = false, isFormData: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    'MakerID': MAKER_ID,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = false
): Promise<ApiResponse<T>> {
  try {
    const headers = buildHeaders(includeAuth, options.body instanceof FormData);
    
    // Debug logging
    if (includeAuth) {
      const token = getAuthToken();
      console.log('🔑 API Request:', endpoint);
      console.log('🔐 Has Token:', !!token);
      console.log('📝 Headers:', headers);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const data = await response.json();
    
    console.log('📥 API Response:', endpoint, response.status, data);

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('❌ API Error:', endpoint, error);
    throw error;
  }
}

// ============================================
// AUTH ENDPOINTS
// ============================================

export const authApi = {
  // Login - Returns direct response without ApiResponse wrapper
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
  },

  // Register
  register: async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout (client-side)
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
};

// ============================================
// APP MAKER ENDPOINTS
// ============================================

export const appMakerApi = {
  // Register App Maker
  register: async (data: AppMakerRequest): Promise<ApiResponse<AppMaker>> => {
    return apiRequest<AppMaker>('/register_app_maker', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get Maker
  getMaker: async (): Promise<ApiResponse<AppMaker>> => {
    return apiRequest<AppMaker>('/getmaker', {
      method: 'GET',
    });
  },
};

// ============================================
// OWNER/ADMIN ENDPOINTS
// ============================================

export const ownerApi = {
  // Master Kos Management
  kos: {
    // Create Kos
    create: async (data: KosCreateRequest): Promise<ApiResponse<Kos>> => {
      return apiRequest<Kos>('/admin/store_kos', {
        method: 'POST',
        body: JSON.stringify(data),
      }, true);
    },

    // Show All Kos (with optional search)
    getAll: async (params?: KosSearchParams): Promise<ApiResponse<Kos[]>> => {
      const queryString = params?.search ? `?search=${encodeURIComponent(params.search)}` : '';
      return apiRequest<Kos[]>(`/admin/show_kos${queryString}`, {
        method: 'GET',
      }, true);
    },

    // Get Kos Detail
    getDetail: async (id: number): Promise<ApiResponse<Kos>> => {
      return apiRequest<Kos>(`/admin/detail_kos/${id}`, {
        method: 'GET',
      }, true);
    },

    // Update Kos
    update: async (id: number, data: KosUpdateRequest): Promise<ApiResponse<Kos>> => {
      return apiRequest<Kos>(`/update_kos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true);
    },

    // Delete Kos
    delete: async (id: number): Promise<ApiResponse<null>> => {
      return apiRequest<null>(`/delete_kos/${id}`, {
        method: 'DELETE',
      }, true);
    },
  },

  // Facilities Management
  facilities: {
    // Show Facilities for a Kos
    getAll: async (kosId: number): Promise<ApiResponse<Facility[]>> => {
      return apiRequest<Facility[]>(`/show_facilities/${kosId}`, {
        method: 'GET',
      }, true);
    },

    // Get Facility Detail
    getDetail: async (id: number): Promise<ApiResponse<Facility>> => {
      return apiRequest<Facility>(`/detail_facility/${id}`, {
        method: 'GET',
      }, true);
    },

    // Add Facility
    create: async (kosId: number, data: FacilityRequest): Promise<ApiResponse<Facility>> => {
      return apiRequest<Facility>(`/store_facility/${kosId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }, true);
    },

    // Update Facility
    update: async (id: number, data: FacilityRequest): Promise<ApiResponse<Facility>> => {
      return apiRequest<Facility>(`/update_facility/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true);
    },

    // Delete Facility
    delete: async (id: number): Promise<ApiResponse<null>> => {
      return apiRequest<null>(`/delete_facility/${id}`, {
        method: 'DELETE',
      }, true);
    },
  },

  // Images Management
  images: {
    // Show Images for a Kos
    getAll: async (kosId: number): Promise<ApiResponse<KosImage[]>> => {
      return apiRequest<KosImage[]>(`/admin/show_image/${kosId}`, {
        method: 'GET',
      }, true);
    },

    // Get Image Detail
    getDetail: async (id: number): Promise<ApiResponse<KosImage>> => {
      return apiRequest<KosImage>(`/admin/detail_image/${id}`, {
        method: 'GET',
      }, true);
    },

    // Upload Image
    upload: async (kosId: number, file: File): Promise<ApiResponse<KosImage>> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiRequest<KosImage>(`/admin/upload_image/${kosId}`, {
        method: 'POST',
        body: formData,
      }, true);
    },

    // Update Image
    update: async (id: number, file: File): Promise<ApiResponse<KosImage>> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiRequest<KosImage>(`/admin/update_image/${id}`, {
        method: 'POST',
        body: formData,
      }, true);
    },

    // Delete Image
    delete: async (id: number): Promise<ApiResponse<null>> => {
      return apiRequest<null>(`/admin/delete_image/${id}`, {
        method: 'DELETE',
      }, true);
    },
  },

  // Reviews Management (Owner view)
  reviews: {
    // Get Reviews for a Kos
    getAll: async (kosId: number): Promise<ApiResponse<Review[]>> => {
      return apiRequest<Review[]>(`/admin/show_reviews/${kosId}`, {
        method: 'GET',
      }, true);
    },

    // Add Review (as owner)
    create: async (kosId: number, data: ReviewRequest): Promise<ApiResponse<Review>> => {
      return apiRequest<Review>(`/admin/store_reviews/${kosId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }, true);
    },
  },

  // Bookings Management
  bookings: {
    // Get All Bookings (with filters)
    getAll: async (params?: BookingFilterParams): Promise<ApiResponse<Booking[]>> => {
      const queryParams = new URLSearchParams();
      if (params?.status !== undefined) queryParams.append('status', params.status);
      if (params?.tgl) queryParams.append('tgl', params.tgl);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return apiRequest<Booking[]>(`/admin/show_bookings${queryString}`, {
        method: 'GET',
      }, true);
    },

    // Update Booking Status
    updateStatus: async (id: number, data: BookingUpdateStatusRequest): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>(`/admin/update_status_booking/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true);
    },
  },

  // Profile Management (Owner)
  profile: {
    update: async (data: ProfileUpdateRequest): Promise<ApiResponse<User>> => {
      return apiRequest<User>('/admin/update_profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true);
    },
  },
};

// ============================================
// SOCIETY/USER ENDPOINTS
// ============================================

export const societyApi = {
  // Kos Browsing
  kos: {
    // Show All Kos (with optional search)
    getAll: async (params?: KosSearchParams): Promise<ApiResponse<Kos[]>> => {
      const queryString = params?.search ? `?search=${encodeURIComponent(params.search)}` : '';
      return apiRequest<Kos[]>(`/society/show_kos${queryString}`, {
        method: 'GET',
      }, true);
    },

    // Get Kos Detail
    getDetail: async (id: number): Promise<ApiResponse<Kos>> => {
      return apiRequest<Kos>(`/society/detail_kos/${id}`, {
        method: 'GET',
      }, true);
    },
  },

  // Reviews
  reviews: {
    // Get Reviews for a Kos
    getAll: async (kosId: number): Promise<ApiResponse<Review[]>> => {
      return apiRequest<Review[]>(`/society/show_reviews/${kosId}`, {
        method: 'GET',
      }, true);
    },

    // Add Review
    create: async (kosId: number, data: ReviewRequest): Promise<ApiResponse<Review>> => {
      return apiRequest<Review>(`/society/store_reviews/${kosId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }, true);
    },

    // Delete Review
    delete: async (id: number): Promise<ApiResponse<null>> => {
      return apiRequest<null>(`/society/delete_review/${id}`, {
        method: 'DELETE',
      }, true);
    },
  },

  // Booking
  bookings: {
    // Create Booking
    create: async (data: BookingCreateRequest): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>('/society/booking', {
        method: 'POST',
        body: JSON.stringify(data),
      }, true);
    },

    // Show User's Bookings (with optional status filter)
    getAll: async (status?: 'pending' | 'accept' | 'reject'): Promise<ApiResponse<Booking[]>> => {
      const queryString = status ? `?status=${status}` : '';
      return apiRequest<Booking[]>(`/society/show_bookings${queryString}`, {
        method: 'GET',
      }, true);
    },

    // Print Booking Receipt
    printReceipt: async (id: number): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>(`/society/cetak_nota/${id}`, {
        method: 'GET',
      }, true);
    },
  },

  // Profile Management (Society)
  profile: {
    update: async (data: ProfileUpdateRequest): Promise<ApiResponse<User>> => {
      return apiRequest<User>('/society/update_profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true);
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const apiUtils = {
  // Normalize Kos data from API to match component expectations
  normalizeKos: (kos: Kos): Kos => {
    // Map kos_image array to images with proper image_url
    const images = kos.kos_image?.map(img => ({
      ...img,
      image_url: img.file ? `https://learn.smktelkom-mlg.sch.id/kos/storage/${img.file}` : undefined,
    }));

    // Map kos_facilities to facilities
    const facilities = kos.kos_facilities;

    // Convert price to number if it's a string
    const price_per_month = typeof kos.price_per_month === 'string' 
      ? parseInt(kos.price_per_month, 10) 
      : kos.price_per_month;

    return {
      ...kos,
      images,
      facilities,
      price_per_month,
    };
  },

  // Normalize array of Kos
  normalizeKosList: (kosList: Kos[]): Kos[] => {
    return kosList.map(kos => apiUtils.normalizeKos(kos));
  },

  // Save auth token and user data
  saveAuthData: (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return getAuthToken() !== null;
  },

  // Check if user is owner
  isOwner: (): boolean => {
    const user = apiUtils.getCurrentUser();
    return user?.role === 'owner';
  },

  // Check if user is society
  isSociety: (): boolean => {
    const user = apiUtils.getCurrentUser();
    return user?.role === 'society';
  },
};

// Export default API object with all endpoints
export default {
  auth: authApi,
  appMaker: appMakerApi,
  owner: ownerApi,
  society: societyApi,
  utils: apiUtils,
};

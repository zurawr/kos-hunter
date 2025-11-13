// Custom hooks for API operations
import { useState, useEffect, useCallback } from 'react';
import { societyApi, ownerApi, apiUtils } from '@/lib/api';
import { Kos, Booking, Review, Facility, KosImage } from '@/types';

// Hook for fetching and searching Kos (Society)
export function useKosList(initialSearch?: string) {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch || '');

  const fetchKos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await societyApi.kos.getAll({ search: search || undefined });
      console.log('📊 Kos List Response:', response);
      
      // API returns 'status' field, not 'success'
      const isSuccess = response.status === true || response.success === true;
      
      if (isSuccess && response.data) {
        // Normalize data from API
        const normalized = apiUtils.normalizeKosList(response.data);
        console.log('✅ Normalized Kos List:', normalized.length, 'items');
        setKosList(normalized);
      } else {
        throw new Error(response.message || 'Failed to fetch kos');
      }
    } catch (err) {
      console.error('❌ Failed to fetch kos:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch kos');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchKos();
  }, [fetchKos]);

  return { kosList, loading, error, search, setSearch, refetch: fetchKos };
}

// Hook for fetching Kos detail
export function useKosDetail(id: number) {
  const [kos, setKos] = useState<Kos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKosDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await societyApi.kos.getDetail(id);
        console.log('📊 Kos Detail Response:', response);
        
        // API returns 'status' field, not 'success'
        const isSuccess = response.status === true || response.success === true;
        
        if (isSuccess && response.data) {
          // Normalize data from API
          const normalized = apiUtils.normalizeKos(response.data);
          console.log('✅ Normalized Kos Detail:', normalized);
          setKos(normalized);
        } else {
          throw new Error(response.message || 'Failed to fetch kos detail');
        }
      } catch (err) {
        console.error('❌ Failed to fetch kos detail:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch kos detail');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKosDetail();
    }
  }, [id]);

  return { kos, loading, error };
}

// Hook for managing bookings (Society)
export function useBookings(statusFilter?: 'pending' | 'accept' | 'reject') {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await societyApi.bookings.getAll(statusFilter);
      if (response.success && response.data) {
        setBookings(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (kosId: number, startDate: string, endDate: string) => {
    try {
      const response = await societyApi.bookings.create({
        kos_id: kosId,
        start_date: startDate,
        end_date: endDate,
      });
      if (response.success) {
        await fetchBookings(); // Refresh list
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  return { bookings, loading, error, createBooking, refetch: fetchBookings };
}

// Hook for managing reviews
export function useReviews(kosId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await societyApi.reviews.getAll(kosId);
      if (response.success && response.data) {
        setReviews(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [kosId]);

  useEffect(() => {
    if (kosId) {
      fetchReviews();
    }
  }, [kosId, fetchReviews]);

  const addReview = async (reviewText: string) => {
    try {
      const response = await societyApi.reviews.create(kosId, { review: reviewText });
      if (response.success) {
        await fetchReviews(); // Refresh list
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteReview = async (reviewId: number) => {
    try {
      await societyApi.reviews.delete(reviewId);
      await fetchReviews(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return { reviews, loading, error, addReview, deleteReview, refetch: fetchReviews };
}

// Hook for managing Kos (Owner)
export function useOwnerKos(initialSearch?: string) {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch || '');

  const fetchKos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ownerApi.kos.getAll({ search: search || undefined });
      console.log('📊 Owner Kos List Response:', response);
      
      // API returns 'status' field, not 'success'
      const isSuccess = response.status === true || response.success === true;
      
      if (isSuccess && response.data) {
        // Normalize data from API
        const normalized = apiUtils.normalizeKosList(response.data);
        console.log('✅ Normalized Owner Kos List:', normalized.length, 'items');
        setKosList(normalized);
      } else {
        throw new Error(response.message || 'Failed to fetch kos');
      }
    } catch (err) {
      console.error('❌ Failed to fetch owner kos:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch kos');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchKos();
  }, [fetchKos]);

  const deleteKos = async (id: number) => {
    try {
      await ownerApi.kos.delete(id);
      await fetchKos(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return { kosList, loading, error, search, setSearch, deleteKos, refetch: fetchKos };
}

// Hook for managing facilities (Owner)
export function useFacilities(kosId: number) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacilities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ownerApi.facilities.getAll(kosId);
      if (response.success && response.data) {
        setFacilities(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch facilities');
    } finally {
      setLoading(false);
    }
  }, [kosId]);

  useEffect(() => {
    if (kosId) {
      fetchFacilities();
    }
  }, [kosId, fetchFacilities]);

  const addFacility = async (facilityName: string) => {
    try {
      const response = await ownerApi.facilities.create(kosId, { facility_name: facilityName });
      if (response.success) {
        await fetchFacilities(); // Refresh list
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  const updateFacility = async (id: number, facilityName: string) => {
    try {
      await ownerApi.facilities.update(id, { facility_name: facilityName });
      await fetchFacilities(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  const deleteFacility = async (id: number) => {
    try {
      await ownerApi.facilities.delete(id);
      await fetchFacilities(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return { facilities, loading, error, addFacility, updateFacility, deleteFacility, refetch: fetchFacilities };
}

// Hook for managing images (Owner)
export function useKosImages(kosId: number) {
  const [images, setImages] = useState<KosImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ownerApi.images.getAll(kosId);
      if (response.success && response.data) {
        setImages(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, [kosId]);

  useEffect(() => {
    if (kosId) {
      fetchImages();
    }
  }, [kosId, fetchImages]);

  const uploadImage = async (file: File) => {
    try {
      const response = await ownerApi.images.upload(kosId, file);
      if (response.success) {
        await fetchImages(); // Refresh list
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteImage = async (id: number) => {
    try {
      await ownerApi.images.delete(id);
      await fetchImages(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return { images, loading, error, uploadImage, deleteImage, refetch: fetchImages };
}

// Hook for managing bookings (Owner)
export function useOwnerBookings(statusFilter?: '' | 'pending' | 'accept' | 'reject', dateFilter?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ownerApi.bookings.getAll({
        status: statusFilter,
        tgl: dateFilter,
      });
      if (response.success && response.data) {
        setBookings(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (id: number, status: 'accept' | 'reject') => {
    try {
      await ownerApi.bookings.updateStatus(id, { status });
      await fetchBookings(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return { bookings, loading, error, updateBookingStatus, refetch: fetchBookings };
}

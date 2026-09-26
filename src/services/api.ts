import { ReviewItem } from '../data/salonData';

export interface BackendBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  date: string;
  time: string;
  clientName: string;
  phone: string;
  email?: string;
  nailArtAddon: boolean;
  waterChemicalLifestyle: boolean;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SalonStatusResponse {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  displayPhone: string;
  plusCode: string;
  status: {
    isOpen: boolean;
    statusText: string;
    timezone: string;
  };
}

export const api = {
  async getSalonStatus(): Promise<SalonStatusResponse | null> {
    try {
      const res = await fetch('/api/salon');
      if (!res.ok) throw new Error('Failed to fetch status');
      return await res.json();
    } catch (err) {
      console.warn('API getSalonStatus fallback:', err);
      return null;
    }
  },

  async getReviews(): Promise<ReviewItem[]> {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      return data.reviews || [];
    } catch (err) {
      console.warn('API getReviews fallback:', err);
      return [];
    }
  },

  async postReview(review: {
    author: string;
    rating: number;
    text: string;
    highlightedPhrase?: string;
    tags?: string[];
  }): Promise<ReviewItem | null> {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (!res.ok) throw new Error('Failed to post review');
      const data = await res.json();
      return data.review;
    } catch (err) {
      console.error('API postReview error:', err);
      return null;
    }
  },

  async likeReview(reviewId: string): Promise<number | null> {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/like`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to like review');
      const data = await res.json();
      return data.likes;
    } catch (err) {
      console.error('API likeReview error:', err);
      return null;
    }
  },

  async replyToReview(reviewId: string, text: string): Promise<ReviewItem | null> {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Failed to reply');
      const data = await res.json();
      return data.review;
    } catch (err) {
      console.error('API replyToReview error:', err);
      return null;
    }
  },

  async getBookings(): Promise<BackendBooking[]> {
    try {
      const res = await fetch('/api/bookings');
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      return data.bookings || [];
    } catch (err) {
      console.warn('API getBookings fallback:', err);
      return [];
    }
  },

  async createBooking(bookingData: {
    serviceId: string;
    serviceName: string;
    price: number;
    duration: string;
    date: string;
    time: string;
    clientName: string;
    phone: string;
    email?: string;
    nailArtAddon: boolean;
    waterChemicalLifestyle: boolean;
    notes?: string;
  }): Promise<BackendBooking | null> {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (!res.ok) throw new Error('Failed to create booking');
      const data = await res.json();
      return data.booking;
    } catch (err) {
      console.error('API createBooking error:', err);
      return null;
    }
  },

  async updateBookingStatus(
    bookingId: string,
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  ): Promise<boolean> {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return res.ok;
    } catch (err) {
      console.error('API updateBookingStatus error:', err);
      return false;
    }
  },

  async sendContact(name: string, contact: string, message: string): Promise<boolean> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message })
      });
      return res.ok;
    } catch (err) {
      console.error('API sendContact error:', err);
      return false;
    }
  }
};

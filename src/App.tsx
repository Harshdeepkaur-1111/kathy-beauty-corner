/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ReviewModal } from './components/ReviewModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { ReviewItem, SALON_INFO, REVIEWS } from './data/salonData';
import { api } from './services/api';
import { Calendar, Phone } from 'lucide-react';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [ownerPortalOpen, setOwnerPortalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);

  // Load reviews from backend API on mount
  const refreshReviews = async () => {
    try {
      const fetched = await api.getReviews();
      if (fetched && fetched.length > 0) {
        setReviews(fetched);
      }
    } catch (err) {
      console.warn("Could not load backend reviews:", err);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-stone-200">
      {/* Top Navbar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenOwnerPortal={() => setOwnerPortalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection onOpenBooking={(sId) => handleOpenBooking(sId)} />
        <GallerySection onOpenBooking={() => handleOpenBooking()} />
        <AboutSection onOpenBooking={() => handleOpenBooking()} />
        <ReviewsSection 
          onOpenReviewModal={() => setReviewModalOpen(true)}
          reviews={reviews}
          onReviewsChange={setReviews}
        />
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenOwnerPortal={() => setOwnerPortalOpen(true)}
      />

      {/* Mobile Sticky Quick Booking Bar (≤15% viewport height rule) */}
      <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <a
          href={`tel:${SALON_INFO.phone}`}
          className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-800 bg-stone-100 rounded-md active:bg-stone-200"
        >
          <Phone className="w-3.5 h-3.5 text-stone-600" />
          <span>Call Studio</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md shadow-xs active:bg-stone-800"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Online</span>
        </button>
      </aside>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
      />

      {/* Interactive Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* Kathy's Studio Owner Portal Modal */}
      <OwnerPortalModal
        isOpen={ownerPortalOpen}
        onClose={() => setOwnerPortalOpen(false)}
        onReviewsUpdated={refreshReviews}
      />
    </div>
  );
}

import React from 'react';
import { Star, Phone, MapPin, Clock, ArrowUp, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenOwnerPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenOwnerPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif-luxury text-2xl text-white font-medium block">
              {SALON_INFO.name}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <span className="flex items-center text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                5.0
              </span>
              <span>·</span>
              <span>23 Verified Google Reviews</span>
              <span>·</span>
              <span>Ashburn, VA</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              A private, boutique nail sanctuary in Ashburn dedicated to natural nail health, long-lasting builder gels, and bespoke hand-painted nail artistry.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Online</span>
              </button>
            </div>
          </div>

          {/* Treatments */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Builder Gel (BIAB) Overlay
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Structured BIAB Extensions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  High-Durability Acrylics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Glazed &amp; Chrome Finishes
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Bespoke Hand-Painted Art
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Deluxe Spa Pedicure
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Client Nail Portfolio
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Kathy
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Client Testimonials (5.0★)
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Directions &amp; Hours
                </a>
              </li>
              <li>
                <a 
                  href={SALON_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Google Maps Profile
                </a>
              </li>
              {onOpenOwnerPortal && (
                <li>
                  <button
                    onClick={onOpenOwnerPortal}
                    className="hover:text-amber-200 text-stone-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>Kathy&apos;s Suite Portal</span>
                    <span className="text-[10px] bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded">Owner</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Studio Location
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  {SALON_INFO.street}<br />
                  {SALON_INFO.cityStateZip}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <a 
                  href={`tel:${SALON_INFO.phone}`} 
                  className="hover:text-white font-mono"
                >
                  {SALON_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Mon - Sat: 9:00 AM – 7:00 PM<br />
                  Sun: By appointment
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} {SALON_INFO.name}. All rights reserved. Hospital-grade sterilization compliant.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-stone-400">Ashburn, Virginia · 20147</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

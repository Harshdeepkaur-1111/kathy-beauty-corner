import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Star, Settings } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenOwnerPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOwnerPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
        >
          <span className="font-serif-luxury text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-amber-950 transition-colors">
            {SALON_INFO.name}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-sans-clean">
            <span className="flex items-center text-amber-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-0.5 inline" />
              5.0
            </span>
            <span>·</span>
            <span>Ashburn, VA</span>
          </div>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <a href="#services" className="hover:text-amber-900 transition-colors py-1">
            Services
          </a>
          <a href="#gallery" className="hover:text-amber-900 transition-colors py-1">
            Gallery
          </a>
          <a href="#about" className="hover:text-amber-900 transition-colors py-1">
            About Kathy
          </a>
          <a href="#reviews" className="hover:text-amber-900 transition-colors py-1">
            Reviews
          </a>
          <a href="#location" className="hover:text-amber-900 transition-colors py-1">
            Hours & Location
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenOwnerPortal && (
            <button
              onClick={onOpenOwnerPortal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              title="Kathy's Suite Portal"
            >
              <Settings className="w-3.5 h-3.5 text-stone-500" />
              <span>Owner Portal</span>
            </button>
          )}

          <a
            href={`tel:${SALON_INFO.phone}`}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors"
            title="Call Kathy"
          >
            <Phone className="w-3.5 h-3.5 text-stone-600" />
            <span className="tabular-nums font-mono text-xs">{SALON_INFO.displayPhone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md shadow-xs transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Online</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenOwnerPortal && (
            <button
              onClick={onOpenOwnerPortal}
              className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-md"
              title="Portal"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md"
          >
            Book
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-stone-100 rounded-md"
            >
              Services & Menu
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-stone-100 rounded-md"
            >
              Nail Art Gallery
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-stone-100 rounded-md"
            >
              About Kathy & Philosophy
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-stone-100 rounded-md"
            >
              Client Reviews (5.0 ★)
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-stone-100 rounded-md"
            >
              Hours, Directions & Map
            </a>
            {onOpenOwnerPortal && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOwnerPortal();
                }}
                className="py-2 px-2 text-left hover:bg-stone-100 rounded-md flex items-center gap-2 text-amber-900"
              >
                <Settings className="w-4 h-4" />
                <span>Kathy&apos;s Owner Portal</span>
              </button>
            )}
          </nav>
          
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 rounded-md"
            >
              <Phone className="w-4 h-4 text-stone-600" />
              <span>Call {SALON_INFO.displayPhone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


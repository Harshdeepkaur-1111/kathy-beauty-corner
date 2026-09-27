import React from 'react';
import { Star, Sparkles, ShieldCheck, Heart, ArrowRight, MapPin } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { IMAGES } from '../assets/images';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Kicker - Zero pill metadata rule: clean unboxed with dot separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600">
              <span className="flex items-center text-amber-700 font-semibold tracking-wide uppercase text-[11px]">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                5.0 Perfect Rating
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600">23 Verified Google Reviews</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-emerald-700 font-medium">Boutique Nail Studio</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.12] text-balance">
              Immaculate nail artistry crafted for lasting beauty &amp; health.
            </h1>

            {/* Sub-prose */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl">
              Welcome to <strong className="text-stone-900 font-medium">Beauty corner by Kathy</strong> in Ashburn, VA. Specialized in durable Builder Gel (BIAB), hand-sculpted acrylics that withstand heavy daily wear, and precision nail art in a calm, hospital-grade clean private suite.
            </p>

            {/* Quote Proof Adjacency */}
            <div className="p-4 bg-stone-100/70 border-l-2 border-stone-800 rounded-r-md text-stone-700 text-sm italic">
              &ldquo;I work with chemicals and water daily so I have a unique demand for longevity. Kathy&apos;s work is absolute perfection and she makes me feel like family.&rdquo;
              <div className="mt-1 text-xs font-normal not-italic text-stone-500">
                — Verified Client Review · Ashburn, VA
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Book Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-md transition-all"
              >
                <span>View Service Menu</span>
              </a>

              <a
                href={SALON_INFO.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Brimfield Dr, Ashburn</span>
              </a>
            </div>

            {/* 3 Pillars / Hallmarks */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Hospital-Grade Clean</div>
                  <div className="text-stone-500">Autoclaved instruments &amp; single-use files</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">3-4 Week Longevity</div>
                  <div className="text-stone-500">Zero lifting, water &amp; chemical resilient</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">1-on-1 Sanctuary</div>
                  <div className="text-stone-500">No rush, genuine care like family</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="overflow-hidden rounded-xl shadow-md border border-stone-200/90 aspect-[4/3] bg-stone-200 relative group">
                <img
                  src={IMAGES.hero}
                  alt="Beauty corner by Kathy salon interior"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Clean Subtle Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 text-white">
                  <div className="text-xs font-medium text-stone-200">Ashburn Studio Suite</div>
                  <div className="font-serif-luxury text-lg tracking-wide text-white">44751 Brimfield Dr Ste 116</div>
                </div>
              </div>

              {/* Inset Detail Badge Card */}
              <div className="mt-4 sm:absolute sm:-bottom-6 sm:-left-6 bg-white border border-stone-200/90 p-3.5 rounded-lg shadow-sm max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <img
                      src={IMAGES.builderGel}
                      alt="Builder gel close-up"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-stone-900">Builder Gel Specialty</div>
                    <div className="text-stone-500">Natural nail strength &amp; flawless apex</div>
                    <div className="text-amber-700 font-medium mt-0.5">5.0 ★ Client Favorite</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

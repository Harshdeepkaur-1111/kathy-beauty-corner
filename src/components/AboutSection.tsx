import React from 'react';
import { Heart, Sparkles, CheckCircle2, Shield, Droplets } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { IMAGES } from '../assets/images';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Feature */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-xl bg-stone-100 border border-stone-200 shadow-sm aspect-[4/3]">
                <img
                  src={IMAGES.salonAtmosphere}
                  alt="Kathy's immaculate beauty workstation in Ashburn"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Trust Callout */}
              <div className="mt-4 p-4 bg-[#FAF8F5] border border-stone-200/90 rounded-lg">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs mb-1">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>The Kathy Guarantee</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  &ldquo;I treat your nails as if they were my own. No rushing, no aggressive drilling, and zero compromises on hygiene.&rdquo;
                </p>
                <div className="mt-1 text-[11px] font-serif-luxury italic text-stone-500 text-right">
                  — Kathy, Master Nail Artist &amp; Studio Owner
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              The Beauty Corner Philosophy
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight leading-snug">
              A private beauty sanctuary where precision meets warmth.
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Tired of crowded salons where you feel rushed and your nails lift in under a week? At <strong className="text-stone-900 font-medium">{SALON_INFO.name}</strong>, Kathy has created a calm, personalized parlour experience in Ashburn where every guest receives undivided attention.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-stone-100 text-stone-800 shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4 text-stone-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Tailored for Demanding Lifestyles</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    Whether you work in healthcare, wash hands frequently, or handle chemicals daily, Kathy personalizes primer and apex architecture so your nails remain chip-free for 3 to 4+ weeks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-stone-100 text-stone-800 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-stone-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Uncompromising Sanitation</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    Every steel implement is sealed in autoclave indicator pouches and opened directly in front of you. Files, buffers, and towels are strictly single-client.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-stone-100 text-stone-800 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-stone-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Natural Nail Health First</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    No painful electric file burns or over-thinned nail beds. Kathy specializes in restorative Builder in a Bottle (BIAB) systems that actively strengthen weak or brittle natural nails.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all"
              >
                Schedule with Kathy
              </button>
              <a
                href="#reviews"
                className="text-xs font-medium text-stone-700 hover:text-stone-950 underline underline-offset-4"
              >
                Read 23 client testimonials &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

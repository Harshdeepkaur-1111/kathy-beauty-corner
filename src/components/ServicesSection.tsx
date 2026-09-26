import React, { useState } from 'react';
import { Clock, Check, Sparkles } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/salonData';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'builder_gel', label: 'Builder Gel (BIAB)' },
    { id: 'nail_art', label: 'Signature Nail Art' },
    { id: 'acrylics', label: 'Durable Acrylics' },
    { id: 'care_spa', label: 'Care & Pedicures' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Curated Treatment Menu
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
            Designed for durability, sculpted for elegance.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every service is performed with precision e-file dry manicuring, cuticle care, and high-performance hypoallergenic European products that protect your natural nail bed.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-6 rounded-lg bg-[#FAF8F5] border border-stone-200/80 hover:border-stone-400/70 hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif-luxury text-xl font-medium text-stone-900 group-hover:text-stone-950 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-semibold text-stone-900 tabular-nums">
                      ${service.price}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {service.duration}
                  </span>
                  {service.popular && (
                    <>
                      <span>·</span>
                      <span className="text-amber-800 font-medium">Ashburn Favorite</span>
                    </>
                  )}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Cuticle prep included
                </span>
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-900 hover:text-white border border-stone-300 rounded-md transition-colors cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="mt-10 p-6 rounded-lg bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Custom Nail Art or Unique Nail Concerns?</h4>
              <p className="text-xs text-stone-600">
                Send your design inspiration or tell Kathy about your work requirements. We tailor our formulas for every client.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md shrink-0"
          >
            Consult with Kathy
          </button>
        </div>

      </div>
    </section>
  );
};

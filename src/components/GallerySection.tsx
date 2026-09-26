import React, { useState } from 'react';
import { Maximize2, X, Sparkles, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/salonData';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'builder_gel' | 'nail_art' | 'studio'>('all');

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Studio Portfolio
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
              Flawless artistry in every detail.
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              From natural builder gel overlays with pearlescent chrome to hand-painted micro art, explore real sets created in our Ashburn studio.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setFilter('builder_gel')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'builder_gel'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Builder Gel
            </button>
            <button
              onClick={() => setFilter('nail_art')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'nail_art'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Nail Art
            </button>
            <button
              onClick={() => setFilter('studio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'studio'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Studio Suite
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-stone-100 border border-stone-200 aspect-[4/3] flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="relative p-4 text-white z-10">
                <span className="text-[11px] font-medium tracking-wide uppercase text-amber-200">
                  {item.tag}
                </span>
                <h3 className="font-serif-luxury text-lg font-medium leading-snug mt-0.5 text-white">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Client Tagline */}
        <div className="mt-8 text-center text-xs text-stone-500">
          <span>&ldquo;My nails always look immaculate and her selection of colors and products is fabulous.&rdquo;</span>
          <span className="ml-2 font-medium text-stone-700">— Dina S. (Verified Google Review)</span>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] bg-stone-100 relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {selectedImage.tag}
                </span>
                <span className="text-xs text-amber-700 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" />
                  Ashburn Studio Original
                </span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-stone-900 mt-1 font-medium">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                {selectedImage.description}
              </p>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-950"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenBooking();
                  }}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md"
                >
                  <span>Book This Style</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

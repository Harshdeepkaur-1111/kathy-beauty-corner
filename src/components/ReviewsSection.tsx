import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, PlusCircle } from 'lucide-react';
import { ReviewItem } from '../data/salonData';
import { api } from '../services/api';

interface ReviewsSectionProps {
  onOpenReviewModal: () => void;
  reviews: ReviewItem[];
  onReviewsChange?: (reviews: ReviewItem[]) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  onOpenReviewModal,
  reviews,
  onReviewsChange
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  const handleLike = async (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews(prev => ({ ...prev, [id]: true }));
    const newLikes = await api.likeReview(id);
    if (newLikes !== null && onReviewsChange) {
      onReviewsChange(reviews.map(r => r.id === id ? { ...r, likes: newLikes } : r));
    }
  };

  const topics = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: 'immaculate nails', label: 'immaculate nails', count: 3 },
    { id: 'nail art', label: 'nail art', count: 5 },
    { id: 'nail compliments', label: 'nail compliments', count: 2 },
    { id: 'builder gel', label: 'builder gel', count: 2 }
  ];

  const filteredReviews = selectedTag === 'all'
    ? reviews
    : reviews.filter(r => r.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Verified Google Reviews
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
            Loved by Ashburn for over 5 years.
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Honest feedback from working professionals, nail enthusiasts, and longtime clients.
          </p>
        </div>

        {/* Aggregate Score Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200/90 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="font-serif-luxury text-5xl font-semibold text-stone-900 tabular-nums">
                  5.0
                </span>
                <div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    Based on {reviews.length} client reviews
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-3">
                100% 5-Star Satisfaction on Google Maps
              </p>
            </div>

            {/* Rating breakdown bars */}
            <div className="md:col-span-5 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <span className="w-3 text-right tabular-nums font-medium">5</span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-full" />
                </div>
                <span className="w-6 text-right tabular-nums text-stone-400">{reviews.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-right tabular-nums font-medium">4</span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-0" />
                </div>
                <span className="w-6 text-right tabular-nums text-stone-400">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-right tabular-nums font-medium">3</span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-0" />
                </div>
                <span className="w-6 text-right tabular-nums text-stone-400">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-right tabular-nums font-medium">2</span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-0" />
                </div>
                <span className="w-6 text-right tabular-nums text-stone-400">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-right tabular-nums font-medium">1</span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-0" />
                </div>
                <span className="w-6 text-right tabular-nums text-stone-400">0</span>
              </div>
            </div>

            {/* Write Review CTA */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center">
              <button
                onClick={onOpenReviewModal}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-stone-700" />
                <span>Write a Review</span>
              </button>
              <span className="text-[11px] text-stone-400 mt-2">Share your Kathy experience</span>
            </div>

          </div>
        </div>

        {/* Topic filter bar from real Google Maps tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <span className="text-xs text-stone-500 font-medium shrink-0">Popular topics:</span>
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTag(topic.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === topic.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {topic.label}
              {topic.id !== 'all' && (
                <span className="ml-1.5 opacity-60 tabular-nums">({topic.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-800 font-semibold flex items-center justify-center text-sm border border-stone-200">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                        {review.author}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                      </div>
                      <div className="text-xs text-stone-400">
                        {review.reviewCountInfo || "Verified Client"} · {review.timeAgo}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Highlighted text callout if present */}
                {review.highlightedPhrase && (
                  <div className="mt-4 p-2.5 bg-stone-50 rounded-md text-xs font-medium text-stone-800 border-l-2 border-amber-600">
                    &ldquo;{review.highlightedPhrase}&rdquo;
                  </div>
                )}

                <p className="mt-3 text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                  {review.text}
                </p>

                {/* Tags and Helpful like */}
                <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {review.tags.map(t => (
                      <span 
                        key={t}
                        className="text-[11px] text-stone-500 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLike(review.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      likedReviews[review.id]
                        ? 'text-amber-800 bg-amber-50 font-medium'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${likedReviews[review.id] ? 'fill-amber-600' : ''}`} />
                    <span>Helpful</span>
                    {((review as any).likes || 0) > 0 && (
                      <span className="font-mono tabular-nums text-[11px]">
                        ({(review as any).likes})
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Owner response if available */}
              {review.ownerResponse && (
                <div className="mt-6 pt-4 border-t border-stone-100 bg-stone-50/70 -mx-6 -mb-6 p-4 rounded-b-xl">
                  <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 mb-1">
                    <span>Response from Kathy (Owner)</span>
                    <span className="text-stone-400 font-normal">· {review.ownerResponse.timeAgo}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;{review.ownerResponse.text}&rdquo;
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

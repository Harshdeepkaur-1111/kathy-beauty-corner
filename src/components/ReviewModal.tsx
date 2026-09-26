import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { ReviewItem } from '../data/salonData';
import { api } from '../services/api';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [highlightedPhrase, setHighlightedPhrase] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['immaculate nails']);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const availableTags = [
    'immaculate nails',
    'nail art',
    'builder gel',
    'nail compliments',
    'acrylics & durability',
    'nail health'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    setIsSubmitting(true);

    try {
      const created = await api.postReview({
        author,
        rating,
        text,
        highlightedPhrase: highlightedPhrase || undefined,
        tags: selectedTags.length > 0 ? selectedTags : ['immaculate nails']
      });

      if (created) {
        onSubmitReview(created);
      } else {
        onSubmitReview({
          id: `rev-${Date.now()}`,
          author,
          rating,
          timeAgo: 'Just now',
          reviewCountInfo: '1 review · Verified Client',
          text,
          highlightedPhrase: highlightedPhrase || undefined,
          tags: selectedTags.length > 0 ? selectedTags : ['immaculate nails']
        });
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Google Review
            </span>
            <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
              Review Beauty corner by Kathy
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-stone-900">Thank you for your review!</h4>
              <p className="text-xs text-stone-500">
                Your feedback has been posted and will help other clients in Ashburn find Kathy.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-medium text-stone-600">
                    {rating}.0 Stars
                  </span>
                </div>
              </div>

              {/* Author name */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Share details of your experience *
                </label>
                <textarea
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell others about Kathy's attention to detail, longevity, cleanliness, or how your nails turned out..."
                  className="w-full p-2.5 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Highlight Quote */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Key Standout Quote (Optional)
                </label>
                <input
                  type="text"
                  value={highlightedPhrase}
                  onChange={(e) => setHighlightedPhrase(e.target.value)}
                  placeholder="e.g. My acrylics lasted 4 weeks with zero lifting!"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Tag selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Select related tags:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Post Review
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

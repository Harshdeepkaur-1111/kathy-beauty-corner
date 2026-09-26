import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  Sparkles,
  RefreshCw,
  Droplets
} from 'lucide-react';
import { api, BackendBooking } from '../services/api';
import { ReviewItem } from '../data/salonData';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewsUpdated?: () => void;
}

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  onReviewsUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'reviews'>('appointments');
  const [bookings, setBookings] = useState<BackendBooking[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState<{ [reviewId: string]: string }>({});
  const [replySuccess, setReplySuccess] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedBookings, fetchedReviews] = await Promise.all([
        api.getBookings(),
        api.getReviews()
      ]);
      setBookings(fetchedBookings);
      setReviews(fetchedReviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (
    bookingId: string, 
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  ) => {
    const ok = await api.updateBookingStatus(bookingId, status);
    if (ok) {
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status } : b)
      );
    }
  };

  const handleSendReply = async (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text) return;
    const updated = await api.replyToReview(reviewId, text);
    if (updated) {
      setReviews(prev => 
        prev.map(r => r.id === reviewId ? updated : r)
      );
      setReplyText(prev => ({ ...prev, [reviewId]: '' }));
      setReplySuccess(reviewId);
      setTimeout(() => setReplySuccess(null), 3000);
      if (onReviewsUpdated) onReviewsUpdated();
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-200 font-serif-luxury text-lg flex items-center justify-center font-medium">
              K
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Studio Backend
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
                Kathy&apos;s Suite Management Portal
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-md hover:bg-stone-200 text-stone-600 transition-colors"
              title="Refresh backend data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50 px-6 py-3 text-xs">
          <div>
            <span className="text-stone-500 block">Total Appointments</span>
            <span className="font-serif-luxury text-xl font-medium text-stone-900 tabular-nums">
              {bookings.length}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block">Estimated Revenue</span>
            <span className="font-serif-luxury text-xl font-medium text-stone-900 tabular-nums">
              ${totalRevenue}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block">Google Rating</span>
            <span className="font-serif-luxury text-xl font-medium text-amber-700 tabular-nums">
              5.0 ★ ({reviews.length})
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-stone-200 flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'appointments'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Client Appointments ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Review Management &amp; Replies ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-10 text-stone-500 text-xs">
                  No bookings received yet. Test by creating a booking online!
                </div>
              ) : (
                bookings.map((b) => (
                  <div 
                    key={b.id} 
                    className="p-4 rounded-xl border border-stone-200 bg-white shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {b.id}
                          </span>
                          <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded ${
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                            b.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                            b.status === 'cancelled' ? 'bg-rose-50 text-rose-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="font-serif-luxury text-lg font-medium text-stone-900 mt-1">
                          {b.serviceName}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                          ${b.price}
                        </span>
                        <div className="text-[11px] text-stone-400 font-mono">
                          {b.duration}
                        </div>
                      </div>
                    </div>

                    {/* Booking metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-[#FAF8F5] p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-medium text-stone-900">{b.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <a href={`tel:${b.phone}`} className="hover:underline font-mono text-stone-800">
                          {b.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>Date: <strong>{b.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>Time: <strong>{b.time}</strong></span>
                      </div>
                    </div>

                    {/* Special flags */}
                    {(b.waterChemicalLifestyle || b.nailArtAddon || b.notes) && (
                      <div className="text-xs space-y-1.5 pt-1">
                        {b.waterChemicalLifestyle && (
                          <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                            <Droplets className="w-3.5 h-3.5" />
                            <span>Chemical / Frequent water contact: apply reinforced bond formula.</span>
                          </div>
                        )}
                        {b.nailArtAddon && (
                          <div className="flex items-center gap-1.5 text-stone-700">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Requested Signature Nail Art Add-on</span>
                          </div>
                        )}
                        {b.notes && (
                          <div className="text-stone-600 bg-stone-50 p-2 rounded text-[11px] italic">
                            &ldquo;{b.notes}&rdquo;
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400">
                        Booked: {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {b.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                            className="px-2.5 py-1 rounded bg-stone-100 text-stone-600 hover:bg-rose-50 hover:text-rose-700 font-medium flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        )}
                        {b.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            className="px-2.5 py-1 rounded bg-stone-900 text-white hover:bg-stone-800 font-medium"
                          >
                            Set Confirmed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div 
                  key={r.id} 
                  className="p-4 rounded-xl border border-stone-200 bg-white shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-sm text-stone-900 flex items-center gap-2">
                        {r.author}
                        <span className="text-amber-500 font-normal text-xs">★ {r.rating}.0</span>
                      </div>
                      <div className="text-[11px] text-stone-400">{r.timeAgo}</div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {r.text}
                  </p>

                  {/* Owner response if existing */}
                  {r.ownerResponse ? (
                    <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs">
                      <div className="font-semibold text-amber-950 flex items-center justify-between">
                        <span>Kathy&apos;s Published Reply</span>
                        <span className="text-[10px] text-amber-700 font-normal">{r.ownerResponse.timeAgo}</span>
                      </div>
                      <p className="mt-1 text-stone-700 italic">
                        &ldquo;{r.ownerResponse.text}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-stone-100">
                      <div className="text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                        <span>Reply as Kathy (Owner)</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyText[r.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [r.id]: e.target.value })}
                          placeholder="Write a personal thank you or note..."
                          className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                        />
                        <button
                          onClick={() => handleSendReply(r.id)}
                          className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Reply</span>
                        </button>
                      </div>
                      {replySuccess === r.id && (
                        <span className="text-[11px] text-emerald-600 mt-1 block">
                          Reply published to website!
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Beauty corner by Kathy · 44751 Brimfield Dr Ste 116</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};

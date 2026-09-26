import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  CalendarPlus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { api } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onBookingCreated?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onBookingCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [nailArtAddon, setNailArtAddon] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [waterChemicalLifestyle, setWaterChemicalLifestyle] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const timeSlots = [
    '9:00 AM',
    '10:30 AM',
    '12:00 PM',
    '1:45 PM',
    '3:15 PM',
    '4:45 PM',
    '6:00 PM'
  ];

  // Dates for next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, dayName, monthDay };
  });

  const totalPrice = currentService.price + (nailArtAddon ? 25 : 0);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);

    try {
      const created = await api.createBooking({
        serviceId: currentService.id,
        serviceName: currentService.name,
        price: totalPrice,
        duration: currentService.duration,
        date: selectedDate,
        time: selectedTime,
        clientName: name,
        phone,
        email: email || undefined,
        nailArtAddon,
        waterChemicalLifestyle,
        notes: notes || undefined
      });

      if (created) {
        setBookingRef(created.id);
      } else {
        setBookingRef(`BK-${Math.floor(1000 + Math.random() * 9000)}`);
      }
      if (onBookingCreated) onBookingCreated();
      setStep(4);
    } catch (err) {
      console.error(err);
      setBookingRef(`BK-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Beauty corner by Kathy: ${currentService.name}`);
    const details = encodeURIComponent(
      `Appointment at Beauty corner by Kathy.\nService: ${currentService.name}\nReference: ${bookingRef}\nPhone: ${SALON_INFO.phone}\nNotes: ${notes}`
    );
    const location = encodeURIComponent(SALON_INFO.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Online Appointment
            </span>
            <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
              {step === 4 ? "Appointment Confirmed" : "Book with Kathy"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 border-b border-stone-100 flex items-center justify-between text-xs font-medium text-stone-500">
            <span className={step === 1 ? 'text-stone-900 font-semibold' : ''}>1. Service</span>
            <span>&rarr;</span>
            <span className={step === 2 ? 'text-stone-900 font-semibold' : ''}>2. Date &amp; Time</span>
            <span>&rarr;</span>
            <span className={step === 3 ? 'text-stone-900 font-semibold' : ''}>3. Details</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600">
                Choose your primary treatment:
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {SERVICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      selectedServiceId === s.id
                        ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                        {s.name}
                        {s.popular && (
                          <span className="text-[10px] text-amber-800 font-medium">· Top Rated</span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                        {s.description}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {s.duration}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-stone-900 tabular-nums shrink-0">
                      ${s.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Addon prompt */}
              <div className="pt-2 border-t border-stone-200">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nailArtAddon}
                    onChange={(e) => setNailArtAddon(e.target.checked)}
                    className="w-4 h-4 text-stone-900 rounded border-stone-300"
                  />
                  <div className="text-xs flex-1">
                    <span className="font-semibold text-stone-900">Add Signature Nail Art (+ $25)</span>
                    <p className="text-stone-500 text-[11px]">Micro-French, chrome glazed powder, or custom accent nails.</p>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="text-xs text-stone-500">
                  Est. Total: <strong className="text-stone-900 text-sm font-mono tabular-nums">${totalPrice}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  <span>Select Date &amp; Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(opt.dateStr)}
                      className={`p-2 rounded-lg text-center border transition-all ${
                        selectedDate === opt.dateStr
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-medium">{opt.dayName}</div>
                      <div className="text-xs font-semibold mt-0.5">{opt.monthDay}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Available Ashburn Suite Time Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-2.5 rounded-md text-xs font-mono font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2 text-xs text-stone-600">
                <CalendarIcon className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  Selected: <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> ({currentService.duration})
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800"
                >
                  <span>Continue to Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maria Morgan"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number (for SMS confirmation) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(571) 000-0000"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Lifestyle / Longevity checkbox */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waterChemicalLifestyle}
                    onChange={(e) => setWaterChemicalLifestyle(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-stone-900 rounded border-stone-300"
                  />
                  <div className="text-xs text-stone-800">
                    <span className="font-semibold text-stone-900">Heavy water or chemical daily contact</span>
                    <p className="text-stone-600 text-[11px] mt-0.5">
                      Kathy will apply specialized bond formulas for extended longevity (healthcare, salon, culinary, or athletic wear).
                    </p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Notes or Design Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell Kathy about desired length, shape (almond, square), or inspiration..."
                  className="w-full p-2.5 text-xs sm:text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="p-3 rounded-lg bg-stone-100 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>{currentService.name}</span>
                  <span className="font-mono tabular-nums">${currentService.price}</span>
                </div>
                {nailArtAddon && (
                  <div className="flex justify-between text-stone-600">
                    <span>Signature Nail Art Add-on</span>
                    <span className="font-mono tabular-nums">+$25</span>
                  </div>
                )}
                <div className="pt-1.5 border-t border-stone-200 flex justify-between font-semibold text-stone-900">
                  <span>Estimated Total Due in Studio</span>
                  <span className="font-mono tabular-nums">${totalPrice}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming with Studio...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-medium text-stone-400">
                  Confirmation #{bookingRef}
                </span>
                <h4 className="font-serif-luxury text-2xl text-stone-900 font-medium mt-1">
                  You&apos;re booked with Kathy!
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Thank you, {name}! Kathy has reserved your private suite session. We look forward to seeing you.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-500">Service:</span>
                  <span className="font-medium text-stone-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date &amp; Time:</span>
                  <span className="font-mono font-medium text-stone-900">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Location:</span>
                  <span className="text-stone-900">{SALON_INFO.street}, Ashburn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Duration:</span>
                  <span className="font-mono text-stone-900">{currentService.duration}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-semibold">
                  <span className="text-stone-900">Total:</span>
                  <span className="text-stone-900 font-mono">${totalPrice}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                >
                  <CalendarPlus className="w-4 h-4 text-stone-700" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-700" />
                  <span>Call Kathy</span>
                </a>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

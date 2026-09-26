import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Copy, 
  Check, 
  Smartphone, 
  Share2, 
  Bookmark, 
  HelpCircle,
  ChevronDown,
  Send
} from 'lucide-react';
import { SALON_INFO, FAQS } from '../data/salonData';
import { api, SalonStatusResponse } from '../services/api';

export const LocationHoursSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [liveStatus, setLiveStatus] = useState<SalonStatusResponse | null>(null);

  // Quick inquiry form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    api.getSalonStatus().then(data => {
      if (data) setLiveStatus(data);
    });
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryMsg) return;
    const ok = await api.sendContact(inquiryName, inquiryContact, inquiryMsg);
    if (ok) {
      setInquirySent(true);
      setInquiryName('');
      setInquiryContact('');
      setInquiryMsg('');
      setTimeout(() => setInquirySent(false), 4000);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(`${SALON_INFO.name}, ${SALON_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SALON_INFO.name,
          text: `Check out ${SALON_INFO.name} in Ashburn, VA! 5.0★ rating.`,
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      copyAddress();
    }
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Visit the Studio
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
            Location, Hours &amp; Directions
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Conveniently situated in Ashburn, Virginia with dedicated guest parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Location Card & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Details Card */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200/90 shadow-xs">
              
              {/* Address Block */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-stone-900 text-white shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber-200" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                    Studio Address
                  </div>
                  <div className="text-base font-semibold text-stone-900 mt-0.5">
                    {SALON_INFO.street}
                  </div>
                  <div className="text-sm text-stone-600">
                    {SALON_INFO.cityStateZip}, United States
                  </div>
                  <div className="mt-1 font-mono text-xs text-stone-500">
                    Plus code: {SALON_INFO.plusCode}
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-4 pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    liveStatus?.status.isOpen ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  }`} />
                  <span className="font-medium text-stone-800">
                    {liveStatus ? liveStatus.status.statusText : "Closed · Opens 9:00 AM"}
                  </span>
                </div>
                <span className="text-stone-500 font-mono">Ashburn, VA</span>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="mt-6 pt-4 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={SALON_INFO.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors text-center"
                >
                  <Navigation className="w-4 h-4 mb-1" />
                  <span className="text-[11px] font-medium">Directions</span>
                </a>

                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-md border transition-colors text-center ${
                    saved 
                      ? 'bg-amber-50 border-amber-300 text-amber-900' 
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mb-1 ${saved ? 'fill-amber-600' : ''}`} />
                  <span className="text-[11px] font-medium">{saved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => setPhoneDialog(true)}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors text-center"
                >
                  <Smartphone className="w-4 h-4 mb-1 text-stone-600" />
                  <span className="text-[11px] font-medium">Send to phone</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors text-center"
                >
                  <Share2 className="w-4 h-4 mb-1 text-stone-600" />
                  <span className="text-[11px] font-medium">Share</span>
                </button>
              </div>

              {/* Copy Address */}
              <div className="mt-3 flex items-center justify-between p-2.5 rounded-md bg-stone-100 text-xs">
                <span className="text-stone-600 truncate mr-2 font-mono">
                  {SALON_INFO.address}
                </span>
                <button
                  onClick={copyAddress}
                  className="flex items-center gap-1 font-semibold text-stone-900 hover:text-amber-900 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct phone */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs">
                <span className="text-stone-500">Appointments &amp; Questions:</span>
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="font-semibold text-stone-900 hover:text-amber-800 flex items-center gap-1 font-mono tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-700" />
                  {SALON_INFO.phone}
                </a>
              </div>

            </div>

            {/* Operating Hours Table */}
            <div className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100 text-stone-900 font-semibold text-sm">
                <Clock className="w-4 h-4 text-stone-600" />
                <span>Operating Hours</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {SALON_INFO.hours.map((h) => (
                  <div 
                    key={h.day}
                    className="flex items-center justify-between py-1 text-stone-700 border-b border-stone-100/60 last:border-0"
                  >
                    <span className="font-medium text-stone-800">{h.day}</span>
                    <span className="font-mono tabular-nums text-stone-600">
                      {h.open} – {h.close}
                      {h.note && <span className="ml-1 text-[11px] text-stone-400">({h.note})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Interactive Maps Showcase & FAQ */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Map Showcase */}
            <div className="relative rounded-xl overflow-hidden border border-stone-200/90 shadow-xs bg-stone-100 h-80 sm:h-96 flex flex-col justify-between p-6">
              
              {/* Stylized background representing Ashburn map view */}
              <div className="absolute inset-0 bg-stone-200/60 opacity-90">
                <iframe
                  title="Beauty corner by Kathy Location Map"
                  src="https://maps.google.com/maps?q=44751+Brimfield+Dr+Ste+116+Ashburn+VA+20147&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Floating Overlay Badge on Map */}
              <div className="relative z-10 self-start bg-white/95 backdrop-blur-md p-3.5 rounded-lg border border-stone-200 shadow-sm max-w-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                  <div>
                    <div className="font-semibold text-stone-900 text-xs">{SALON_INFO.name}</div>
                    <div className="text-[11px] text-stone-500">44751 Brimfield Dr Ste 116</div>
                  </div>
                </div>
              </div>

              {/* Floating Directions Action */}
              <div className="relative z-10 self-end">
                <a
                  href={SALON_INFO.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-stone-900/95 hover:bg-stone-900 text-white text-xs font-semibold shadow-md transition-all backdrop-blur-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

            </div>

            {/* Client FAQs */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-4">
                <HelpCircle className="w-4 h-4 text-stone-600" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-stone-200/80 rounded-lg bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-stone-900 hover:text-stone-950 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-3.5 pb-3.5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Consultation Inquiry */}
            <div className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                <Send className="w-4 h-4 text-stone-600" />
                <span>Ask Kathy a Question</span>
              </div>
              <p className="text-xs text-stone-500 mb-3">
                Have specific concerns about nail health, allergies, or chemical exposure? Send a direct note to Kathy.
              </p>

              {inquirySent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your message has been sent to Kathy! She will get back to you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <input
                      type="text"
                      placeholder="Phone or Email"
                      value={inquiryContact}
                      onChange={e => setInquiryContact(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Your question or note..."
                    value={inquiryMsg}
                    onChange={e => setInquiryMsg(e.target.value)}
                    className="w-full p-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Send to Phone Dialog */}
      {phoneDialog && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPhoneDialog(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-800">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
                Send to your phone
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Save Beauty corner by Kathy on your mobile device for quick directions or calls.
              </p>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5 text-left">
              <div className="font-semibold text-stone-900">{SALON_INFO.name}</div>
              <div className="text-stone-600">{SALON_INFO.address}</div>
              <div className="font-mono text-stone-700">{SALON_INFO.phone}</div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={`sms:?&body=Beauty corner by Kathy: ${SALON_INFO.address} · Call: ${SALON_INFO.phone}`}
                className="w-full py-2.5 px-4 text-center rounded-md bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
              >
                Send via Text Message (SMS)
              </a>
              <button
                onClick={copyAddress}
                className="w-full py-2 px-4 rounded-md border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
              >
                {copied ? 'Address Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={() => setPhoneDialog(false)}
                className="w-full py-1 text-xs text-stone-400 hover:text-stone-600 mt-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  reviewCountInfo?: string;
  photosCount?: number;
  text: string;
  highlightedPhrase?: string;
  tags: string[];
  likes: number;
  ownerResponse?: {
    timeAgo: string;
    text: string;
  };
}

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  date: string;
  time: string;
  clientName: string;
  phone: string;
  email?: string;
  nailArtAddon: boolean;
  waterChemicalLifestyle: boolean;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

// Initial Data
const INITIAL_REVIEWS: Review[] = [
  {
    id: "chandler-w",
    author: "Chandler Whittaker",
    rating: 5,
    timeAgo: "4 months ago",
    reviewCountInfo: "6 reviews · 11 photos",
    photosCount: 11,
    text: "I have been searching for a nail tech like Kathy for SO long! Kathy made me feel so comfortable, listened to my concerns, and did the best possible thing for the health of my nails as well as what I want. She was quick, efficient, while delivering absolute perfection.",
    highlightedPhrase: "She also is the sweetest, and she makes me feel like family.",
    tags: ["immaculate nails", "nail health", "builder gel"],
    likes: 12,
    ownerResponse: {
      timeAgo: "4 months ago",
      text: "Chandler, thank you so much for your sweet words! It means everything to know you felt comfortable and that we are achieving both your nail health goals and aesthetic dreams. Can't wait for your next appointment! 💕"
    }
  },
  {
    id: "maria-m",
    author: "Maria Morgan",
    rating: 5,
    timeAgo: "6 months ago",
    reviewCountInfo: "1 review · 3 photos",
    photosCount: 3,
    text: "After getting my nails done, I typically admire them quietly and smile to myself, but Kathy’s work deserves a shout-out. She did such an incredible job that I felt compelled to tell others - my nails have never looked better and I couldn't be happier!",
    highlightedPhrase: "Nails have never looked better and I couldn't be happier.",
    tags: ["immaculate nails", "nail compliments", "nail art"],
    likes: 8,
    ownerResponse: {
      timeAgo: "6 months ago",
      text: "Thank you so much for this beautiful review! I’m really happy that you love your nails. It means a lot to me to know my work made your day. I truly appreciate your support and can’t wait to see you again! 💕"
    }
  },
  {
    id: "dina-s",
    author: "Dina Schmidt",
    rating: 5,
    timeAgo: "5 months ago",
    reviewCountInfo: "4 reviews · 2 photos",
    photosCount: 2,
    text: "I love Kathy! I’ve been going to her for several years now. Her attention to detail is amazing, I never have any complaints. My nails always look immaculate and her selection of colors and products is fabulous. Several of my friends visit her as well and I have never heard complaints from them either. Would 100% recommend!",
    highlightedPhrase: "Her attention to detail is amazing, I never have any complaints.",
    tags: ["immaculate nails", "nail art", "nail compliments"],
    likes: 15,
    ownerResponse: {
      timeAgo: "5 months ago",
      text: "Thank you so much for your love and support over the years! 💕 It truly means the world to me that you’ve trusted me for so long. I’m so happy to hear you always love your nails and enjoy the colors and products I offer!"
    }
  },
  {
    id: "taylor-r",
    author: "Taylor Reynolds",
    rating: 5,
    timeAgo: "3 months ago",
    reviewCountInfo: "3 reviews · 4 photos",
    photosCount: 4,
    text: "I work with chemicals and water daily so I have a unique demand for longevity. Most nail techs' sets lift within 8 days. Kathy's builder gel lasted 4 full weeks without a single chip or lift! Absolutely magical technique and cleanest studio in Ashburn.",
    highlightedPhrase: "I work with chemicals and water daily so I have a unique demand for longevity.",
    tags: ["builder gel", "acrylics & durability", "immaculate nails"],
    likes: 9,
    ownerResponse: {
      timeAgo: "3 months ago",
      text: "Taylor, this makes me so proud! Formulating the right prep and builder gel bond for demanding hands is my specialty. Thank you for trusting me!"
    }
  },
  {
    id: "elena-v",
    author: "Elena Vasquez",
    rating: 5,
    timeAgo: "2 months ago",
    reviewCountInfo: "5 reviews · 6 photos",
    photosCount: 6,
    text: "Everything is super clean, and her acrylics are incredibly long lasting. She takes time to sanitize every single instrument in front of you. Kathy doesn't just do nails, she creates miniature fine art. I get stopped by strangers asking where I get my nails done!",
    highlightedPhrase: "Everything is super clean, and her acrylics are incredibly long lasting.",
    tags: ["nail compliments", "nail art", "acrylics & durability"],
    likes: 11
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-4102",
    serviceId: "biab-overlay",
    serviceName: "Builder Gel (BIAB) Structured Overlay",
    price: 100,
    duration: "75 min",
    date: "Tomorrow",
    time: "10:30 AM",
    clientName: "Jessica Hayes",
    phone: "(571) 320-9944",
    email: "jess.hayes@example.com",
    nailArtAddon: true,
    waterChemicalLifestyle: true,
    notes: "Almond shape, chrome glazed finish. Nurse at Inova, frequent hand washing.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "BK-3981",
    serviceId: "custom-nail-art-tier2",
    serviceName: "Bespoke Hand-Painted Art & 3D Accents",
    price: 45,
    duration: "45 min",
    date: "Tomorrow",
    time: "1:45 PM",
    clientName: "Lauren Cho",
    phone: "(703) 819-2041",
    email: "lauren.cho@example.com",
    nailArtAddon: false,
    waterChemicalLifestyle: false,
    notes: "Bringing Pinterest inspo: subtle micro florals on milk bath base.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

// Persistent state storage in memory with backup
let reviews: Review[] = [...INITIAL_REVIEWS];
let bookings: Booking[] = [...INITIAL_BOOKINGS];
let contacts: Array<{ id: string; name: string; contact: string; message: string; date: string }> = [];

async function startServer() {
  const app = express();
  // Dev server must strictly run on port 3000 as required by the runtime environment
  const PORT = 3000;

  app.use(express.json());

  // 1. Health & Info
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      salon: 'Beauty corner by Kathy',
      location: 'Ashburn, VA',
      rating: 5.0,
      timestamp: new Date().toISOString()
    });
  });

  // 2. Salon Profile & Current Open/Closed Status
  app.get('/api/salon', (_req: Request, res: Response) => {
    // Determine live status in US Eastern Time
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'long'
    });
    
    const parts = formatter.formatToParts(now);
    const hourPart = parts.find(p => p.type === 'hour')?.value;
    const weekdayPart = parts.find(p => p.type === 'weekday')?.value || 'Monday';
    const currentHour = hourPart ? parseInt(hourPart, 10) : 9;

    let isOpen = false;
    let statusText = "Closed · Opens 9:00 AM";

    if (weekdayPart === 'Sunday') {
      if (currentHour >= 10 && currentHour < 16) {
        isOpen = true;
        statusText = "Open now (By appointment) · Closes 4:00 PM";
      } else {
        statusText = "Closed · Opens Monday 9:00 AM";
      }
    } else {
      if (currentHour >= 9 && currentHour < 19) {
        isOpen = true;
        statusText = "Open now · Closes 7:00 PM";
      } else if (currentHour < 9) {
        statusText = "Closed · Opens 9:00 AM";
      } else {
        statusText = "Closed · Opens tomorrow 9:00 AM";
      }
    }

    res.json({
      name: "Beauty corner by Kathy",
      rating: 5.0,
      reviewCount: reviews.length,
      address: "44751 Brimfield Dr Ste 116, Ashburn, VA 20147, United States",
      phone: "+1 571-660-8879",
      displayPhone: "(571) 660-8879",
      plusCode: "3G2W+6W Ashburn, Virginia, USA",
      status: {
        isOpen,
        statusText,
        timezone: "America/New_York (EST)"
      }
    });
  });

  // 3. Get Reviews
  app.get('/api/reviews', (_req: Request, res: Response) => {
    res.json({
      averageRating: 5.0,
      totalCount: reviews.length,
      reviews
    });
  });

  // 4. Post New Review
  app.post('/api/reviews', (req: Request, res: Response) => {
    const { author, rating, text, highlightedPhrase, tags } = req.body;

    if (!author || !text) {
      res.status(400).json({ error: 'Name and review text are required.' });
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: String(author).trim(),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      timeAgo: 'Just now',
      reviewCountInfo: '1 review · Verified Client',
      text: String(text).trim(),
      highlightedPhrase: highlightedPhrase ? String(highlightedPhrase).trim() : undefined,
      tags: Array.isArray(tags) && tags.length > 0 ? tags : ['immaculate nails'],
      likes: 0
    };

    reviews.unshift(newReview);
    res.status(201).json({ success: true, review: newReview });
  });

  // 5. Kathy's Owner Response to Review
  app.post('/api/reviews/:id/reply', (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Reply text is required.' });
      return;
    }

    const review = reviews.find(r => r.id === id);
    if (!review) {
      res.status(404).json({ error: 'Review not found.' });
      return;
    }

    review.ownerResponse = {
      timeAgo: 'Just now',
      text: String(text).trim()
    };

    res.json({ success: true, review });
  });

  // 6. Upvote Review
  app.post('/api/reviews/:id/like', (req: Request, res: Response) => {
    const { id } = req.params;
    const review = reviews.find(r => r.id === id);
    if (!review) {
      res.status(404).json({ error: 'Review not found.' });
      return;
    }
    review.likes += 1;
    res.json({ success: true, likes: review.likes });
  });

  // 7. Get All Bookings (Admin/Kathy View)
  app.get('/api/bookings', (_req: Request, res: Response) => {
    res.json({
      count: bookings.length,
      bookings
    });
  });

  // 8. Create New Booking
  app.post('/api/bookings', (req: Request, res: Response) => {
    const {
      serviceId,
      serviceName,
      price,
      duration,
      date,
      time,
      clientName,
      phone,
      email,
      nailArtAddon,
      waterChemicalLifestyle,
      notes
    } = req.body;

    if (!clientName || !phone || !date || !time) {
      res.status(400).json({ error: 'Client name, phone, date, and time are required.' });
      return;
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: serviceId || 'biab-overlay',
      serviceName: serviceName || 'Builder Gel (BIAB) Structured Overlay',
      price: Number(price) || 75,
      duration: duration || '75 min',
      date,
      time,
      clientName: String(clientName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      nailArtAddon: Boolean(nailArtAddon),
      waterChemicalLifestyle: Boolean(waterChemicalLifestyle),
      notes: notes ? String(notes).trim() : undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  });

  // 9. Update Booking Status (e.g. Confirmed, Completed, Cancelled)
  app.patch('/api/bookings/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found.' });
      return;
    }

    if (status && ['confirmed', 'pending', 'completed', 'cancelled'].includes(status)) {
      booking.status = status;
      res.json({ success: true, booking });
    } else {
      res.status(400).json({ error: 'Invalid status' });
    }
  });

  // 10. Contact Inquiry
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, contact, message } = req.body;
    if (!name || !message) {
      res.status(400).json({ error: 'Name and message are required.' });
      return;
    }
    const entry = {
      id: `inq-${Date.now()}`,
      name,
      contact: contact || '',
      message,
      date: new Date().toISOString()
    };
    contacts.push(entry);
    res.status(201).json({ success: true, message: 'Kathy received your inquiry!' });
  });

  // Vite Integration (SPA Middleware in Dev, Static in Prod)
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Beauty Corner by Kathy] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

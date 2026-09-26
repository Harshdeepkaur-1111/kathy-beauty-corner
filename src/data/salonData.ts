import { IMAGES } from '../assets/images';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'builder_gel' | 'nail_art' | 'acrylics' | 'care_spa';
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  reviewCountInfo?: string;
  photosCount?: number;
  text: string;
  highlightedPhrase?: string;
  tags: string[];
  ownerResponse?: {
    timeAgo: string;
    text: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'builder_gel' | 'nail_art' | 'french' | 'studio';
  image: string;
  description: string;
  tag: string;
}

export const SALON_INFO = {
  name: "Beauty corner by Kathy",
  tagline: "Bespoke Nail Artistry & Health-First Beauty Parlour",
  rating: 5.0,
  reviewCount: 23,
  category: "Beauty Parlour · Nail Salon",
  address: "44751 Brimfield Dr Ste 116, Ashburn, VA 20147, United States",
  street: "44751 Brimfield Dr Ste 116",
  cityStateZip: "Ashburn, VA 20147",
  plusCode: "3G2W+6W Ashburn, Virginia, USA",
  phone: "+1 571-660-8879",
  displayPhone: "(571) 660-8879",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=44751+Brimfield+Dr+Ste+116+Ashburn+VA+20147",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=44751+Brimfield+Dr+Ste+116+Ashburn+VA+20147",
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Thursday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Friday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Saturday", open: "9:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Sunday", open: "10:00 AM", close: "4:00 PM", isOpen: true, note: "By appointment" }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "biab-overlay",
    name: "Builder Gel (BIAB) Structured Overlay",
    category: "builder_gel",
    duration: "75 min",
    price: 75,
    description: "Strengthening overlay on natural nails using premium European Builder in a Bottle. Ideal for growing strong natural nails and resisting water/chemicals.",
    popular: true
  },
  {
    id: "biab-extensions",
    name: "Builder Gel Full Set with Extensions",
    category: "builder_gel",
    duration: "95 min",
    price: 95,
    description: "Lightweight, flexible yet durable extensions sculpted with builder gel. No harsh odor, gentle soak/buff, natural look.",
    popular: true
  },
  {
    id: "biab-infill",
    name: "Builder Gel Infill & Rebalance",
    category: "builder_gel",
    duration: "65 min",
    price: 65,
    description: "Maintenance service every 3-4 weeks. Growth fill, apex rebalancing, cuticles detailed, and fresh glossy gel top coat."
  },
  {
    id: "custom-nail-art-tier1",
    name: "Signature Nail Art · Minimalist & Micro-French",
    category: "nail_art",
    duration: "30 min",
    price: 25,
    description: "Ultra-fine French micro-lines, chrome glazed finish, subtle metallic leaf, or single accent finger per hand."
  },
  {
    id: "custom-nail-art-tier2",
    name: "Bespoke Hand-Painted Art & 3D Accents",
    category: "nail_art",
    duration: "45 min",
    price: 45,
    description: "Detailed hand-painted florals, abstract geometry, marble textures, blooming gel designs, or custom reference artwork.",
    popular: true
  },
  {
    id: "acrylic-full-set",
    name: "Full Set High-Durability Acrylics",
    category: "acrylics",
    duration: "90 min",
    price: 85,
    description: "Expertly sculpted acrylics crafted for heavy daily hands-on wear. Maximum longevity, perfect apex architecture, and custom shaping.",
    popular: true
  },
  {
    id: "acrylic-refill",
    name: "Acrylic Refill & Shape Resculpt",
    category: "acrylics",
    duration: "60 min",
    price: 55,
    description: "Immaculate refill with seamless cuticle blend, color change, and edge re-crisping for flawless wear."
  },
  {
    id: "natural-restoration",
    name: "Nail Health & Cuticle Restoration Therapy",
    category: "care_spa",
    duration: "50 min",
    price: 50,
    description: "Intensive treatment for damaged, brittle, or chemically exposed nails. Gentle dry Russian cuticle technique, keratin infusion, and organic oils."
  },
  {
    id: "deluxe-spa-pedicure",
    name: "Deluxe Aromatherapy Spa Pedicure",
    category: "care_spa",
    duration: "60 min",
    price: 65,
    description: "Herbal foot soak, organic exfoliating sugar scrub, callus smoothing, hydrating mask with warm towels, and long-wear gel polish."
  }
];

export const REVIEWS: ReviewItem[] = [
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
    tags: ["nail compliments", "nail art", "acrylics & durability"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Glazed Donut Natural Builder Gel",
    category: "builder_gel",
    image: IMAGES.builderGel,
    description: "Structured BIAB overlay on natural nail length with soft pearlescent chrome powder finish.",
    tag: "Builder Gel"
  },
  {
    id: "gal-2",
    title: "Minimalist Micro-French & Gold Foil",
    category: "nail_art",
    image: IMAGES.nailArt,
    description: "Sculpted almond shape with ultra-thin modern French smile lines and delicate 24k gold leaf accents.",
    tag: "Nail Art"
  },
  {
    id: "gal-3",
    title: "Boutique Private Suite Atmosphere",
    category: "studio",
    image: IMAGES.salonAtmosphere,
    description: "Immaculate, peaceful private studio suite in Ashburn with medical-grade sanitation and curated gel collections.",
    tag: "Studio Suite"
  },
  {
    id: "gal-4",
    title: "Ashburn Beauty Parlour Reception",
    category: "studio",
    image: IMAGES.hero,
    description: "Calm, welcoming sanctuary designed for relaxation, personalized attention, and luxury nail services.",
    tag: "Beauty Corner"
  }
];

export const FAQS = [
  {
    q: "Where exactly is Beauty corner by Kathy located?",
    a: "We are located at 44751 Brimfield Dr Ste 116, Ashburn, VA 20147, United States. We are situated in a convenient, quiet commercial suite with ample free parking right outside our entrance."
  },
  {
    q: "What makes Kathy's builder gel and acrylics last so long?",
    a: "Kathy uses a meticulous dry cuticle prep technique and premium European builder gels that chemically bond with your natural nail plate without causing thinning or trauma. Clients who work extensively with water or chemicals regularly report zero lifting for 3 to 4+ weeks."
  },
  {
    q: "Can I bring an inspiration photo from Instagram or Pinterest?",
    a: "Yes! Kathy loves turning your inspiration photos into wearable art. You can share your picture in the booking note or bring it directly to your appointment."
  },
  {
    q: "Is the studio clean and sanitary?",
    a: "Absolutely. Everything is maintained to hospital-grade standards. Metal tools are sanitized and autoclaved between every client, while nail files, buffers, and table liners are strictly single-use."
  },
  {
    q: "How do I schedule or reschedule an appointment?",
    a: "You can book directly through our online booking button on this website or call/text Kathy directly at (571) 660-8879."
  }
];

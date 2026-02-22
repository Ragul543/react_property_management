/**
 * This file now serves as FALLBACK demo data.
 * The app fetches real data from Odoo API.
 * If the API is unavailable, these are shown as placeholders.
 */

const demoProperties = [
  {
    id: 'demo-1',
    name: "Luxury Oceanfront Villa",
    location: "Malibu, California",
    price: 4500000,
    property_type: "residential",
    sale_rent: "for_sale",
    state: "available",
    beds: 5,
    baths: 4,
    sqft: 4200,
    parking: 2,
    construct_year: "2021",
    description:
      "Stunning oceanfront villa with panoramic Pacific views. Floor-to-ceiling windows, gourmet chef's kitchen, infinity pool, private beach access, and smart home system.",
    facilities: ["Infinity Pool", "Private Beach", "Smart Home", "Wine Cellar", "Home Theater"],
    tags: ["Luxury", "Oceanfront"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    agent: {
      name: "Sarah Mitchell",
      phone: "+1 (310) 555-0142",
      email: "sarah@luxeestates.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: 'demo-2',
    name: "Modern Penthouse Suite",
    location: "Manhattan, New York",
    price: 8900000,
    property_type: "residential",
    sale_rent: "for_sale",
    state: "available",
    beds: 4,
    baths: 3,
    sqft: 3800,
    parking: 1,
    construct_year: "2023",
    description:
      "Extraordinary penthouse with 360-degree skyline views. Private elevator, double-height living room, heated floors, and wraparound terrace.",
    facilities: ["360° Views", "Private Elevator", "Heated Floors", "Concierge", "Fitness Center"],
    tags: ["Penthouse", "Skyline"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    agent: {
      name: "James Rodriguez",
      phone: "+1 (212) 555-0198",
      email: "james@luxeestates.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: 'demo-3',
    name: "Contemporary Lake House",
    location: "Lake Tahoe, Nevada",
    price: 3200000,
    property_type: "residential",
    sale_rent: "for_sale",
    state: "available",
    beds: 4,
    baths: 3,
    sqft: 3500,
    parking: 2,
    construct_year: "2020",
    description:
      "Breathtaking lake house with direct waterfront access. Exposed timber beams, stone fireplace, private dock, and outdoor kitchen.",
    facilities: ["Lake Access", "Private Dock", "Stone Fireplace", "Outdoor Kitchen"],
    tags: ["Lakefront", "Modern"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    ],
    agent: {
      name: "Emily Chen",
      phone: "+1 (775) 555-0167",
      email: "emily@luxeestates.com",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Jonathan & Claire Hayes",
    role: "Homeowners",
    text: "LuxeEstates made our dream of owning a beachfront property a reality. Their team's dedication, market expertise, and attention to detail were unmatched.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Victoria Summers",
    role: "Investor",
    text: "I've worked with many real estate firms, but LuxeEstates stands in a league of their own. Their portfolio of premium properties and investment insights have been invaluable.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Robert & Amanda Chen",
    role: "Homeowners",
    text: "From our first consultation to closing day, the experience was seamless. The team understood exactly what we were looking for and found us the perfect penthouse.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
  },
];

export default demoProperties;

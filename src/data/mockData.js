/**
 * Mock Data for Skyline Luxury Real Estate
 */

export const PROPERTIES = [
  {
    id: 1,
    price: "$2,450,000",
    address: "1088 Park Avenue, Manhattan, NY",
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "Condo",
    coords: { top: '30%', left: '45%' },
    latlng: [40.7812, -73.9576],
    description: "A rare pre-war gem featuring 12-foot ceilings, herringbone oak floors, and a chef's kitchen with Wolf appliances. The master suite offers a sanctuary with direct park views.",
    images: [
      "https://photos.zillowstatic.com/fp/e1a9b98b3e65228bcc5defc18eb9c510-se_large_800_400.webp",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    price: "$5,900,000",
    address: "888 Biscayne Blvd, Miami, FL",
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: "Penthouse",
    coords: { top: '70%', left: '55%' },
    latlng: [25.7839, -80.1870],
    description: "Sky-high luxury with 360-degree ocean views. Features a private elevator, wrap-around terrace, and smart-home integration throughout.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    price: "$1,850,000",
    address: "443 Greenwich St, Tribeca, NY",
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: "Loft",
    coords: { top: '35%', left: '42%' },
    latlng: [40.7225, -74.0097],
    description: "Authentic industrial loft living. Exposed brick, massive timber beams, and oversized windows define this quintessential Tribeca residence.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    price: "$3,200,000",
    address: "900 W Olympic Blvd, Los Angeles, CA",
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    type: "Villa",
    coords: { top: '50%', left: '20%' },
    latlng: [34.0456, -118.2635],
    description: "Modern minimalism meets Hollywood glam. Private pool, outdoor kitchen, and floor-to-ceiling glass walls blurring the lines between indoor and outdoor living.",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    price: "$4,150,000",
    address: "505 N Lake Shore Dr, Chicago, IL",
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Penthouse",
    coords: { top: '25%', left: '60%' },
    latlng: [41.8906, -87.6136],
    description: "The crown jewel of the Gold Coast. Exquisite millwork, marble fireplaces, and commanding views of Lake Michigan.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const FEATURES = [
  { iconName: "Waves", label: "Infinity Pool", desc: "Heated saltwater lap pool" },
  { iconName: "Dumbbell", label: "Private Gym", desc: "Technogym equipment" },
  { iconName: "Car", label: "Valet Parking", desc: "24/7 secure underground" },
  { iconName: "Shield", label: "Concierge", desc: "Round-the-clock security" },
  { iconName: "Wifi", label: "Smart Home", desc: "Integrated automation" },
  { iconName: "Coffee", label: "Lounge", desc: "Residents only club" }
];

export const LOCATIONS = [
  { name: "Tribeca, NY", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "12 Listings" },
  { name: "Beverly Hills, CA", image: "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "8 Listings" },
  { name: "Brickell, Miami", image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "15 Listings" }
];

export const JOURNAL_POSTS = [
  { 
    title: "Market Outlook 2026", 
    date: "Jan 15, 2026", 
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "The Art of Penthouse Living", 
    date: "May 28, 2026", 
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Sustainable Luxury Architecture", 
    date: "Jun 02, 2026", 
    category: "Design",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS = [
  {
    text: "Skyline didn't just find us a house; they curated a lifestyle. The attention to detail and access to off-market listings was unparalleled.",
    author: "Jonathan & Claire R.",
    location: "Purchased in Upper East Side"
  },
  {
    text: "The most seamless real estate transaction of my life. Victoria understands the value of discretion and time for high-profile clients.",
    author: "Marcus T.",
    location: "Purchased in Miami Beach"
  }
];

export const AGENT = {
  name: "Victoria Sterling",
  title: "Senior Broker",
  bio: "With over 15 years in the luxury market, Victoria specializes in finding architectural masterpieces for discerning clients worldwide.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  phone: "+1 (212) 555-0123",
  email: "victoria@skyline.luxury"
};

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  Square, 
  Phone, 
  Mail, 
  Waves, 
  Dumbbell, 
  Car, 
  Wifi, 
  Coffee, 
  Shield,
  Play,
  ArrowRight,
  Quote,
  MapPin,
  Send,
  Calendar,
  SlidersHorizontal,
  Map as MapIcon,
  Maximize2
} from 'lucide-react';

/**
 * Mock Data
 */
const PROPERTIES = [
  {
    id: 1,
    price: "$2,450,000",
    address: "1088 Park Avenue, Manhattan, NY",
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "Condo",
    coords: { top: '30%', left: '45%' },
    description: "A rare pre-war gem featuring 12-foot ceilings, herringbone oak floors, and a chef's kitchen with Wolf appliances. The master suite offers a sanctuary with direct park views.",
    images: [
      "https://photos.zillowstatic.com/fp/e1a9b98b3e65228bcc5defc18eb9c510-se_large_800_400.webp",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Interior 1
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Interior 2
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
    description: "The crown jewel of the Gold Coast. Exquisite millwork, marble fireplaces, and commanding views of Lake Michigan.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const FEATURES = [
  { icon: Waves, label: "Infinity Pool", desc: "Heated saltwater lap pool" },
  { icon: Dumbbell, label: "Private Gym", desc: "Technogym equipment" },
  { icon: Car, label: "Valet Parking", desc: "24/7 secure underground" },
  { icon: Shield, label: "Concierge", desc: "Round-the-clock security" },
  { icon: Wifi, label: "Smart Home", desc: "Integrated automation" },
  { icon: Coffee, label: "Lounge", desc: "Residents only club" }
];

const LOCATIONS = [
  { name: "Tribeca, NY", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "12 Listings" },
  { name: "Beverly Hills, CA", image: "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "8 Listings" },
  { name: "Brickell, Miami", image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", count: "15 Listings" }
];

const JOURNAL_POSTS = [
  { 
    title: "Market Outlook 2025", 
    date: "Oct 12, 2024", 
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "The Art of Penthouse Living", 
    date: "Sep 28, 2024", 
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Sustainable Luxury Architecture", 
    date: "Sep 15, 2024", 
    category: "Design",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const TESTIMONIALS = [
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

const AGENT = {
  name: "Victoria Sterling",
  title: "Senior Broker",
  bio: "With over 15 years in the luxury market, Victoria specializes in finding architectural masterpieces for discerning clients worldwide.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  phone: "+1 (212) 555-0123",
  email: "victoria@skyline.luxury"
};

/**
 * Components
 */

// Property Detail Modal
const PropertyModal = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#0B1120] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white hover:text-[#D4AF37] rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Gallery Section */}
        <div className="w-full md:w-2/3 h-[40vh] md:h-full relative flex flex-col">
          <div className="flex-1 relative">
            <img 
              src={property.images[activeImage]} 
              alt={property.address} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-sm text-white">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37]">Price</p>
                <p className="text-xl font-light">{property.price}</p>
              </div>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="h-24 bg-[#050914] p-2 flex gap-2 overflow-x-auto">
            {property.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 h-full aspect-[4/3] border-2 transition-all ${activeImage === idx ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 bg-[#0F172A] p-8 overflow-y-auto border-l border-white/5">
          <div className="mb-6">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[#D4AF37] rounded-sm inline-block mb-4">
              {property.type}
            </span>
            <h2 className="text-2xl text-white font-light leading-snug mb-2">{property.address}</h2>
            <div className="flex gap-4 text-gray-400 text-sm mt-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1"><Bed size={16}/> {property.beds} Beds</div>
              <div className="flex items-center gap-1"><Bath size={16}/> {property.baths} Baths</div>
              <div className="flex items-center gap-1"><Square size={16}/> {property.sqft} sqft</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-medium mb-3">About this residence</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-medium mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Concierge', 'Gym Access', 'Smart Home', 'Wine Cellar'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-[#162032] p-6 rounded-sm border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <img src={AGENT.image} alt={AGENT.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
              <div>
                <p className="text-white text-sm font-medium">{AGENT.name}</p>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Listing Agent</p>
              </div>
            </div>
            <button className="w-full bg-[#D4AF37] text-[#0F172A] py-3 uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors mb-3">
              Schedule Private Tour
            </button>
            <button className="w-full border border-white/20 text-white py-3 uppercase text-xs font-bold tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
              Request Floor Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#D4AF37] rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#D4AF37] rounded-sm"></div>
            </div>
            <span className="text-2xl font-light tracking-widest text-white ml-2">
              SKYLINE
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Properties', 'Locations', 'Journal', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                {item}
              </a>
            ))}
            <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300">
              Book Viewing
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#D4AF37]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Properties', 'Locations', 'Journal', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2 text-base font-medium text-white hover:text-[#D4AF37]">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: 'any',
    beds: 'any',
    type: 'any'
  });

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Penthouse" 
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/40 to-[#0F172A]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
          Elevated Living
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide">
          Find your sanctuary in the world's most coveted addresses.
        </p>

        {/* Advanced Search Container */}
        <div className="relative max-w-3xl mx-auto">
          <div className="flex gap-2 relative z-20">
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-300 rounded-sm"
                placeholder="Enter City, Zip Code, or Address"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all rounded-sm flex items-center gap-2 ${showFilters ? 'bg-[#D4AF37] text-[#0F172A] border-[#D4AF37]' : ''}`}
            >
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button className="bg-[#D4AF37] text-[#0F172A] px-8 font-medium hover:bg-white transition-colors duration-300 rounded-sm uppercase text-sm tracking-widest">
              Search
            </button>
          </div>

          {/* Collapsible Filters Panel */}
          <div className={`absolute top-full left-0 right-0 mt-2 bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl transition-all duration-300 origin-top transform ${showFilters ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Price Range</label>
                <select className="w-full bg-white/5 border border-white/10 text-white p-2 text-sm focus:border-[#D4AF37] outline-none rounded-sm">
                  <option>Any Price</option>
                  <option>$1M - $3M</option>
                  <option>$3M - $5M</option>
                  <option>$5M - $10M</option>
                  <option>$10M+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Property Type</label>
                <select className="w-full bg-white/5 border border-white/10 text-white p-2 text-sm focus:border-[#D4AF37] outline-none rounded-sm">
                  <option>All Types</option>
                  <option>Condo</option>
                  <option>Penthouse</option>
                  <option>Townhouse</option>
                  <option>Estate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Bedrooms</label>
                <div className="flex gap-2">
                  {['Any', '2+', '3+', '4+'].map(opt => (
                    <button key={opt} className="flex-1 bg-white/5 border border-white/10 text-white py-2 text-xs hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors rounded-sm">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-12 flex justify-center gap-8 md:gap-16 text-center">
          {[
            { label: "Listings", value: "200+" },
            { label: "Cities", value: "15" },
            { label: "Years", value: "25" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-light text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-[#D4AF37] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Interactive Map Section
const InteractiveMap = ({ onSelectProperty }) => {
  return (
    <section className="py-24 bg-[#0B1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">Map View</h2>
          <h3 className="text-3xl md:text-4xl text-white font-light">Explore Our Collection</h3>
        </div>

        <div className="relative w-full h-[600px] bg-[#050914] rounded-lg overflow-hidden border border-white/10 group">
          {/* Static Map Background (Dark Mode Style) */}
          <div 
            className="absolute inset-0 opacity-70 grayscale-0 transition-all duration-700"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          <div className="absolute inset-0 bg-[#0F172A]/30"></div>

          {/* Interactive Pins */}
          {PROPERTIES.map((prop) => (
            <button
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-10 focus:outline-none"
              style={{ top: prop.coords.top, left: prop.coords.left }}
            >
              <div className="relative flex items-center justify-center">
                {/* Pulse Effect */}
                <div className="absolute w-12 h-12 bg-[#D4AF37]/30 rounded-full animate-ping"></div>
                {/* Pin Icon */}
                <div className="relative w-8 h-8 bg-[#D4AF37] text-[#0F172A] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <MapPin size={18} fill="currentColor" />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white p-2 rounded shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <img src={prop.images[0]} alt="" className="w-full h-24 object-cover mb-2 rounded-sm" />
                  <p className="text-[#0F172A] font-bold text-xs">{prop.price}</p>
                  <p className="text-gray-500 text-[10px] truncate">{prop.address}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                </div>
              </div>
            </button>
          ))}
          
          <div className="absolute bottom-8 left-8 bg-[#0F172A]/90 backdrop-blur border border-white/10 p-4 rounded-sm text-white max-w-xs">
            <h4 className="flex items-center gap-2 text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-1">
              <MapIcon size={16} /> Global Reach
            </h4>
            <p className="text-xs text-gray-400">Select a pin to preview residence details. Locations are approximate for client privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Locations = () => {
  return (
    <section id="locations" className="py-24 bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">Destinations</h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">Coveted Neighborhoods</h3>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-[#D4AF37] uppercase text-xs tracking-widest hover:text-white transition-colors">
            View All Locations <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, idx) => (
            <div key={idx} className="group relative h-96 cursor-pointer overflow-hidden rounded-sm">
              <img 
                src={loc.image} 
                alt={loc.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">{loc.count}</p>
                <h4 className="text-2xl text-white font-light">{loc.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedListings = ({ onSelectProperty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PROPERTIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PROPERTIES.length) % PROPERTIES.length);
  };

  const displayedProperties = [
    PROPERTIES[currentIndex],
    PROPERTIES[(currentIndex + 1) % PROPERTIES.length],
    PROPERTIES[(currentIndex + 2) % PROPERTIES.length]
  ];

  return (
    <section id="properties" className="py-24 bg-[#0B1120] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">Exclusive Collection</h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">Featured Residences</h3>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              className="p-3 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property, idx) => (
            <div 
              key={`${property.id}-${idx}`} 
              className="group cursor-pointer"
              onClick={() => onSelectProperty(property)}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6">
                <img 
                  src={property.images[0]} 
                  alt={property.address}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#0F172A]/90 backdrop-blur px-4 py-2 text-[#D4AF37] font-medium tracking-wide z-10">
                  {property.price}
                </div>
                {/* View Details Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white border border-white px-6 py-3 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                    <Maximize2 size={16} /> View Details
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl text-white font-light truncate">{property.address}</h4>
                
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-[#D4AF37]" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={16} className="text-[#D4AF37]" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={16} className="text-[#D4AF37]" />
                    <span>{property.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CinematicTours = () => {
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Video Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/40"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-4">Cinematic Tours</h2>
        <h3 className="text-3xl md:text-5xl text-white font-light mb-8">Experience the Exceptional</h3>
        
        <button className="group relative inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
          <Play size={32} className="text-white ml-2 fill-current group-hover:text-[#0F172A]" />
          <span className="absolute -bottom-10 text-xs text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Play Video</span>
        </button>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">Amenities</h2>
          <h3 className="text-3xl md:text-4xl text-white font-light mb-6">Uncompromising Luxury</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 hover:bg-white/5 transition-colors duration-300 rounded-sm group">
              <div className="flex-shrink-0 p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-sm group-hover:bg-[#D4AF37] group-hover:text-[#0F172A] transition-all duration-300">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{feature.label}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Journal = () => {
  return (
    <section id="journal" className="py-24 bg-[#0B1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">The Journal</h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">Market Insights</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/2] mb-6">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[#0F172A] text-xs font-bold uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest mb-3">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
              <h4 className="text-xl text-white font-light mb-3 group-hover:text-[#D4AF37] transition-colors">{post.title}</h4>
              <a href="#" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                Read Article <ArrowRight size={14} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Quote size={48} className="text-[#D4AF37] mx-auto mb-8 opacity-50" />
        <h2 className="text-2xl md:text-3xl text-white font-light italic leading-relaxed mb-8">
          "{TESTIMONIALS[0].text}"
        </h2>
        <div>
          <p className="text-[#D4AF37] font-medium tracking-wide uppercase text-sm mb-1">{TESTIMONIALS[0].author}</p>
          <p className="text-gray-500 text-xs uppercase tracking-widest">{TESTIMONIALS[0].location}</p>
        </div>
        
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-12 h-1 bg-[#D4AF37]"></div>
          <div className="w-2 h-1 bg-white/20"></div>
          <div className="w-2 h-1 bg-white/20"></div>
        </div>
      </div>
    </section>
  );
};

const AgentProfile = () => {
  return (
    <section id="agents" className="py-24 bg-[#0B1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#162032] to-[#0F172A] rounded-2xl p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            {/* Image Container with Gold Rings */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full p-1 border border-[#D4AF37]/30">
                <div className="w-full h-full rounded-full p-1 border border-[#D4AF37]/60">
                  <img 
                    src={AGENT.image} 
                    alt={AGENT.name} 
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-[#0F172A] px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                Top Producer
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-[#D4AF37] font-medium mb-1">{AGENT.title}</h2>
              <h3 className="text-3xl md:text-4xl text-white font-light mb-6">{AGENT.name}</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-light mb-8 max-w-2xl">
                "{AGENT.bio}"
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button className="flex items-center gap-3 bg-white text-[#0F172A] px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-[#D4AF37] transition-colors duration-300 w-full sm:w-auto justify-center">
                  <Phone size={16} />
                  Contact Agent
                </button>
                <button className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 uppercase text-xs font-bold tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 w-full sm:w-auto justify-center">
                  <Mail size={16} />
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-24 bg-[#0F172A] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-2">Inquire</h2>
          <h3 className="text-3xl md:text-4xl text-white font-light">Begin Your Journey</h3>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">First Name</label>
              <input type="text" className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">Last Name</label>
              <input type="text" className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">Email Address</label>
              <input type="email" className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">Phone</label>
              <input type="tel" className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">Asset of Interest</label>
            <select className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
              <option>General Inquiry</option>
              <option>1088 Park Avenue</option>
              <option>888 Biscayne Blvd</option>
              <option>443 Greenwich St</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">Message</label>
            <textarea rows="4" className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"></textarea>
          </div>

          <button className="w-full bg-[#D4AF37] text-[#0F172A] py-5 uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
            Send Inquiry <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-[#050914] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 border border-[#D4AF37] rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-sm"></div>
              </div>
              <span className="text-xl font-light tracking-widest">SKYLINE</span>
            </div>
            <p className="text-gray-500 font-light max-w-md leading-relaxed">
              Redefining luxury real estate. We curate the world's most exceptional properties for a clientele that expects nothing less than perfection.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              {['Home', 'Properties', 'Locations', 'Journal', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Office</h4>
            <address className="not-italic text-gray-400 font-light space-y-4">
              <p>1500 Broadway, Suite 3200<br/>New York, NY 10036</p>
              <p>+1 (212) 555-0199<br/>hello@skyline.luxury</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
          <p>&copy; 2024 Skyline Real Estate. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy</a>
            <a href="#" className="hover:text-gray-400">Terms</a>
            <a href="#" className="hover:text-gray-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="font-sans antialiased bg-[#0F172A] selection:bg-[#D4AF37] selection:text-[#0F172A]">
      <style>
        {`
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-slow-zoom {
            animation: slow-zoom 20s infinite alternate linear;
          }
        `}
      </style>
      <Navbar />
      <Hero />
      <Locations />
      <InteractiveMap onSelectProperty={setSelectedProperty} />
      <FeaturedListings onSelectProperty={setSelectedProperty} />
      <CinematicTours />
      <Features />
      <Journal />
      <Testimonials />
      <AgentProfile />
      <ContactForm />
      <Footer />
      
      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
};

export default App;
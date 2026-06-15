import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { apiService } from './services/api';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Locations from './components/Locations';
import InteractiveMap from './components/InteractiveMap';
import FeaturedListings from './components/FeaturedListings';
import CinematicTours from './components/CinematicTours';
import VideoModal from './components/VideoModal';
import Features from './components/Features';
import Journal from './components/Journal';
import Testimonials from './components/Testimonials';
import AgentProfile from './components/AgentProfile';
import ContactForm from './components/ContactForm';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import PropertyModal from './components/PropertyModal';
import BookingModal from './components/BookingModal';
import GoldDivider from './components/GoldDivider';

/**
 * App - Coordinator for Skyline Luxury Real Estate single-page app.
 * Directs scroll positioning, search queries, modals, and content layouts.
 */
export const App = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals
  const [showVideo, setShowVideo] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState(null);
  
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dynamic Data Load on Mount (CMS-Ready)
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      const data = await apiService.getProperties();
      setProperties(data);
      setFilteredProperties(data);
      setIsLoading(false);
    };
    loadProperties();
  }, []);

  // Scroll Reveal IntersectionObserver
  useEffect(() => {
    // Only set up observer if loading is complete and assets exist
    if (isLoading || filteredProperties.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [isLoading, filteredProperties]);

  // Track scroll height for back to top floating button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (propertyName = 'General Viewing Appointment') => {
    setBookingProperty(propertyName);
    setIsBookingOpen(true);
  };

  // Dynamic property filtering logic
  const handleSearch = ({ query, price, type, beds }) => {
    const filtered = properties.filter((prop) => {
      // 1. Query search Match (checks address, type, and description)
      if (query) {
        const q = query.toLowerCase();
        const matchAddress = prop.address.toLowerCase().includes(q);
        const matchType = prop.type.toLowerCase().includes(q);
        const matchDesc = prop.description.toLowerCase().includes(q);
        if (!matchAddress && !matchType && !matchDesc) return false;
      }

      // 2. Price filter
      if (price && price !== 'any') {
        const numericPrice = parseInt(prop.price.replace(/[^0-9]/g, ''), 10);
        if (price === '$1M - $3M' && (numericPrice < 1000000 || numericPrice > 3000000)) return false;
        if (price === '$3M - $5M' && (numericPrice < 3000000 || numericPrice > 5000000)) return false;
        if (price === '$5M - $10M' && (numericPrice < 5000000 || numericPrice > 10000000)) return false;
        if (price === '$10M+' && numericPrice < 10000000) return false;
      }

      // 3. Type filter
      if (type && type !== 'any') {
        if (prop.type.toLowerCase() !== type.toLowerCase()) return false;
      }

      // 4. Bedrooms count minimum filter
      if (beds && beds !== 'Any') {
        const minBeds = parseInt(beds.replace('+', ''), 10);
        if (prop.beds < minBeds) return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
    
    // Smooth scroll to property listing results
    setTimeout(() => {
      const propertiesSection = document.getElementById('properties');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="font-sans antialiased bg-brand-navy selection:bg-brand-gold selection:text-brand-navy">
      {/* Header Navigation */}
      <Navbar onBookViewing={() => handleOpenBooking()} />

      {/* Main Content Wrap */}
      <main id="main-content" tabIndex="-1" className="focus:outline-none">
        <Hero onSearch={handleSearch} />
        
        <AboutUs />
        <GoldDivider />
        
        <Locations />
        <GoldDivider />
        
        {/* Pass loading status or fallback layout */}
        {!isLoading && (
          <>
            <InteractiveMap properties={filteredProperties} onSelectProperty={setSelectedProperty} />
            <GoldDivider />
            
            <FeaturedListings properties={filteredProperties} onSelectProperty={setSelectedProperty} />
            <GoldDivider />
          </>
        )}
        
        <CinematicTours onPlayClick={() => setShowVideo(true)} />
        <GoldDivider />
        
        <Features />
        <GoldDivider />
        
        <Journal />
        <GoldDivider />
        
        <Testimonials />
        <GoldDivider />
        
        <AgentProfile />
        <GoldDivider />
        
        <ContactForm />
        <GoldDivider />
        
        <Newsletter />
      </main>

      {/* Footer Navigation */}
      <Footer />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 bg-brand-gold text-brand-navy hover:bg-white hover:text-brand-navy transition-all duration-300 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Scroll to top of page"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
          onScheduleTour={(address) => handleOpenBooking(address)}
        />
      )}

      {/* Booking Scheduling Calendar Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingProperty(null);
        }}
        propertyName={bookingProperty || undefined}
      />

      {/* Cinematic Walkthrough Video Modal */}
      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl="https://www.youtube.com/embed/kRCFc35K9uM"
      />
    </div>
  );
};

export default App;
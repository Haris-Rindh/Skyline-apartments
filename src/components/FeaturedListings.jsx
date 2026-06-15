import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, Maximize2 } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

/**
 * FeaturedListings - Carousel and grid displaying exclusive property listings.
 * Adapts dynamically to filtered property list lengths.
 */
export const FeaturedListings = ({ properties = [], onSelectProperty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index if property count changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [properties.length]);

  const nextSlide = () => {
    if (properties.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    if (properties.length <= 3) return;
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  // 1. Zero properties found state
  if (properties.length === 0) {
    return (
      <section id="properties" className="py-24 bg-brand-navy-deep relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Exclusive Collection</span>
          <h2 className="text-3xl text-white font-light mb-6">No Listings Match</h2>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
            We couldn't find any residences matching your specific filters. Try entering a different city, adjusting the price thresholds, or resetting advanced criteria.
          </p>
        </div>
      </section>
    );
  }

  // 2. Resolve displayed properties dynamically (up to 3)
  const displayedProperties = [];
  const itemsToDisplay = Math.min(properties.length, 3);
  for (let i = 0; i < itemsToDisplay; i++) {
    displayedProperties.push(properties[(currentIndex + i) % properties.length]);
  }

  return (
    <section id="properties" className="py-24 bg-brand-navy-deep relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Exclusive Collection</span>
            <h2 className="text-3xl md:text-4xl text-white font-light">Featured Residences</h2>
          </div>
          
          {/* Navigation Controls (Show only if list exceeds 3 properties) */}
          {properties.length > 3 && (
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-3 border border-white/10 hover:border-brand-gold text-white hover:text-brand-gold transition-all duration-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-gold"
                aria-label="Previous listings slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 border border-white/10 hover:border-brand-gold text-white hover:text-brand-gold transition-all duration-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-gold"
                aria-label="Next listings slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property, idx) => (
            <div 
              key={`${property.id}-${idx}`} 
              className={`group cursor-pointer reveal reveal-delay-${idx + 1}`}
              onClick={() => onSelectProperty(property)}
              role="button"
              tabIndex={0}
              aria-label={`View detail specifications for ${property.address}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectProperty(property);
                }
              }}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-sm">
                <LuxuryImage 
                  src={property.images[0]} 
                  alt={`Modern architecture exterior view of luxury property at ${property.address}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  lazy={true}
                />
                <div className="absolute top-4 right-4 bg-brand-navy/90 backdrop-blur px-4 py-2 text-brand-gold font-medium tracking-wide z-10 text-sm">
                  {property.price}
                </div>
                
                {/* View Details Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white border border-white px-6 py-3 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors font-semibold">
                    <Maximize2 size={16} /> View Details
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl text-white font-light truncate leading-snug">{property.address}</h3>
                
                {/* Specs - Improved Contrast text-gray-300 */}
                <div className="flex items-center space-x-6 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-brand-gold" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={16} className="text-brand-gold" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={16} className="text-brand-gold" />
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

export default FeaturedListings;

import React from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

/**
 * InteractiveMap - Displays property locations on a custom dark mockup map.
 * Pins automatically adjust to filtered properties.
 */
export const InteractiveMap = ({ properties = [], onSelectProperty }) => {
  return (
    <section className="py-24 bg-brand-navy-deep border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="mb-12 text-center">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Map View</span>
          <h2 className="text-3xl md:text-4xl text-white font-light">Explore Our Collection</h2>
        </div>

        <div className="relative w-full h-[600px] bg-brand-navy-darkest rounded-lg overflow-hidden border border-white/10 group">
          {/* Static Map Background (Dark Mode Style) */}
          <div 
            className="absolute inset-0 opacity-70 grayscale transition-all duration-700"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-hidden="true"
          ></div>
          
          <div className="absolute inset-0 bg-brand-navy/30" aria-hidden="true"></div>

          {/* Interactive Pins */}
          {properties.map((prop) => (
            <button
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-10 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-full"
              style={{ top: prop.coords.top, left: prop.coords.left }}
              aria-label={`View details for ${prop.address} listed at ${prop.price}`}
            >
              <div className="relative flex items-center justify-center">
                {/* Pulse Effect */}
                <div className="absolute w-12 h-12 bg-brand-gold/30 rounded-full animate-ping pointer-events-none"></div>
                {/* Pin Icon */}
                <div className="relative w-8 h-8 bg-brand-gold text-brand-navy rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <MapPin size={18} fill="currentColor" />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-brand-navy border border-white/10 p-3 rounded shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="w-full h-24 mb-2 rounded-sm overflow-hidden">
                    <LuxuryImage 
                      src={prop.images[0]} 
                      alt={`Preview of property at ${prop.address}`}
                      className="w-full h-full object-cover"
                      lazy={true}
                    />
                  </div>
                  <p className="text-white font-bold text-xs">{prop.price}</p>
                  <p className="text-gray-300 text-[10px] truncate">{prop.address}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-brand-navy border-r border-b border-white/10 rotate-45" aria-hidden="true"></div>
                </div>
              </div>
            </button>
          ))}
          
          {/* Map Info Box */}
          <div className="absolute bottom-8 left-8 bg-brand-navy/90 backdrop-blur border border-white/10 p-4 rounded-sm text-white max-w-xs z-10 select-none">
            <h3 className="flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mb-1">
              <MapIcon size={16} /> Global Reach
            </h3>
            <p className="text-xs text-gray-300">Select a pin to preview residence details. Locations are approximate for client privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;

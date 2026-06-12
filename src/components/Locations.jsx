import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';
import { LuxuryImage } from './LuxuryImage';

/**
 * Locations - Neighborhood destination grid showcasing coveted locations.
 * Animates text slide up on card hover.
 */
export const Locations = () => {
  return (
    <section id="locations" className="py-24 bg-brand-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] block mb-2">Destinations</span>
            <h2 className="text-3xl md:text-4xl text-white font-light">Coveted Neighborhoods</h2>
          </div>
          <a href="#properties" className="hidden md:flex items-center gap-2 text-brand-gold uppercase text-xs tracking-widest hover:text-white transition-colors duration-300 font-bold">
            View All Listings <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, idx) => (
            <div 
              key={idx} 
              className={`group relative h-96 cursor-pointer overflow-hidden rounded-sm reveal reveal-delay-${idx + 1}`}
            >
              {/* Lazy Loading Luxury Image */}
              <LuxuryImage 
                src={loc.image} 
                alt={`Premium luxury estates and properties in ${loc.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                lazy={true}
              />
              {/* Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/10 to-transparent opacity-90 transition-opacity duration-500"></div>
              
              {/* Hover Text Slide Up Animation */}
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                <p className="text-brand-gold text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">{loc.count}</p>
                <h3 className="text-2xl text-white font-light">{loc.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;

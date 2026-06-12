import React from 'react';
import { LuxuryImage } from './LuxuryImage';

/**
 * AboutUs - Brand story section showing luxury credentials and company values.
 */
export const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] block">The Skyline Estate</span>
            <h2 className="text-3xl md:text-5xl text-white font-light leading-tight">
              Curating Living Masterpieces Since 2001
            </h2>
            <p className="text-gray-300 font-light leading-relaxed text-base">
              At Skyline, we believe a home is more than just coordinates. It is a work of art, a sanctuary, and a reflection of your legacy. We specialize in matching discerning individuals with the world's most architectural and premium residences.
            </p>
            <p className="text-gray-300 font-light leading-relaxed text-sm">
              Our advisors possess deep market intelligence, providing elite access to off-market properties and bespoke transactional guidance. With representation in New York, Miami, Los Angeles, and Chicago, our global network ensures your real estate portfolio is handled with ultimate sophistication and absolute discretion.
            </p>
            
            {/* Stats / Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 select-none">
              <div>
                <p className="text-2xl font-light text-white">$15B+</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 leading-normal">Transaction Volume</p>
              </div>
              <div>
                <p className="text-2xl font-light text-white">98%</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 leading-normal">Client Retention</p>
              </div>
              <div>
                <p className="text-2xl font-light text-white">25 Yr</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 leading-normal">Refining Luxury</p>
              </div>
            </div>
          </div>

          {/* Graphical/Image Composition */}
          <div className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center">
            {/* Large background image */}
            <div className="w-[85%] h-[90%] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <LuxuryImage
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury double-height ceiling living room overlooking ocean waterfront"
                className="w-full h-full object-cover"
                lazy={true}
              />
            </div>
            {/* Smaller floating overlap image */}
            <div className="absolute bottom-4 left-4 w-[45%] h-[50%] rounded-sm overflow-hidden border border-white/20 shadow-2xl hidden md:block">
              <LuxuryImage
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Minimalist design kitchen detailing premium materials"
                className="w-full h-full object-cover"
                lazy={true}
              />
            </div>
            {/* Gold Accent Outline Box */}
            <div className="absolute top-4 right-4 w-[50%] h-[50%] border-t-2 border-r-2 border-brand-gold/40 pointer-events-none rounded-tr-sm" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

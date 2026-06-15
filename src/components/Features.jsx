import React from 'react';
import { Waves, Dumbbell, Car, Shield, Wifi, Coffee } from 'lucide-react';
import { FEATURES } from '../data/mockData';

// Map icon string names to imported Lucide components
const ICON_MAP = {
  Waves,
  Dumbbell,
  Car,
  Shield,
  Wifi,
  Coffee
};

/**
 * Features - Grid section highlighting property amenities and community benefits.
 */
export const Features = () => {
  return (
    <section className="py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Amenities</span>
          <h2 className="text-3xl md:text-4xl text-white font-light mb-6">Uncompromising Luxury</h2>
        </div>

        {/* Grid - Improved Contrast text-gray-300 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURES.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.iconName] || Shield;
            return (
              <div 
                key={index} 
                className={`flex items-start space-x-4 p-6 hover:bg-white/5 transition-colors duration-300 rounded-sm group reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className="flex-shrink-0 p-3 bg-brand-gold/10 text-brand-gold rounded-sm group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-300">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{feature.label}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

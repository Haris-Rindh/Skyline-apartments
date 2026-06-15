import React from 'react';
import { Play } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

/**
 * CinematicTours - Promotes structural media tours.
 * Triggers video modal overlay on click.
 */
export const CinematicTours = ({ onPlayClick }) => {
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <LuxuryImage
          src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury modern infinity pool terrace overlooking nature canyon landscape"
          className="w-full h-full object-cover"
          lazy={true}
        />
        <div className="absolute inset-0 bg-brand-navy/50"></div>
      </div>
      
      {/* Center Action */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 reveal">
        <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-4">Cinematic Tours</span>
        <h2 className="text-3xl md:text-5xl text-white font-light mb-8">Experience the Exceptional</h2>
        
        <button 
          onClick={onPlayClick}
          className="group relative inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Play cinematic real estate tour video"
        >
          <Play size={32} className="text-white ml-2 fill-current group-hover:text-brand-navy" />
          <span className="absolute -bottom-10 text-xs text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Play Video</span>
        </button>
      </div>
    </section>
  );
};

export default CinematicTours;

import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

/**
 * Testimonials - Slide transitions cycling through customer reviews.
 * Adjusts color contrast to meet accessibility compliance.
 */
export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-navy overflow-hidden reveal">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Quote size={48} className="text-brand-gold mx-auto mb-8 opacity-50 select-none" />
        
        {/* Animated Carousel wrapper */}
        <div className="relative min-h-[220px] md:min-h-[170px] flex flex-col justify-center items-center">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ease-in-out ${
                idx === activeIndex
                  ? 'opacity-100 translate-y-0 scale-100 relative pointer-events-auto'
                  : 'opacity-0 translate-y-4 scale-95 absolute pointer-events-none'
              }`}
            >
              <blockquote className="text-2xl md:text-3xl text-white font-light italic leading-relaxed mb-8">
                "{testimonial.text}"
              </blockquote>
              <div>
                <p className="text-brand-gold font-semibold tracking-wide uppercase text-sm mb-1">{testimonial.author}</p>
                {/* Improved Contrast: text-gray-300 instead of text-gray-500 */}
                <p className="text-gray-300 text-xs uppercase tracking-widest leading-normal">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-12 select-none">
          {TESTIMONIALS.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-gold ${idx === activeIndex ? 'w-12 bg-brand-gold' : 'w-3 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to client testimonial slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { JOURNAL_POSTS } from '../data/mockData';
import { LuxuryImage } from './LuxuryImage';

/**
 * Journal - Articles and news section for luxury estate trends.
 */
export const Journal = () => {
  return (
    <section id="journal" className="py-24 bg-brand-navy-deep border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">The Journal</span>
            <h2 className="text-3xl md:text-4xl text-white font-light">Market Insights</h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post, idx) => (
            <div key={idx} className={`group cursor-pointer reveal reveal-delay-${idx + 1}`}>
              {/* Image with Lazy Shimmer */}
              <div className="relative overflow-hidden aspect-[3/2] mb-6 rounded-sm">
                <LuxuryImage 
                  src={post.image} 
                  alt={`Thumbnail article illustration for: ${post.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  lazy={true}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-brand-navy text-xs font-bold uppercase tracking-widest select-none">
                  {post.category}
                </div>
              </div>
              
              {/* Calendar stamp */}
              <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest mb-3 font-semibold select-none">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl text-white font-light mb-3 group-hover:text-brand-gold transition-colors duration-300 leading-snug">{post.title}</h3>
              
              {/* Link - Improved Contrast text-gray-300 */}
              <a href="#journal" className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                Read Article <ArrowRight size={14} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { AGENT } from '../data/mockData';
import { LuxuryImage } from './LuxuryImage';

/**
 * AgentProfile - Details of the broker and primary contact.
 * Ensures image alt details are accessible and color contrasts comply.
 */
export const AgentProfile = () => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="agents" className="py-24 bg-brand-navy-deep border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="bg-gradient-to-r from-[#162032] to-[#0F172A] rounded-2xl p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Accent */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl select-none pointer-events-none" aria-hidden="true"></div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            {/* Image Container with Gold Rings */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full p-1 border border-brand-gold/30">
                <div className="w-full h-full rounded-full p-1 border border-brand-gold/60 overflow-hidden">
                  <LuxuryImage 
                    src={AGENT.image} 
                    alt={`Portrait photo of ${AGENT.name}, Senior Broker advisor at Skyline luxury estate`} 
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                    lazy={true}
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-brand-gold text-brand-navy px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg select-none">
                Top Producer
              </div>
            </div>

            {/* Profile Bio Details */}
            <div className="text-center md:text-left flex-1">
              <span className="text-brand-gold font-bold uppercase tracking-[0.2em] block mb-1 text-xs">{AGENT.title}</span>
              <h2 className="text-3xl md:text-4xl text-white font-light mb-6">{AGENT.name}</h2>
              {/* Improved Contrast: text-gray-300 instead of text-gray-400 */}
              <blockquote className="text-gray-300 text-lg leading-relaxed font-light mb-8 max-w-2xl italic">
                "{AGENT.bio}"
              </blockquote>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button 
                  onClick={handleScrollToContact}
                  className="flex items-center gap-3 bg-white text-brand-navy px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-colors duration-300 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  <Phone size={16} />
                  Contact Agent
                </button>
                <button 
                  onClick={handleScrollToContact}
                  className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 uppercase text-xs font-bold tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors duration-300 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
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

export default AgentProfile;

import React, { useState, useEffect, useRef } from 'react';
import { X, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { AGENT } from '../data/mockData';
import { LuxuryImage } from './LuxuryImage';

/**
 * PropertyModal - Focus-trapped detail modal for a selected property.
 * Features Escape listener, backdrop exit, and left/right image navigation.
 */
export const PropertyModal = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const modalRef = useRef(null);

  // Focus modal on open, intercept Escape and lock scrolling
  useEffect(() => {
    if (!property) return;
    
    setActiveImage(0); // Reset index on open

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus on close button or modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [property, onClose]);

  if (!property) return null;

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleTabKey = (e) => {
    if (!modalRef.current) return;
    
    // Find all focusable elements
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([-1])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  const handleScrollToContact = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-brand-navy/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleTabKey}
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Backdrop Exit Area */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-brand-navy-deep rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 z-10">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white hover:text-brand-gold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Close details modal"
        >
          <X size={24} />
        </button>

        {/* Gallery Section */}
        <div className="w-full md:w-2/3 h-[40vh] md:h-full relative flex flex-col">
          <div className="flex-1 relative group/main">
            {/* Active Image */}
            <LuxuryImage 
              src={property.images[activeImage]} 
              alt={`View of photo ${activeImage + 1} for property at ${property.address}`} 
              className="w-full h-full object-cover"
              lazy={false} // Eager load active image in modal for immediate display
            />
            
            {/* Left/Right Arrows (Show if more than 1 image) */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white hover:text-brand-gold rounded-full opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  aria-label="Previous property image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white hover:text-brand-gold rounded-full opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  aria-label="Next property image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-sm text-white">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Price</p>
                <p className="text-xl font-light">{property.price}</p>
              </div>
              <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-sm text-xs text-white">
                {activeImage + 1} / {property.images.length}
              </div>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="h-24 bg-brand-navy-darkest p-2 flex gap-2 overflow-x-auto select-none">
            {property.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 h-full aspect-[4/3] border-2 transition-all rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-gold ${activeImage === idx ? 'border-brand-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                aria-label={`View photo ${idx + 1} of ${property.images.length}`}
              >
                <LuxuryImage src={img} alt="" className="w-full h-full object-cover pointer-events-none" lazy={true} />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 bg-brand-navy p-8 overflow-y-auto border-l border-white/5">
          <div className="mb-6">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-brand-gold rounded-sm inline-block mb-4 select-none">
              {property.type}
            </span>
            <h2 id="modal-title" className="text-2xl text-white font-light leading-snug mb-2">{property.address}</h2>
            {/* Specs - Improved Contrast text-gray-300 */}
            <div className="flex gap-4 text-gray-300 text-sm mt-4 pb-6 border-b border-white/10 select-none">
              <div className="flex items-center gap-1"><Bed size={16}/> {property.beds} Beds</div>
              <div className="flex items-center gap-1"><Bath size={16}/> {property.baths} Baths</div>
              <div className="flex items-center gap-1"><Square size={16}/> {property.sqft} sqft</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-medium mb-3">About this residence</h3>
            {/* Improved Contrast: text-gray-300 instead of text-gray-400 */}
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-medium mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Concierge', 'Gym Access', 'Smart Home', 'Wine Cellar'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300 select-none">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Representative Block */}
          <div className="mt-auto bg-[#162032] p-6 rounded-sm border border-white/5">
            <div className="flex items-center gap-3 mb-4 select-none">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-gold">
                <LuxuryImage src={AGENT.image} alt={AGENT.name} className="w-full h-full object-cover" lazy={true} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{AGENT.name}</p>
                <p className="text-brand-gold text-[10px] uppercase tracking-widest font-bold">Listing Agent</p>
              </div>
            </div>
            <button 
              onClick={handleScrollToContact}
              className="w-full bg-brand-gold text-brand-navy py-3 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-brand-navy transition-colors mb-3 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm"
            >
              Schedule Private Tour
            </button>
            <button 
              onClick={handleScrollToContact}
              className="w-full border border-white/20 text-white py-3 uppercase text-xs font-bold tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm"
            >
              Request Floor Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;

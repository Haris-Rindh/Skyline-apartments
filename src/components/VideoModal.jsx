import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * VideoModal - Renders a responsive video iframe in an accessible modal.
 * Traps tab key focus, closes on Escape key or backdrop click, and disables body scroll.
 */
export const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Focus on close button or modal container
    if (modalRef.current) {
      const closeBtn = modalRef.current.querySelector('button');
      if (closeBtn) closeBtn.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabKey = (e) => {
    if (!modalRef.current) return;
    
    const focusable = modalRef.current.querySelectorAll('button, iframe');
    if (focusable.length === 0) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-navy-darkest/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic property walkthrough video player"
      onKeyDown={handleTabKey}
      ref={modalRef}
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 text-white hover:text-brand-gold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Close video modal"
        >
          <X size={24} />
        </button>
        <iframe
          src={`${videoUrl || 'https://www.youtube.com/embed/kRCFc35K9uM'}?autoplay=1`}
          title="Skyline Cinematic Walkthrough Tour"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;

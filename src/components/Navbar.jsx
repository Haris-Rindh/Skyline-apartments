import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navbar - Responsive luxury header with navigation links, CTAs, and accessibility skip link.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookViewing = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = ['About', 'Properties', 'Locations', 'Journal', 'Contact'];

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-gold focus:text-brand-navy focus:px-4 focus:py-2 focus:font-bold focus:outline-none focus:rounded-sm border border-brand-gold shadow-lg"
      >
        Skip to main content
      </a>

      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-brand-navy/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 select-none">
              <div className="w-8 h-8 border-2 border-brand-gold rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-gold rounded-sm"></div>
              </div>
              <span className="text-2xl font-light tracking-widest text-white ml-2">
                SKYLINE
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm uppercase tracking-widest text-gray-300 hover:text-brand-gold transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold px-1 rounded-sm"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={handleBookViewing}
                className="border border-brand-gold text-brand-gold px-6 py-2 uppercase text-xs tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                Book Viewing
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold p-1"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-brand-navy border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-white hover:text-brand-gold hover:bg-white/5 transition-all rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  {item}
                </a>
              ))}
              <div className="px-3 py-4">
                <button 
                  onClick={handleBookViewing}
                  className="w-full text-center border border-brand-gold text-brand-gold px-6 py-3 uppercase text-xs tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  Book Viewing
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

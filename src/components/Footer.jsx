import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

/**
 * Footer - Standard website footer with navigation links, contact info, and socials.
 * Resolves body text contrast requirements for accessible readability.
 */
export const Footer = () => {
  return (
    <footer className="bg-brand-navy-darkest text-white pt-20 pb-10 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 border border-brand-gold rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-gold rounded-sm"></div>
              </div>
              <span className="text-xl font-light tracking-widest">SKYLINE</span>
            </div>
            
            {/* Improved Contrast: text-gray-300 instead of text-gray-500 */}
            <p className="text-gray-300 font-light max-w-md leading-relaxed text-sm">
              Redefining luxury real estate. We curate the world's most exceptional properties for a clientele that expects nothing less than perfection.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 border border-white/10 text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                aria-label="Visit Skyline Real Estate Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 border border-white/10 text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                aria-label="Visit Skyline Real Estate LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 border border-white/10 text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-gold" 
                aria-label="Visit Skyline Real Estate Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-6">Navigation</h4>
            {/* Improved Contrast: text-gray-300 instead of text-gray-400 */}
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              {['Home', 'About', 'Properties', 'Locations', 'Journal', 'Contact'].map(link => (
                <li key={link}>
                  <a 
                    href={link === 'Home' ? '#' : `#${link.toLowerCase()}`} 
                    className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold px-0.5 rounded-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Office */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-6">Office</h4>
            {/* Improved Contrast: text-gray-300 instead of text-gray-400 */}
            <address className="not-italic text-gray-300 font-light space-y-4 text-sm leading-relaxed">
              <p>730 Fifth Avenue, 22nd Floor<br/>New York, NY 10019</p>
              <p>+1 (212) 555-0199<br/><span className="select-text">hello@skyline.luxury</span></p>
            </address>
          </div>
        </div>
        
        {/* Sub-footer copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <p>&copy; 2026 Skyline Real Estate. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold">Privacy</a>
            <a href="#terms" className="hover:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold">Terms</a>
            <a href="#sitemap" className="hover:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

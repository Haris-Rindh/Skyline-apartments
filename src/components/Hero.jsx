import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Counter } from './Counter';

/**
 * Hero - Splash header section with search filters, counting statistics, and scroll parallax.
 */
export const Hero = ({ onSearch }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [priceRange, setPriceRange] = useState('any');
  const [propertyType, setPropertyType] = useState('any');
  const [bedsVal, setBedsVal] = useState('any');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        query: searchVal,
        price: priceRange,
        type: propertyType,
        beds: bedsVal
      });
    }
  };

  return (
    <div className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Scaling */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Curated skyline architecture showing premium waterfront estates" 
          className="w-full h-full object-cover"
          loading="eager"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/40 to-brand-navy"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight leading-tight">
          Elevated Living
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
          Find your sanctuary in the world's most coveted addresses.
        </p>

        {/* Advanced Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-3xl mx-auto">
          <div className="flex gap-2 relative z-20">
            {/* TextInput */}
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-brand-gold" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all duration-300 rounded-sm text-sm"
                placeholder="Enter City, Zip Code, or Address"
                aria-label="Search properties"
              />
            </div>
            
            {/* Filters toggle button */}
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all rounded-sm flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-brand-gold ${showFilters ? 'bg-brand-gold text-brand-navy border-brand-gold hover:bg-brand-gold/90' : ''}`}
              aria-expanded={showFilters}
              aria-label="Toggle search filters"
            >
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">Filters</span>
            </button>
            
            {/* Submit search button */}
            <button 
              type="submit"
              className="bg-brand-gold text-brand-navy px-8 font-semibold hover:bg-white hover:text-brand-navy transition-colors duration-300 rounded-sm uppercase text-xs tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              Search
            </button>
          </div>

          {/* Collapsible Advanced Filters Panel */}
          <div className={`absolute top-full left-0 right-0 mt-2 bg-brand-navy/95 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl transition-all duration-300 origin-top transform ${showFilters ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Price Filter */}
              <div>
                <label htmlFor="hero-price" className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-bold">Price Range</label>
                <select 
                  id="hero-price"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-[#162032] border border-white/10 text-white p-2.5 text-xs focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none rounded-sm"
                >
                  <option value="any">Any Price</option>
                  <option value="$1M - $3M">$1M - $3M</option>
                  <option value="$3M - $5M">$3M - $5M</option>
                  <option value="$5M - $10M">$5M - $10M</option>
                  <option value="$10M+">$10M+</option>
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label htmlFor="hero-type" className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-bold">Property Type</label>
                <select 
                  id="hero-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#162032] border border-white/10 text-white p-2.5 text-xs focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none rounded-sm"
                >
                  <option value="any">All Types</option>
                  <option value="Condo">Condo</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Loft">Loft</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Estate">Estate</option>
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-bold">Bedrooms</label>
                <div className="flex gap-2">
                  {['Any', '2+', '3+', '4+'].map(opt => (
                    <button 
                      key={opt} 
                      type="button"
                      onClick={() => setBedsVal(opt)}
                      className={`flex-1 py-2.5 text-[10px] uppercase font-bold tracking-widest border transition-colors rounded-sm focus:outline-none ${bedsVal === opt ? 'bg-brand-gold text-brand-navy border-brand-gold' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
        
        {/* Animated Quick Stats */}
        <div className="mt-16 flex justify-center gap-8 md:gap-16 text-center select-none">
          <Counter value="200+" label="Listings" />
          <Counter value="15" label="Cities" />
          <Counter value="25" label="Years Experience" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

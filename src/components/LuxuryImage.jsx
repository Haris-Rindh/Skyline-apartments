import React, { useState } from 'react';

/**
 * LuxuryImage - Component showing a golden-shimmer placeholder skeleton during load.
 * Supports lazy loading (default) and standard image properties.
 */
export const LuxuryImage = ({ src, alt, className = '', lazy = true, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-brand-navy-deep ${className}`}>
      {/* Golden shimmer loader */}
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer" />
      )}
      <img
        src={src}
        alt={alt || ''}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};

export default LuxuryImage;

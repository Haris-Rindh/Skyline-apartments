import React from 'react';

/**
 * GoldDivider - A decorative divider styled for luxury branding.
 * Flanks a central 45-degree diamond with fading golden lines.
 */
export const GoldDivider = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-6 bg-transparent select-none pointer-events-none ${className}`}>
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-brand-gold/50"></div>
      <div className="mx-4 w-2 h-2 rotate-45 border border-brand-gold bg-transparent"></div>
      <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-brand-gold/50"></div>
    </div>
  );
};

export default GoldDivider;

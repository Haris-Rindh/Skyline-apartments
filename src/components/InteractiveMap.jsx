import React, { useEffect, useRef } from 'react';
import { Map as MapIcon } from 'lucide-react';

/**
 * InteractiveMap - Real Leaflet Map utilizing unpkg CDN library hooks.
 * Dynamically updates pins and fits bounding views to active property coordinates.
 */
export const InteractiveMap = ({ properties = [], onSelectProperty }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // 1. Initialize Map Container on Mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!window.L) {
      console.warn('Leaflet global library not available.');
      return;
    }

    const L = window.L;

    // Create Leaflet instance
    mapInstanceRef.current = L.map(mapContainerRef.current, {
      center: [37.0902, -95.7129], // Center of United States
      zoom: 4,
      zoomControl: false,
      attributionControl: false
    });

    // Apply CartoDB Dark Matter tile skin matching navy brand details
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(mapInstanceRef.current);

    // Initialize layer group to manage markers dynamically
    markersGroupRef.current = L.layerGroup().addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Synchronize markers when properties list changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || !window.L) return;

    const L = window.L;
    
    // Clear old marker layer elements
    markersGroupRef.current.clearLayers();

    if (properties.length === 0) return;

    const bounds = [];

    properties.forEach((prop) => {
      if (!prop.latlng) return;
      bounds.push(prop.latlng);

      // Custom HTML Gold Marker
      const goldIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-[#D4AF37]/35 rounded-full animate-ping pointer-events-none"></div>
            <div class="relative w-7 h-7 bg-[#D4AF37] text-[#0F172A] rounded-full flex items-center justify-center shadow-lg border border-white/10 hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      // Custom styled popup card displaying property specifications
      const popupHtml = `
        <div class="leaflet-popup-card-preview" style="font-family: 'Inter', sans-serif; color: #fff; width: 170px;">
          <img src="${prop.images[0]}" alt="" style="width: 100%; height: 95px; object-fit: cover; border-radius: 2px; margin-bottom: 6px; display: block;" />
          <h4 style="margin: 0; font-size: 13px; font-weight: 700; color: #D4AF37;">${prop.price}</h4>
          <p style="margin: 3px 0 0 0; font-size: 10px; color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.2;">${prop.address}</p>
          <div style="font-size: 9px; color: #94a3b8; display: flex; gap: 8px; margin-top: 4px; uppercase font-semibold;">
            <span>${prop.beds} beds</span>
            <span>${prop.baths} baths</span>
            <span>${prop.sqft} sqft</span>
          </div>
        </div>
      `;

      // Instantiate Leaflet Marker & Bind events
      const marker = L.marker(prop.latlng, { icon: goldIcon })
        .bindPopup(popupHtml, {
          closeButton: false,
          className: 'custom-leaflet-popup-container',
          offset: [0, -10]
        })
        .on('click', () => {
          onSelectProperty(prop);
        });

      // Mouse hover handlers to toggle popups immediately
      marker.on('mouseover', function () {
        this.openPopup();
      });

      markersGroupRef.current.addLayer(marker);
    });

    // Adjust viewport to bounds of active listings
    if (bounds.length > 0) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      
      // Limit zoom depth if only single result exists
      if (bounds.length === 1) {
        mapInstanceRef.current.setZoom(12);
      }
    }
  }, [properties, onSelectProperty]);

  return (
    <section className="py-24 bg-brand-navy-deep border-t border-white/5">
      <style>{`
        /* Overwrite Default Leaflet Popups to align with luxury brand design */
        .custom-leaflet-popup-container .leaflet-popup-content-wrapper {
          background: #0F172A !important;
          border: 1px solid rgba(212, 175, 55, 0.2) !important;
          border-radius: 4px !important;
          padding: 8px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
        }
        .custom-leaflet-popup-container .leaflet-popup-content {
          margin: 0 !important;
          line-height: normal !important;
        }
        .custom-leaflet-popup-container .leaflet-popup-tip {
          background: #0F172A !important;
          border-right: 1px solid rgba(212, 175, 55, 0.2) !important;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="mb-12 text-center">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Live Map</span>
          <h2 className="text-3xl md:text-4xl text-white font-light">Explore Our Collection</h2>
        </div>

        <div className="relative w-full h-[600px] bg-brand-navy-darkest rounded-lg overflow-hidden border border-white/10 shadow-xl">
          {/* Map Node Container */}
          <div ref={mapContainerRef} className="w-full h-full z-10"></div>
          
          {/* Info Badge */}
          <div className="absolute bottom-8 left-8 bg-brand-navy/90 backdrop-blur border border-white/10 p-4 rounded-sm text-white max-w-xs z-20 select-none pointer-events-none">
            <h3 className="flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mb-1">
              <MapIcon size={16} /> Global Reach
            </h3>
            <p className="text-xs text-gray-300">Hover pins to preview details. Click a marker to inspect full listings. Locations are approximate for client privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;

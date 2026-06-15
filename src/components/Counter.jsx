import React, { useState, useEffect, useRef } from 'react';

/**
 * Counter - Animates a count-up transition when scrolled into view.
 * Uses IntersectionObserver and requestAnimationFrame with ease-out easing.
 */
export const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const target = parseInt(value, 10);
  const isPlus = value.includes('+');

  useEffect(() => {
    let started = false;
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !started) {
        started = true;
        animate();
        observer.unobserve(entry.target);
      }
    }, observerOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    const animate = () => {
      const duration = 2000; // 2 seconds
      const end = target;
      if (end === 0) return;
      
      const startTime = performance.now();

      const run = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic: f(t) = t * (2 - t)
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * end);
        
        if (progress < 1) {
          setCount(currentCount);
          requestAnimationFrame(run);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(run);
    };

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, [target]);

  return (
    <div ref={elementRef}>
      <div className="text-2xl md:text-3xl font-light text-white">
        {count}{isPlus ? '+' : ''}
      </div>
      <div className="text-xs uppercase tracking-widest text-brand-gold mt-1">{label}</div>
    </div>
  );
};

export default Counter;

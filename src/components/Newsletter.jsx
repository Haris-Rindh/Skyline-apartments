import React, { useState } from 'react';
import { apiService } from '../services/api';

/**
 * Newsletter - Curated registry email subscription section.
 * Connects registration inputs to serverless API routes.
 */
export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await apiService.subscribeNewsletter(email);
      if (result.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('Connection error occurred. Registry offline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-brand-navy-deep border-t border-white/5 relative overflow-hidden">
      {/* Decorative vector curves */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] border border-brand-gold rounded-full -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] border border-brand-gold rounded-full -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 reveal">
        <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-4">The Club</span>
        <h2 className="text-3xl md:text-4xl text-white font-light mb-6">Skyline Private Registry</h2>
        <p className="text-gray-300 font-light max-w-lg mx-auto mb-8 leading-relaxed">
          Subscribe to receive curated luxury listings, off-market opportunities, and quarterly market insights directly to your inbox.
        </p>

        {/* Dynamic Success Announcement */}
        {subscribed ? (
          <div 
            role="status" 
            aria-live="polite" 
            className="max-w-md mx-auto p-4 bg-brand-gold/10 border border-brand-gold text-brand-gold text-sm font-semibold rounded-sm"
          >
            Thank you for subscribing to our private registry.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full bg-[#162032] border px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm text-sm ${error ? 'border-red-500' : 'border-white/10'}`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-gold text-brand-navy px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-brand-navy transition-colors rounded-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {error && <p id="newsletter-error" className="text-red-400 text-xs text-left mt-1 font-semibold">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;

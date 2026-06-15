import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { apiService } from '../services/api';

/**
 * ContactForm - Client registration form with validations, accessibility associations,
 * and serverless API integration.
 */
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    assetOfInterest: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await apiService.submitInquiry(formData);
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          assetOfInterest: 'General Inquiry',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrors({ submit: result.error || 'Failed to submit inquiry. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'An unexpected connection error occurred. Running offline.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-navy border-t border-white/5 reveal">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] block mb-2">Inquire</span>
          <h2 className="text-3xl md:text-4xl text-white font-light">Begin Your Journey</h2>
        </div>

        {/* Dynamic Success Announcement Toast */}
        {isSubmitted && (
          <div 
            role="status" 
            aria-live="polite" 
            className="mb-8 p-4 bg-brand-gold/10 border border-brand-gold text-brand-gold text-center rounded-sm transition-all duration-500 animate-fadeIn"
          >
            <p className="text-sm font-semibold">Thank you for your inquiry. A private advisor will contact you shortly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-1">
              <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">First Name</label>
              <input 
                id="firstName"
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-[#162032] border p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm ${errors.firstName ? 'border-red-500' : 'border-white/10'}`} 
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && <p id="firstName-error" className="text-red-400 text-xs mt-1 font-semibold">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">Last Name</label>
              <input 
                id="lastName"
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-[#162032] border p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm ${errors.lastName ? 'border-red-500' : 'border-white/10'}`} 
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && <p id="lastName-error" className="text-red-400 text-xs mt-1 font-semibold">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Address */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">Email Address</label>
              <input 
                id="email"
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#162032] border p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm ${errors.email ? 'border-red-500' : 'border-white/10'}`} 
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1 font-semibold">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">Phone</label>
              <input 
                id="phone"
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-[#162032] border p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm ${errors.phone ? 'border-red-500' : 'border-white/10'}`} 
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1 font-semibold">{errors.phone}</p>}
            </div>
          </div>

          {/* Asset of Interest */}
          <div className="space-y-1">
            <label htmlFor="assetOfInterest" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">Asset of Interest</label>
            <div className="relative">
              <select 
                id="assetOfInterest"
                name="assetOfInterest"
                value={formData.assetOfInterest}
                onChange={handleChange}
                className="w-full bg-[#162032] border border-white/10 p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none rounded-sm"
              >
                <option>General Inquiry</option>
                <option>1088 Park Avenue</option>
                <option>888 Biscayne Blvd</option>
                <option>443 Greenwich St</option>
                <option>900 W Olympic Blvd</option>
                <option>505 N Lake Shore Dr</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-300 font-semibold block">Message</label>
            <textarea 
              id="message"
              name="message"
              rows="4" 
              value={formData.message}
              onChange={handleChange}
              className={`w-full bg-[#162032] border p-4 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors rounded-sm ${errors.message ? 'border-red-500' : 'border-white/10'}`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            ></textarea>
            {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1 font-semibold">{errors.message}</p>}
          </div>

          {errors.submit && <p className="text-red-400 text-xs font-semibold">{errors.submit}</p>}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-gold text-brand-navy py-5 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-brand-navy transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'} <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

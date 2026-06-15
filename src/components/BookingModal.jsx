import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { apiService } from '../services/api';

/**
 * BookingModal - Self-contained tour scheduling calendar overlay.
 * Handles focus traps, ESC closure, and dynamic 14-day booking slots.
 */
export const BookingModal = ({ isOpen, onClose, propertyName = 'General Inquiry' }) => {
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Client Info, 3: Success
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: `Requesting private tour walkthrough for: ${propertyName}`
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef(null);
  const daysRef = useRef([]);

  // Generate next 14 days starting from today (June 15, 2026)
  useEffect(() => {
    const list = [];
    const baseDate = new Date(2026, 5, 15); // June 15, 2026
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      // Format day (Mon, Tue, etc.) and date (Jun 16)
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const value = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      // Exclude Sundays for private tours
      if (d.getDay() !== 0) {
        list.push({ dayName, label, value });
      }
    }
    daysRef.current = list;
    
    // Default select the first day
    if (list.length > 0) {
      setSelectedDate(list[0].value);
    }
  }, []);

  // Modal setup
  useEffect(() => {
    if (!isOpen) return;

    setStep(1); // Reset step on open
    setSelectedTime('');
    setErrors({});
    setIsSubmitting(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (!selectedTime) {
      setErrors({ time: 'Please choose an appointment time slot.' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      assetOfInterest: propertyName,
      bookingDate: selectedDate,
      bookingTime: selectedTime
    };

    const result = await apiService.submitInquiry(payload);

    setIsSubmitting(false);
    if (result.success) {
      setStep(3);
    } else {
      setErrors({ submit: 'Failed to record reservation. Please try again.' });
    }
  };

  const handleTabKey = (e) => {
    if (!modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([-1])'
    );
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
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-brand-navy-darkest/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onKeyDown={handleTabKey}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <div className="relative w-full max-w-lg bg-brand-navy border border-white/10 rounded-lg shadow-2xl p-6 md:p-8 z-10 overflow-hidden animate-scaleIn">
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-gold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Close scheduler"
        >
          <X size={20} />
        </button>

        {/* Step 1: Select Date & Time */}
        {step === 1 && (
          <div>
            <h2 id="booking-title" className="text-2xl text-white font-light mb-2 flex items-center gap-2">
              <CalendarIcon className="text-brand-gold" size={22} /> Schedule Tour
            </h2>
            <p className="text-xs text-gray-300 mb-6 font-light uppercase tracking-widest">{propertyName}</p>
            
            {/* Calendar list */}
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-3">Available Dates</h3>
            <div className="flex gap-2 overflow-x-auto pb-4 select-none scrollbar-thin">
              {daysRef.current.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day.value)}
                  className={`flex-shrink-0 w-16 py-3 border text-center rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-brand-gold ${selectedDate === day.value ? 'bg-brand-gold border-brand-gold text-brand-navy font-bold' : 'border-white/10 text-white hover:bg-white/5'}`}
                >
                  <span className="block text-[10px] uppercase font-light tracking-wide">{day.dayName}</span>
                  <span className="block text-sm font-semibold">{day.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Time Slot Selector */}
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-3 mt-4 flex items-center gap-1.5">
              <Clock size={14} /> Available Slots
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setSelectedTime(time);
                    if (errors.time) setErrors({});
                  }}
                  className={`py-2 text-xs border rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-brand-gold ${selectedTime === time ? 'bg-brand-gold border-brand-gold text-brand-navy font-bold' : 'border-white/10 text-white hover:bg-white/5'}`}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.time && <p className="text-red-400 text-xs mt-2 font-semibold">{errors.time}</p>}

            <button 
              onClick={handleNextStep}
              className="w-full bg-brand-gold text-brand-navy py-4 uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors mt-8 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm"
            >
              Continue to Details
            </button>
          </div>
        )}

        {/* Step 2: Contact info */}
        {step === 2 && (
          <form onSubmit={handleBookingSubmit}>
            <h2 id="booking-title" className="text-2xl text-white font-light mb-1">Inquiry Details</h2>
            <p className="text-xs text-brand-gold mb-6 font-semibold select-none flex items-center gap-1.5">
              <CalendarIcon size={14} /> {selectedDate} @ {selectedTime}
            </p>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="modal-firstName" className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold block">First Name</label>
                  <input 
                    id="modal-firstName"
                    type="text" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#162032] border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-sm ${errors.firstName ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.firstName && <p className="text-red-400 text-[10px] font-semibold">{errors.firstName}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-lastName" className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold block">Last Name</label>
                  <input 
                    id="modal-lastName"
                    type="text" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#162032] border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-sm ${errors.lastName ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.lastName && <p className="text-red-400 text-[10px] font-semibold">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-email" className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold block">Email Address</label>
                <input 
                  id="modal-email"
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-[#162032] border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-sm ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.email && <p className="text-red-400 text-[10px] font-semibold">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-phone" className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold block">Phone Number</label>
                <input 
                  id="modal-phone"
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-[#162032] border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-sm ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.phone && <p className="text-red-400 text-[10px] font-semibold">{errors.phone}</p>}
              </div>
            </div>

            {errors.submit && <p className="text-red-400 text-xs mt-3 font-semibold">{errors.submit}</p>}

            <div className="flex gap-2 mt-8">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-1/3 border border-white/20 text-white py-4 uppercase text-xs font-bold tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors focus:outline-none rounded-sm"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 bg-brand-gold text-brand-navy py-4 uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Scheduling...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold">
              <Check size={32} />
            </div>
            <h2 className="text-2xl text-white font-light mb-3">Appointment Booked</h2>
            <p className="text-sm text-gray-300 font-light max-w-sm mx-auto leading-relaxed mb-8">
              Your private viewing tour for <strong className="text-white">{propertyName}</strong> has been requested for <strong className="text-brand-gold">{selectedDate}</strong> at <strong className="text-brand-gold">{selectedTime}</strong>. A dedicated advisor will confirm shortly.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-brand-gold text-brand-navy py-4 uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-sm"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;

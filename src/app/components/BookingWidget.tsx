'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

// API configuration - using local API routes to avoid CORS issues
const API_CONFIG = {
  bookingUrl: '/api/booking/create',
  availabilityUrl: '/api/booking/availability',
  followupUrl: '/api/booking/followup'
};

interface BookingState {
  currentStep: number;
  meetingType: string | null;
  contactInfo: {
    name: string;
    email: string;
    company: string;
    role: string;
    budget: string;
    challenge: string;
  };
  selectedDate: Date | null;
  selectedTime: string | null;
  timezone: string;
}

export default function BookingWidget() {
  const [bookingState, setBookingState] = useState<BookingState>({
    currentStep: 1,
    meetingType: null,
    contactInfo: {
      name: '',
      email: '',
      company: '',
      role: '',
      budget: '',
      challenge: ''
    },
    selectedDate: null,
    selectedTime: null,
    timezone: 'America/Chicago'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Auto-detect timezone on mount
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setBookingState(prev => ({ ...prev, timezone: userTimezone }));
  }, []);

  const meetingTypes = [
    {
      id: 'discovery',
      icon: '🚀',
      title: 'Discovery Call',
      duration: '30 min',
      description: 'Free consultation'
    },
    {
      id: 'technical',
      icon: '⚙️',
      title: 'Technical Deep-Dive',
      duration: '60 min',
      description: 'Detailed discussion'
    },
    {
      id: 'demo',
      icon: '🎯',
      title: 'AI Demo Session',
      duration: '45 min',
      description: 'Live demonstration'
    }
  ];

  const validateStep1 = () => {
    if (!bookingState.meetingType) {
      setErrors({ meetingType: 'Please select a meeting type' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, company, role, challenge } = bookingState.contactInfo;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!company.trim()) newErrors.company = 'Company is required';
    if (!role.trim()) newErrors.role = 'Role is required';
    if (!challenge.trim()) newErrors.challenge = 'Please describe your challenge';
    else if (challenge.length < 20) newErrors.challenge = 'Please provide more detail (min 20 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingState.selectedDate) newErrors.date = 'Please select a date';
    if (!bookingState.selectedTime) newErrors.time = 'Please select a time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    if (bookingState.currentStep === 1) isValid = validateStep1();
    else if (bookingState.currentStep === 2) isValid = validateStep2();
    else if (bookingState.currentStep === 3) isValid = validateStep3();

    if (isValid) {
      if (bookingState.currentStep === 3) {
        confirmBooking();
      } else {
        setBookingState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      }
    }
  };

  const prevStep = () => {
    setBookingState(prev => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));
    setErrors({});
  };

  const selectMeetingType = (type: string) => {
    setBookingState(prev => ({ ...prev, meetingType: type }));
    setErrors({});
  };

  const updateContactInfo = (field: string, value: string) => {
    setBookingState(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectDate = async (date: Date) => {
    setBookingState(prev => ({ ...prev, selectedDate: date, selectedTime: null }));
    setErrors({});
    setIsLoading(true);

    try {
      console.log('Checking availability for date:', date.toISOString());
      
      const response = await fetch(API_CONFIG.availabilityUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: date.toISOString(),
          meetingType: bookingState.meetingType,
          timezone: bookingState.timezone
        })
      });

      console.log('Availability response status:', response.status);
      
      const data = await response.json();
      console.log('Availability data:', data);
      
      if (data.success && data.slots) {
        const dateKey = date.toISOString().split('T')[0];
        const slots = data.slots[dateKey];
        if (slots && Array.isArray(slots)) {
          // Extract time strings from slot objects or use directly if already strings
          const timeSlots = slots.map((s: { time: string } | string) => typeof s === 'string' ? s : s.time);
          setAvailableSlots(timeSlots);
        } else {
          console.log('No slots for date, using defaults');
          setAvailableSlots(getDefaultSlots());
        }
      } else {
        console.log('Invalid response structure, using defaults');
        setAvailableSlots(getDefaultSlots());
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Always provide some slots so the user can continue
      setAvailableSlots(getDefaultSlots());
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultSlots = () => {
    return ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
      .filter(() => Math.random() > 0.3);
  };

  const selectTime = (time: string) => {
    setBookingState(prev => ({ ...prev, selectedTime: time }));
    setErrors({});
  };

  const confirmBooking = async () => {
    setIsLoading(true);
    
    try {
      console.log('Submitting booking:', {
        meetingType: bookingState.meetingType,
        email: bookingState.contactInfo.email,
        date: bookingState.selectedDate,
        time: bookingState.selectedTime
      });

      const response = await fetch(API_CONFIG.bookingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingState)
      });

      console.log('Booking response status:', response.status);
      
      if (!response.ok) {
        console.error('Booking response not ok:', response.status);
      }

      const data = await response.json();
      console.log('Booking response data:', data);
      
      // Check if booking was successful
      if (data.success === false) {
        throw new Error(data.message || 'Booking failed');
      }
      
      // Proceed to confirmation
      setBookingState(prev => ({ ...prev, currentStep: 4 }));
      
      // Trigger follow-up sequence (fire and forget)
      fetch(API_CONFIG.followupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: bookingState.contactInfo.email,
          name: bookingState.contactInfo.name,
          meetingType: bookingState.meetingType,
          meetingDate: bookingState.selectedDate?.toISOString()
        })
      }).catch(err => console.log('Follow-up sequence error (non-critical):', err));
      
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Failed to confirm booking. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-black rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayHeaders.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(currentYear, currentMonth, day);
            const dayOfWeek = date.getDay();
            const isPast = date < today;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isDisabled = isPast || isWeekend;
            const isSelected = bookingState.selectedDate?.toDateString() === date.toDateString();

            return (
              <button
                key={day}
                onClick={() => !isDisabled && selectDate(date)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${isDisabled 
                    ? 'opacity-30 cursor-not-allowed text-gray-600' 
                    : 'hover:bg-green-500/20 hover:border-green-500 cursor-pointer text-white'
                  }
                  ${isSelected 
                    ? 'bg-green-500 text-black font-bold' 
                    : 'bg-gray-800 border border-gray-700'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
          <span className="ml-2 text-gray-400">Loading available times...</span>
        </div>
      );
    }

    if (availableSlots.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          No available times for this date. Please select another date.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableSlots.map(time => (
          <button
            key={time}
            onClick={() => selectTime(time)}
            className={`
              py-3 px-4 rounded-lg border transition-all duration-200
              ${bookingState.selectedTime === time
                ? 'bg-green-500 text-black font-semibold border-green-500'
                : 'bg-gray-800 border-gray-700 hover:border-green-500/50 text-white'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  const steps = ['Meeting Type', 'Your Info', 'Select Time', 'Confirm'];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Green Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-t-2xl p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Schedule Your AI Transformation Session
        </h1>
        <p className="text-white/90 text-lg">
          Let&apos;s discuss how AI can revolutionize your business operations
        </p>
      </div>

      {/* Dark Container */}
      <div className="bg-gray-900 rounded-b-2xl border border-gray-800">
        {/* Progress Steps */}
        <div className="bg-black px-8 py-6 relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-700 -translate-y-1/2" />
          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-300
                    ${index + 1 < bookingState.currentStep
                      ? 'bg-green-600 text-white'
                      : index + 1 === bookingState.currentStep
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-700 text-gray-400'
                    }
                  `}
                >
                  {index + 1 < bookingState.currentStep ? '✓' : index + 1}
                </div>
                <span className={`
                  text-xs mt-2 
                  ${index + 1 === bookingState.currentStep ? 'text-green-500' : 'text-gray-500'}
                `}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <motion.div
            key={bookingState.currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Meeting Type */}
            {bookingState.currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">What would you like to discuss?</h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {meetingTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => selectMeetingType(type.id)}
                      className={`
                        p-6 rounded-xl border-2 transition-all duration-200 text-center
                        ${bookingState.meetingType === type.id
                          ? 'border-green-500 bg-gray-800'
                          : 'border-gray-700 hover:border-green-500/50 bg-black'
                        }
                      `}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                      <p className="text-sm text-gray-400">{type.duration} • {type.description}</p>
                    </button>
                  ))}
                </div>

                {errors.meetingType && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
                    <AlertCircle className="w-4 h-4" />
                    {errors.meetingType}
                  </div>
                )}

                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black text-sm font-bold">
                      AI
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-500 mb-1">AI Recommendation</h4>
                      <p className="text-sm text-gray-300">
                        Based on your interest in AI automation, we recommend starting with a Discovery Call 
                        to understand your specific needs and demonstrate relevant solutions.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-4 bg-green-500 text-black font-bold text-lg rounded-lg hover:bg-green-400 transition-colors duration-200 uppercase tracking-wider"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {bookingState.currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Tell us about yourself</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingState.contactInfo.name}
                      onChange={(e) => updateContactInfo('name', e.target.value)}
                      className={`
                        w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-500
                        focus:outline-none focus:border-green-500 transition-colors
                        ${errors.name ? 'border-red-500' : 'border-gray-700'}
                      `}
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingState.contactInfo.email}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      className={`
                        w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-500
                        focus:outline-none focus:border-green-500 transition-colors
                        ${errors.email ? 'border-red-500' : 'border-gray-700'}
                      `}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={bookingState.contactInfo.company}
                      onChange={(e) => updateContactInfo('company', e.target.value)}
                      className={`
                        w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-500
                        focus:outline-none focus:border-green-500 transition-colors
                        ${errors.company ? 'border-red-500' : 'border-gray-700'}
                      `}
                      placeholder="Acme Corporation"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      value={bookingState.contactInfo.role}
                      onChange={(e) => updateContactInfo('role', e.target.value)}
                      className={`
                        w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-500
                        focus:outline-none focus:border-green-500 transition-colors
                        ${errors.role ? 'border-red-500' : 'border-gray-700'}
                      `}
                      placeholder="CEO, CTO, Operations Manager, etc."
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Monthly Revenue Range
                    </label>
                    <select
                      value={bookingState.contactInfo.budget}
                      onChange={(e) => updateContactInfo('budget', e.target.value)}
                      className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="" className="bg-black">Select range...</option>
                      <option value="under-50k" className="bg-black">Under $50k</option>
                      <option value="50k-250k" className="bg-black">$50k - $250k</option>
                      <option value="250k-1m" className="bg-black">$250k - $1M</option>
                      <option value="over-1m" className="bg-black">Over $1M</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                      What&apos;s your biggest operational challenge? *
                    </label>
                    <textarea
                      value={bookingState.contactInfo.challenge}
                      onChange={(e) => updateContactInfo('challenge', e.target.value)}
                      className={`
                        w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-500
                        focus:outline-none focus:border-green-500 transition-colors resize-none
                        ${errors.challenge ? 'border-red-500' : 'border-gray-700'}
                      `}
                      rows={4}
                      placeholder="Tell us about your current pain points..."
                    />
                    {errors.challenge && (
                      <p className="text-red-500 text-sm mt-1">{errors.challenge}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={prevStep}
                    className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500/10 transition-colors duration-200 font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Checking availability...
                      </span>
                    ) : (
                      'Check Availability'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {bookingState.currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Select your preferred time</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                    Select Date
                  </label>
                  {renderCalendar()}
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-2">{errors.date}</p>
                  )}
                </div>

                {bookingState.selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                      Available Times for {bookingState.selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </label>
                    {renderTimeSlots()}
                    {errors.time && (
                      <p className="text-red-500 text-sm mt-2">{errors.time}</p>
                    )}
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
                    Your Time Zone
                  </label>
                  <select
                    value={bookingState.timezone}
                    onChange={(e) => setBookingState(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                  >
                    <option value="America/Chicago" className="bg-black">Central Time (CST)</option>
                    <option value="America/New_York" className="bg-black">Eastern Time (EST)</option>
                    <option value="America/Denver" className="bg-black">Mountain Time (MST)</option>
                    <option value="America/Los_Angeles" className="bg-black">Pacific Time (PST)</option>
                  </select>
                </div>

                {bookingState.selectedTime && (
                  <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black text-sm font-bold">
                        AI
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-500 mb-1">Recommended Time</h4>
                        <p className="text-sm text-gray-300">
                          {bookingState.selectedTime.includes('AM') 
                            ? 'Morning meetings tend to have higher engagement rates. This is an excellent time for strategic discussions.'
                            : 'Afternoon slots work well for technical deep-dives when everyone is fully caffeinated!'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
                    <AlertCircle className="w-4 h-4" />
                    {errors.submit}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500/10 transition-colors duration-200 font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Confirming...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {bookingState.currentStep === 4 && (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-black" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">Your Meeting is Confirmed!</h2>
                <p className="text-gray-300 mb-8">We&apos;ve sent a calendar invite to your email</p>

                <div className="bg-black rounded-xl p-6 text-left mb-8 border border-gray-700">
                  <h3 className="text-xl font-semibold text-green-500 mb-4">Meeting Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Type:</span>
                      <span className="font-medium text-white">
                        {meetingTypes.find(t => t.id === bookingState.meetingType)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Date & Time:</span>
                      <span className="font-medium text-white">
                        {bookingState.selectedDate?.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} at {bookingState.selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-medium text-white">
                        {meetingTypes.find(t => t.id === bookingState.meetingType)?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Meeting Link:</span>
                      <span className="font-medium text-white">Will be sent via email</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 text-left mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black text-sm font-bold">
                      AI
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-500 mb-2">Prepare for Your Meeting</h4>
                      <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                        <li>Review your current business processes</li>
                        <li>Identify 3-5 repetitive tasks you&apos;d like to automate</li>
                        <li>Consider your timeline and budget for implementation</li>
                        <li>Prepare any questions about AI capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full py-4 bg-green-500 text-black font-bold text-lg rounded-lg hover:bg-green-400 transition-colors duration-200 uppercase tracking-wider"
                >
                  Return to Website
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
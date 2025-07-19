'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Mail, 
  User, 
  Building, 
  MessageSquare, 
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

interface BookingCardProps {
  className?: string;
}

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function BookingCard({ className = '' }: BookingCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  const onSubmitForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        setIsSubmitted(true);
      } else {
        // Handle error
        console.error('Form error:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Book Your </span>
            <span className="text-innovation">Transformation</span>
          </h2>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Ready to bridge the intelligence dimension? Let&apos;s discuss how AI can transform your business.
        </p>
        </motion.div>

        {/* Split Card */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Side - Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-neutral border border-border rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(37, 252, 17, 0.1) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(12, 129, 2, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mr-4">
                    <Mail size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
                    <p className="text-muted-foreground">Let&apos;s start your AI transformation journey</p>
                  </div>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-innovation/10 border border-innovation/20 rounded-2xl flex items-center"
                  >
                    <CheckCircle size={20} className="text-innovation mr-3" />
                    <span className="text-innovation font-medium">
                      Thank you! We&apos;ll get back to you within 24 hours.
                    </span>
                  </motion.div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-black/30 border rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-innovation transition-all duration-300 text-base ${
                          errors.name ? 'border-destructive' : 'border-border hover:border-innovation'
                        }`}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        autoCapitalize="words"
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-black/30 border rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-innovation transition-all duration-300 text-base ${
                          errors.email ? 'border-destructive' : 'border-border hover:border-innovation'
                        }`}
                        placeholder="Enter your email address"
                        autoComplete="email"
                        inputMode="email"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Company *
                    </label>
                    <div className="relative">
                      <Building size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        {...register('company')}
                        type="text"
                        id="company"
                        className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-black/30 border rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-innovation transition-all duration-300 text-base ${
                          errors.company ? 'border-destructive' : 'border-border hover:border-innovation'
                        }`}
                        placeholder="Enter your company name"
                        autoComplete="organization"
                        autoCapitalize="words"
                      />
                    </div>
                    {errors.company && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.company.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3 top-3 text-muted-foreground" />
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={4}
                        className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-black/30 border rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-innovation transition-all duration-300 resize-none text-base ${
                          errors.message ? 'border-destructive' : 'border-border hover:border-innovation'
                        }`}
                        placeholder="Tell us about your business and how we can help..."
                        autoComplete="off"
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-4 sm:py-5 rounded-xl font-semibold transition-all duration-300 min-h-[56px] touch-manipulation ${
                      isValid && !isSubmitting
                        ? 'bg-innovation text-primary hover:bg-trust hover:shadow-glow-innovation transform hover:scale-105 active:scale-95'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-2" />
                      <span>Response within 24 hours</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-2" />
                      <span>Virtual consultations available worldwide</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone size={14} className="mr-2" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-innovation/5 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Calendar Embed */}
          <motion.div variants={itemVariants}>
            <div className="bg-neutral border border-border rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(37, 252, 17, 0.1) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(12, 129, 2, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mr-4">
                    <Calendar size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Schedule a Meeting</h3>
                    <p className="text-muted-foreground">Book your consultation directly</p>
                  </div>
                </div>

                {/* Calendar Embed Placeholder */}
                <div className="bg-black/30 border border-border rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Google Calendar Integration
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Embed your Google Calendar here for direct booking functionality.
                  </p>
                  
                  {/* Calendar Embed Instructions */}
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-innovation rounded-full mr-2" />
                      <span>Set up Google Calendar API</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-innovation rounded-full mr-2" />
                      <span>Configure available time slots</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-innovation rounded-full mr-2" />
                      <span>Add booking widget integration</span>
                    </div>
                  </div>

                  {/* Placeholder Calendar Grid */}
                  <div className="mt-6 grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
                          i >= 15 && i <= 20
                            ? 'bg-innovation/20 text-innovation border border-innovation/30'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternative Contact Methods */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-lg font-semibold text-white">Other Ways to Connect</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300 cursor-pointer">
                      <Mail size={16} className="text-innovation mr-3" />
                      <span className="text-sm text-white">Email us directly</span>
                    </div>
                    <div className="flex items-center p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300 cursor-pointer">
                      <Phone size={16} className="text-innovation mr-3" />
                      <span className="text-sm text-white">Call for immediate assistance</span>
                    </div>
                    <div className="flex items-center p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300 cursor-pointer">
                      <MessageSquare size={16} className="text-innovation mr-3" />
                      <span className="text-sm text-white">Live chat support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-innovation/5 to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Export a simple contact form component
export function ContactForm() {
  return (
    <div className="bg-neutral border border-border rounded-3xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Quick Contact</h3>
      <BookingCard />
    </div>
  );
}

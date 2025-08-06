'use client';

import { motion } from 'framer-motion';
import NewHeader from '../components/ui/NewHeader';
import { Calendar, Clock, Mail } from 'lucide-react';

export default function BookConsultation() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NewHeader />
      
      {/* Main Content */}
      <section className="relative min-h-[60vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        {/* Spacer for fixed header */}
        <div className="h-20 lg:h-24" />
        
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral/20 to-black -z-10" />
        
        {/* Animated background orbs */}
        <div className="absolute top-40 right-10 w-96 h-96 bg-innovation/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-trust/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <div className="w-full max-w-5xl">
            <motion.div 
              className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div>
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10"
                {...fadeInUp}
              >
                Book Your{' '}
                <span className="text-innovation">Free Consultation</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-zinc-300 mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                30 minutes to explore how AI can transform your business
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-innovation" />
                  <span className="text-zinc-300">30 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-innovation" />
                  <span className="text-zinc-300">Flexible Scheduling</span>
                </div>
              </motion.div>
            </div>

            {/* Spacer */}
            <div className="h-24 lg:h-32"></div>

            {/* Coming Soon Card */}
            <motion.div 
              className="bg-neutral/30 backdrop-blur-sm rounded-2xl border-0 p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Booking System Coming Soon</h2>
              <p className="text-lg text-zinc-300 mb-8">
                We&apos;re setting up our online scheduling system to make booking your consultation even easier.
              </p>
              
              <div className="space-y-4">
                <p className="text-zinc-400">
                  In the meantime, reach out directly to schedule your free 30-minute consultation:
                </p>
                
                <motion.a
                  href="mailto:contact@tesseract-integrations.com"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-innovation text-black font-semibold rounded-xl hover:bg-trust transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-black" />
                  <span className="text-black">Email Us to Schedule</span>
                </motion.a>
                
                <p className="text-sm text-zinc-500 mt-4">
                  We&apos;ll respond within 24 hours to find a time that works for you
                </p>
              </div>
            </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Zone - Full Width */}
      <footer className="relative z-10 border-t border-neutral-800 bg-black/50 backdrop-blur-sm w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-innovation to-trust rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-semibold text-white">Tesseract Integrations</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-zinc-400">
              <span>© 2025 Tesseract Integrations. All rights reserved.</span>
              <a 
                href="mailto:support@tesseractintegrations.com"
                className="hover:text-innovation transition-colors duration-300"
              >
                support@tesseractintegrations.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import NewHeader from '../components/ui/NewHeader';
import BookingWidget from '../components/BookingWidget';

export default function BookConsultation() {
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
        <div className="absolute top-40 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <div className="w-full max-w-5xl">
            {/* Booking Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <BookingWidget />
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
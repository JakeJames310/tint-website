'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-innovation to-trust rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-black font-bold text-sm">T</span>
            </motion.div>
            <span className="text-lg font-semibold">Tesseract Integrations</span>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <motion.button 
              className="btn btn-secondary text-sm px-6 py-2 animate-fade-in touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
            </motion.button>
            <motion.button 
              className="btn btn-primary text-sm px-6 py-2 animate-fade-in touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ animationDelay: '0.2s' }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 
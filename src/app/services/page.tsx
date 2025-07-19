'use client';

import { motion } from 'framer-motion';
import { AIConsultingCard, AutomationCard, DigitalTransformationCard } from '../components/cards/ServiceCard';

export default function ServicesPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white pt-24 pb-16"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="w-full max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-innovation">Services</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Transform your business with cutting-edge AI solutions, intelligent automation, 
            and comprehensive digital transformation strategies.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={itemVariants}
        >
          <AIConsultingCard />
          <AutomationCard />
          <DigitalTransformationCard />
        </motion.div>

        {/* Additional Services Section */}
        <motion.div 
          className="bg-neutral border border-border rounded-3xl p-8 lg:p-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Why Choose <span className="text-innovation">Tesseract</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rapid Implementation</h3>
              <p className="text-zinc-400">Get results in weeks, not months</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tailored Solutions</h3>
              <p className="text-zinc-400">Custom-built for your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Proven Results</h3>
              <p className="text-zinc-400">Track record of measurable success</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
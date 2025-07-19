'use client';

import { motion } from 'framer-motion';
import { MissionSection, TesseractSection, FounderSection } from '../components/cards/AboutCard';

export default function AboutPage() {
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
            <span className="text-white">About </span>
            <span className="text-innovation">Tesseract</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;re not just another tech company—we&apos;re architects of the future, 
            bridging dimensions between human potential and artificial intelligence.
          </p>
        </motion.div>

        {/* About Sections */}
        <motion.div className="space-y-8 mb-16" variants={itemVariants}>
          <MissionSection />
          <TesseractSection />
          <FounderSection />
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="bg-neutral border border-border rounded-3xl p-8 lg:p-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our <span className="text-innovation">Vision</span>
          </h2>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              We envision a world where artificial intelligence isn&apos;t just a tool for tech giants, 
              but an accessible force that empowers every entrepreneur to achieve extraordinary results.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Through our innovative approach to AI integration, we&apos;re building bridges that connect 
              human creativity with machine intelligence, creating possibilities that neither could 
              achieve alone.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
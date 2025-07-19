'use client';

import { motion } from 'framer-motion';
import { RetailAutomationCard, ServiceTransformationCard, B2BOptimizationCard } from '../components/cards/CaseStudyCard';

export default function CaseStudiesPage() {
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
            <span className="text-white">Case </span>
            <span className="text-innovation">Studies</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Real businesses, real results. See how we&apos;ve helped companies transform 
            their operations with AI-powered solutions.
          </p>
        </motion.div>

        {/* Case Studies */}
        <motion.div className="space-y-8 mb-16" variants={itemVariants}>
          <RetailAutomationCard />
          <ServiceTransformationCard />
          <B2BOptimizationCard />
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="bg-gradient-to-r from-innovation/10 to-trust/10 border border-innovation/20 rounded-3xl p-8 lg:p-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Proven <span className="text-innovation">Impact</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-innovation mb-2">200%</div>
              <div className="text-zinc-400">Average Revenue Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-innovation mb-2">60%</div>
              <div className="text-zinc-400">Cost Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-innovation mb-2">90%</div>
              <div className="text-zinc-400">Process Automation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
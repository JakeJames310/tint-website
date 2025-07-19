'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '../components/cards/BookingCard';

export default function ContactPage() {
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
            <span className="text-white">Get </span>
            <span className="text-innovation">Started</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Let&apos;s discuss how AI can unlock 
            your company&apos;s potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <div className="bg-neutral border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Let&apos;s Connect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-innovation mb-2">Email</h3>
                  <p className="text-zinc-400">info@tesseractintegrations.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-innovation mb-2">Response Time</h3>
                  <p className="text-zinc-400">We typically respond within 24 hours</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-innovation mb-2">What to Expect</h3>
                  <ul className="text-zinc-400 space-y-2">
                    <li>• Initial consultation call</li>
                    <li>• Custom solution proposal</li>
                    <li>• Implementation timeline</li>
                    <li>• Ongoing support plan</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
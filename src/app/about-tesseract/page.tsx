'use client';

import { motion } from 'framer-motion';
import NewHeader from '../components/ui/NewHeader';
import { Sparkles, Target, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutTesseract() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        {/* Spacer for fixed header */}
        <div className="h-20 lg:h-24" />
        
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral/20 to-black -z-10" />
        
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-innovation/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <motion.div 
            className="w-full max-w-7xl flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 w-full text-center"
              {...fadeInUp}
            >
              Open your Business to the{' '}
              <span className="text-innovation">Next Dimension</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-zinc-300 max-w-3xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bridging human ingenuity and artificial intelligence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative min-h-[80vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-12 lg:py-16">
          <div className="w-full max-w-7xl space-y-12">
          
          {/* Our Philosophy */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Sparkles className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">Our Philosophy</h2>
            </div>
            
            <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
              <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                At Tesseract Integrations, we believe that technology should adapt to your business, 
                not force your business to adapt to it. We specialize in creating custom AI solutions 
                that enhance your existing operations without disrupting what already works.
              </p>
            </div>
          </motion.div>

          {/* What We Do */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Target className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">What We Do</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                  We transform small businesses by seamlessly integrating AI and automation into 
                  their daily operations. Our approach focuses on enhancing what you&apos;ve already 
                  built—your processes, your systems, your way of doing business—with intelligent 
                  automation that multiplies your efficiency.
                </p>
              </div>
              
              <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  We specialize in creating custom solutions that feel like natural extensions of 
                  your business. Whether it&apos;s automating customer communications, streamlining data 
                  management, or building intelligent workflows, we ensure every solution is practical, 
                  powerful, and perfectly aligned with how you actually work.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Why "Tesseract"? */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Zap className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">Why &ldquo;Tesseract&rdquo;?</h2>
            </div>
            
            <div className="bg-gradient-to-br from-neutral/50 to-neutral/20 backdrop-blur-sm rounded-2xl p-10 sm:p-12 lg:p-14 border-0">
              <p className="text-lg text-zinc-300 leading-relaxed">
                A tesseract represents a four-dimensional cube—a complex concept made tangible. 
                That&apos;s exactly what we do with AI and automation: we take complex, powerful 
                technologies and transform them into tangible tools that drive real results for 
                your business.
              </p>
            </div>
          </motion.div>

          {/* Our Promise - Cards without header */}
          <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Practical Solutions",
                  description: "Every automation we build solves a real problem"
                },
                {
                  title: "Business-First Thinking",
                  description: "Technology serves your goals, not the other way around"
                },
                {
                  title: "Ongoing Partnership",
                  description: "We're here for implementation and beyond"
                },
                {
                  title: "No Tech Jargon",
                  description: "We explain everything in plain English"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-neutral/50 to-neutral/20 backdrop-blur-sm rounded-2xl p-6 border-0 hover:bg-innovation/20 transition-colors duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <CheckCircle className="w-8 h-8 text-innovation mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative min-h-[50vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-12 lg:py-16">
          <motion.div 
            className="max-w-5xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Let&apos;s discuss how AI can revolutionize your operations
          </p>
          <motion.a
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-innovation text-black font-semibold rounded-xl hover:bg-trust transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-black">Book Your Free Consultation</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </motion.a>
          </motion.div>
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
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import NewHeader from '../components/ui/NewHeader';
import { Briefcase, Target, Lightbulb, Gamepad2, ArrowRight } from 'lucide-react';

export default function AboutFounder() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
        <div className="absolute top-40 right-20 w-96 h-96 bg-innovation/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-trust/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <motion.div 
            className="w-full max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-5xl sm:text-6xl font-bold mb-10"
                {...fadeInUp}
              >
                Hi, I&apos;m <span className="text-innovation">Jake James</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-zinc-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                I help small businesses work smarter, not harder, with practical AI solutions
              </motion.p>
            </div>
            
            {/* Founder Image */}
            <motion.div 
              className="relative max-w-sm mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-innovation/20 to-trust/20">
                <Image
                  src="/images/jake-james.jpg"
                  alt="Jake James - Founder of Tesseract Integrations"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative min-h-[80vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <div className="w-full max-w-7xl space-y-12">
          
          {/* My Story */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Briefcase className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">My Story</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  I discovered my passion for automation out of necessity. After graduating from 
                  UNC Chapel Hill with a degree in Statistics, I joined the startup world where 
                  I became the person who automated everything that didn&apos;t need to be done manually.
                </p>
              </div>
              
              <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  What started as solving my own frustrations—repetitive tasks, disconnected systems, 
                  time-consuming processes—soon became requests from colleagues: &ldquo;Hey Jake, can you 
                  automate this?&rdquo;
                </p>
              </div>
              
              <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  That&apos;s when I realized: if established startups struggled with these inefficiencies, 
                  how many small businesses were losing hours every day to tasks that could be automated?
                </p>
              </div>
            </div>
          </motion.div>

          {/* Why I Started Tesseract Integrations */}
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
              <h2 className="text-4xl font-bold">Why I Started Tesseract Integrations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-neutral/50 to-neutral/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  I founded Tesseract because I believe every business can operate efficiently, 
                  regardless of their technical expertise or budget. Too many small business owners 
                  are drowning in busy work when they should be focusing on what they do best—serving 
                  their customers and growing their business.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-neutral/50 to-neutral/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
                <p className="text-lg text-zinc-300 leading-relaxed lg:text-xl">
                  My mission is simple: make powerful AI and automation tools accessible and practical 
                  for real businesses with real constraints.
                </p>
              </div>
            </div>
          </motion.div>

          {/* My Approach */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Lightbulb className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">My Approach</h2>
            </div>
            
            <div className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 border-0">
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                I don&apos;t believe in forcing businesses to completely change how they operate just to 
                use new technology. Instead, I focus on understanding your existing workflows and 
                enhancing them with AI—like adding a turbo boost to your current engine rather than 
                replacing the whole car.
              </p>
            </div>
          </motion.div>

          {/* Personal Touch */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-innovation/10 rounded-xl">
                <Gamepad2 className="w-8 h-8 text-innovation" />
              </div>
              <h2 className="text-4xl font-bold">Beyond Business</h2>
            </div>
            
            <div className="bg-gradient-to-br from-innovation/10 to-trust/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border-0">
              <p className="text-lg text-zinc-300 leading-relaxed">
                When I&apos;m not building automation workflows, you&apos;ll probably find me strategizing 
                over a board game or taking a pickleball game way too seriously. I approach business 
                problems the same way I approach games: understanding the rules, finding the optimal 
                strategy, and always looking for the clever solution that others might miss.
              </p>
            </div>
          </motion.div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative min-h-[50vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-8 lg:py-12">
          <motion.div 
            className="max-w-5xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Let&apos;s Build Something Amazing Together
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Ready to transform your business with practical AI solutions?
          </p>
          <motion.a
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-innovation text-black font-semibold rounded-xl hover:bg-trust transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-black">Schedule Your Free Consultation</span>
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
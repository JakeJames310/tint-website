'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/ui/Header';
import HeroSection from './components/home/HeroSection';
import NodeGrid from './components/home/NodeGrid';
import CardOverlay from './components/ui/CardOverlay';
import { AIConsultingCard, AutomationCard, DigitalTransformationCard } from './components/cards/ServiceCard';
import { MissionSection, TesseractSection, FounderSection } from './components/cards/AboutCard';
import { RetailAutomationCard, ServiceTransformationCard, B2BOptimizationCard } from './components/cards/CaseStudyCard';
import { SimpleReviewCard } from './components/cards/ReviewCard';
import { ContactForm } from './components/cards/BookingCard';

// Define the card types
type CardType = 'services' | 'about' | 'case-studies' | 'reviews' | 'booking' | null;

export default function Home() {
  const [openCard, setOpenCard] = useState<CardType>(null);

  // Handle closing cards
  const handleCloseCard = () => {
    setOpenCard(null);
  };

  // Handle ESC key to close cards
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openCard) {
        setOpenCard(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openCard]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const nodeGridVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <Header />

      {/* Hero Section with Overlaid Node Grid */}
      <motion.div variants={sectionVariants} className="relative pt-20">
        <HeroSection />
        
        {/* Node Grid Overlay - Centered on Hero Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
          variants={nodeGridVariants}
        >
          <div className="pointer-events-auto">
            <NodeGrid 
              onServicesClick={() => setOpenCard('services')}
              onAboutClick={() => setOpenCard('about')}
              onCaseStudiesClick={() => setOpenCard('case-studies')}
              onReviewsClick={() => setOpenCard('reviews')}
              onBookMeetingClick={() => setOpenCard('booking')}
              onContactClick={() => setOpenCard('booking')}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Card Overlays with AnimatePresence */}
      <AnimatePresence mode="wait">
        {/* Services Card */}
        {openCard === 'services' && (
          <CardOverlay
            key="services"
            isOpen={true}
            onClose={handleCloseCard}
            title="Our Services"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AIConsultingCard />
                <AutomationCard />
                <DigitalTransformationCard />
              </div>
              <div className="text-center pt-6">
                <button className="btn btn-primary text-lg px-8 py-4">
                  Explore All Services
                </button>
              </div>
            </div>
          </CardOverlay>
        )}

        {/* About Card */}
        {openCard === 'about' && (
          <CardOverlay
            key="about"
            isOpen={true}
            onClose={handleCloseCard}
            title="About Tesseract"
          >
            <div className="space-y-6">
              <MissionSection />
              <TesseractSection />
              <FounderSection />
            </div>
          </CardOverlay>
        )}

        {/* Case Studies Card */}
        {openCard === 'case-studies' && (
          <CardOverlay
            key="case-studies"
            isOpen={true}
            onClose={handleCloseCard}
            title="Case Studies"
          >
            <div className="space-y-6">
              <RetailAutomationCard />
              <ServiceTransformationCard />
              <B2BOptimizationCard />
            </div>
          </CardOverlay>
        )}

        {/* Reviews Card */}
        {openCard === 'reviews' && (
          <CardOverlay
            key="reviews"
            isOpen={true}
            onClose={handleCloseCard}
            title="Client Reviews"
          >
            <div className="space-y-6">
              <SimpleReviewCard 
                name="Sarah Chen"
                company="TechFlow Solutions"
                role="CEO & Founder"
                rating={5}
                content="Tesseract transformed our entire operation. What used to take weeks now happens in hours. The AI implementation was seamless, and the results were immediate."
              />
              <SimpleReviewCard 
                name="Marcus Rodriguez"
                company="InnovateCorp"
                role="Operations Director"
                rating={5}
                content="The automation solutions they built for us are game-changing. We've reduced operational costs by 60% while improving customer satisfaction scores."
              />
              <SimpleReviewCard 
                name="Dr. Emily Watson"
                company="FutureScale Inc."
                role="CTO"
                rating={5}
                content="Working with Tesseract was like having a crystal ball for our business. Their predictive analytics and AI insights helped us make decisions that propelled us ahead."
              />
            </div>
          </CardOverlay>
        )}

        {/* Booking Card */}
        {openCard === 'booking' && (
          <CardOverlay
            key="booking"
            isOpen={true}
            onClose={handleCloseCard}
            title="Get Started"
          >
            <ContactForm />
          </CardOverlay>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer 
        className="container mx-auto px-4 py-8 mt-16 border-t border-neutral-800"
        variants={footerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
          
          <motion.div 
            className="flex items-center gap-6 text-sm text-neutral-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span>© 2025 Tesseract Integrations. All rights reserved.</span>
            <motion.a 
              href="mailto:support@tesseractintegrations.com"
              className="hover:text-innovation transition-colors"
              whileHover={{ scale: 1.05, color: '#25FC11' }}
              transition={{ duration: 0.2 }}
            >
              support@tesseractintegrations.com
            </motion.a>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}

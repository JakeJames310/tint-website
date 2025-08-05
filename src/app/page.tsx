'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NewHeader from './components/ui/NewHeader';
import ImprovedChatbot from './components/ui/ImprovedChatbot';
import Image from 'next/image';
import { Zap, Target, Users } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(30, Math.floor(window.innerWidth / 30));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      return particles;
    };

    particlesRef.current = initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 252, 17, ${particle.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#25FC11';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const heroVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: 50, scale: 0.8 },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Streamline operations with intelligent workflows"
    },
    {
      icon: Target,
      title: "Strategic Implementation",
      description: "Tailored solutions for your specific industry"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Guidance from AI specialists"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Header */}
      <NewHeader />

      {/* Main Content - Full Viewport Zones */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Mobile-specific padding-top to account for fixed header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:h-screen w-full">
            {/* Hero Content Zone - Left Half */}
            <motion.div 
              className="flex flex-col justify-start lg:justify-center items-center min-h-[calc(100vh-80px)] lg:h-full w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-20"
              variants={heroVariants}
            >
              {/* Spacer for mobile to push content below header */}
              <div className="h-20 lg:hidden flex-shrink-0" />
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
                  <span className="block text-white mb-2">Open your Business to</span>
                  <span className="block text-innovation">the Next Dimension</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-zinc-400 leading-relaxed mb-8">
                  Bridging human ingenuity and artificial intelligence.
                </p>
              </div>


              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 pt-4 sm:pt-6 lg:pt-8 justify-items-center w-full max-w-2xl mb-8 lg:mb-0">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center mx-auto mb-3">
                      <feature.icon size={24} className="text-black" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm lg:text-base text-zinc-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Logo Zone - Right Half */}
            <motion.div 
              className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] lg:h-full w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-20"
              variants={logoVariants}
            >
              <motion.div 
                className="relative"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Breathing Glow Background */}
                <motion.div 
                  className="absolute inset-0 bg-innovation/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Green Blurred Swoosh Animation */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 270deg, #25FC11 300deg, transparent 330deg)',
                    filter: 'blur(20px)'
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Secondary Swoosh (Opposite Direction) */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 180deg, transparent 270deg, #0C8102 300deg, transparent 330deg)',
                    filter: 'blur(15px)'
                  }}
                  animate={{
                    rotate: [360, 0]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Pulsing Green Glow Behind Logo */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    background: '#25FC11',
                    filter: 'blur(15px)'
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1.0, 1.05, 1.0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main Logo */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] 2xl:w-[32rem] 2xl:h-[32rem] z-10">
                  <Image
                    src="/tint-logo-new.png"
                    alt="Tesseract Integrations Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute top-1/4 right-0 w-3 h-3 bg-innovation rounded-full shadow-lg shadow-innovation/50"
                  animate={{ 
                    y: [-10, 10, -10],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-0 w-2 h-2 bg-trust rounded-full shadow-lg shadow-trust/50"
                  animate={{ 
                    x: [-8, 8, -8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-innovation/80 rounded-full shadow-md shadow-innovation/40"
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </motion.div>
            </motion.div>
        </div>
      </div>

      {/* Chatbot Zone - Full Width */}
      <ImprovedChatbot />

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
    </motion.div>
  );
}

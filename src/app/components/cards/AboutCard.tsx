'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Box, 
  User, 
  ArrowRight,
  Sparkles,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface AboutCardProps {
  className?: string;
}

export default function AboutCard({ className = '' }: AboutCardProps) {
  const sections = [
    {
      id: 'mission',
      icon: Target,
      title: 'Our Mission',
      subtitle: 'Bridging the intelligence dimension with everyday business operations',
      content: `Bridging the intelligence dimension with everyday business operations, making AI's transformative power accessible, understandable, and profitable for every entrepreneur.`,
      highlights: [
        'Accessible AI solutions',
        'Understandable technology',
        'Profitable implementation'
      ]
    },
    {
      id: 'tesseract',
      icon: Box,
      title: 'The Tesseract Concept',
      subtitle: 'A bridge between complex AI technology and practical business solutions',
      content: `We serve as the essential bridge between complex AI technology and practical business solutions. Just as a tesseract connects multiple dimensions, we connect the world of advanced artificial intelligence with the everyday needs of entrepreneurs and business owners.`,
      highlights: [
        'Technology bridge',
        'Practical solutions',
        'Entrepreneur-focused'
      ]
    },
    {
      id: 'founder',
      icon: User,
      title: 'Founder Story',
      subtitle: 'From startup dreams to full-time pursuit of innovation',
      content: `What began as a side project during late nights and weekends has evolved into a full-time mission to democratize AI technology. Our founder&apos;s journey from corporate constraints to entrepreneurial freedom reflects our commitment to breaking conventional boundaries and pursuing innovation without limits.`,
      highlights: [
        'Entrepreneurial journey',
        'Innovation without limits',
        'Democratizing AI technology'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-innovation to-trust rounded-2xl mb-6">
            <Sparkles size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="text-innovation">Tesseract</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We&apos;re not just another tech company—we&apos;re architects of the future, 
            <span className="text-innovation font-semibold"> bridging dimensions </span>
            between human potential and artificial intelligence.
          </p>
        </motion.div>

        {/* Sections Grid */}
        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="group"
              variants={sectionVariants}
            >
              <div className="relative">
                {/* Section Card */}
                <div className="bg-neutral border border-border rounded-3xl p-8 lg:p-12 overflow-hidden transition-all duration-500 hover:border-innovation hover:shadow-glow-innovation">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(37, 252, 17, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, rgba(12, 129, 2, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '60px 60px'
                    }} />
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                      <div className="flex items-start space-x-4 mb-6 lg:mb-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <section.icon size={28} className="text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-innovation transition-colors duration-300">
                            {section.title}
                          </h2>
                          <p className="text-lg sm:text-xl text-innovation font-semibold leading-relaxed">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Section Number */}
                      <div className="text-6xl sm:text-7xl font-bold text-innovation/20 group-hover:text-innovation/30 transition-colors duration-300">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                      {/* Main Content */}
                      <div className="lg:col-span-2">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
                          {section.content}
                        </p>
                        
                        {/* Highlights */}
                        <div className="space-y-3">
                          {section.highlights.map((highlight, highlightIndex) => (
                            <div 
                              key={highlightIndex}
                              className="flex items-center text-foreground group-hover:text-innovation transition-colors duration-300"
                            >
                              <div className="w-2 h-2 bg-innovation rounded-full mr-3 flex-shrink-0" />
                              <span className="font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Side Panel */}
                      <div className="lg:col-span-1">
                        <div className="bg-black/30 border border-border rounded-2xl p-6 h-fit">
                          <div className="flex items-center mb-4">
                            <Lightbulb size={20} className="text-innovation mr-2" />
                            <h3 className="font-semibold text-white">Key Insight</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.id === 'mission' && 
                              "AI should be accessible to every entrepreneur, not just tech giants."
                            }
                            {section.id === 'tesseract' && 
                              "We bridge the gap between complex AI and practical business needs."
                            }
                            {section.id === 'founder' && 
                              "The best solutions come from those who&apos;ve lived the problems they solve."
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-innovation font-medium">
                          <TrendingUp size={16} />
                          <span>Innovation in Action</span>
                        </div>
                        <ArrowRight 
                          size={20} 
                          className="text-muted-foreground group-hover:text-innovation group-hover:translate-x-1 transition-all duration-300" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-innovation/5 to-transparent" />
                  </div>
                </div>


              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-innovation/10 to-trust/10 border border-innovation/20 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to <span className="text-innovation">Transform</span> Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us in exploring the next dimension of business innovation. 
              Let&apos;s build the future together.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4 group">
              <span className="mr-2">Start Your Journey</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Export individual section components for reuse
export function MissionSection({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-neutral border border-border rounded-3xl p-8 ${className}`}>
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <Target size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
          <p className="text-innovation font-semibold">Bridging the intelligence dimension with everyday business operations</p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        We believe that the future of business lies in the seamless integration of artificial intelligence with human ingenuity.
      </p>
    </div>
  );
}

export function TesseractSection({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-neutral border border-border rounded-3xl p-8 ${className}`}>
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <Box size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">The Tesseract Concept</h3>
          <p className="text-innovation font-semibold">Beyond three dimensions, into the realm of infinite possibilities</p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        We operate in dimensions beyond traditional business thinking, connecting dots across time, space, and technology.
      </p>
    </div>
  );
}

export function FounderSection({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-neutral border border-border rounded-3xl p-8 ${className}`}>
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <User size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Founder Story</h3>
          <p className="text-innovation font-semibold">From startup dreams to full-time pursuit of innovation</p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        What began as a side project has evolved into a full-time mission to democratize AI technology.
      </p>
    </div>
  );
}

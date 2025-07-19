'use client';

import { 
  Brain, 
  Zap, 
  Globe, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  onServiceClick?: (service: string) => void;
  className?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  color: string;
}

export default function ServiceCard({ onServiceClick, className = '' }: ServiceCardProps) {
  const services: Service[] = [
    {
      id: 'ai-consulting',
      title: 'AI Consulting & Implementation',
      description: 'Transform your business with cutting-edge artificial intelligence solutions tailored to your specific needs.',
      icon: Brain,
      features: [
        'Custom AI Strategy Development',
        'Machine Learning Model Implementation',
        'Data Analytics & Insights',
        'AI Integration & Optimization'
      ],
      color: 'from-innovation to-trust'
    },
    {
      id: 'automation',
      title: 'Business Process Automation',
      description: 'Streamline operations and boost efficiency with intelligent automation solutions that work 24/7.',
      icon: Zap,
      features: [
        'Workflow Automation Design',
        'RPA Implementation',
        'Process Optimization',
        'Performance Monitoring'
      ],
      color: 'from-trust to-innovation'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Complete digital overhaul including website development, mobile apps, and social media presence.',
      icon: Globe,
      features: [
        'Website & App Development',
        'Social Media Strategy',
        'Digital Marketing',
        'Brand Presence Management'
      ],
      color: 'from-innovation via-trust to-innovation'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleServiceClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service.id);
    }
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-innovation">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions to propel your business into the next dimension of digital excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
                      {services.map((service) => (
            <motion.div
              key={service.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Service Card */}
              <div 
                className="relative bg-neutral border border-border rounded-2xl p-8 h-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-innovation hover:shadow-glow-innovation"
                onClick={() => handleServiceClick(service)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} className="text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-innovation transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-innovation rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="flex items-center text-innovation font-semibold group-hover:text-trust transition-colors duration-300">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight 
                      size={16} 
                      className="group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-innovation/10 to-transparent" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-innovation/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>


            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-primary text-lg px-8 py-4 group">
            <span className="mr-2">Explore All Services</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Export individual service components for reuse
export function AIConsultingCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center mb-4">
        <Brain size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">AI Consulting & Implementation</h3>
      <p className="text-sm text-muted-foreground">Transform your business with cutting-edge AI solutions.</p>
    </div>
  );
}

export function AutomationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 bg-gradient-to-br from-trust to-innovation rounded-xl flex items-center justify-center mb-4">
        <Zap size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Business Process Automation</h3>
      <p className="text-sm text-muted-foreground">Streamline operations with intelligent automation.</p>
    </div>
  );
}

export function DigitalTransformationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 bg-gradient-to-br from-innovation via-trust to-innovation rounded-xl flex items-center justify-center mb-4">
        <Globe size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Digital Transformation</h3>
      <p className="text-sm text-muted-foreground">Complete digital overhaul for your business.</p>
    </div>
  );
}

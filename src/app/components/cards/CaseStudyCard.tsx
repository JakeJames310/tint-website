'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Clock,
  DollarSign,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

interface CaseStudyCardProps {
  onCaseStudyClick?: (caseStudy: string) => void;
  className?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[];
  results: string[];
  duration: string;
  investment: string;
}

export default function CaseStudyCard({ onCaseStudyClick, className = '' }: CaseStudyCardProps) {
  const caseStudies: CaseStudy[] = [
    {
      id: 'retail-automation',
      title: 'Retail Automation Success',
      industry: 'E-commerce & Retail',
      description: 'Transformed a traditional retail chain into a fully automated, AI-powered operation.',
      icon: ShoppingCart,
      challenge: 'Manual inventory management and customer service were causing 40% revenue loss due to stockouts and slow response times.',
      solution: 'Implemented AI-powered inventory forecasting, automated customer service chatbots, and predictive analytics for demand planning.',
      metrics: [
        {
          label: 'Revenue Increase',
          value: '156%',
          change: '+156%',
          icon: TrendingUp
        },
        {
          label: 'Cost Reduction',
          value: '67%',
          change: '-67%',
          icon: DollarSign
        },
        {
          label: 'Response Time',
          value: '2.3s',
          change: '-89%',
          icon: Clock
        }
      ],
      results: [
        'Eliminated stockouts completely',
        '24/7 automated customer support',
        'Real-time inventory optimization',
        'Predictive demand forecasting'
      ],
      duration: '3 months',
      investment: '$45,000'
    },
    {
      id: 'service-transformation',
      title: 'Service Industry Transformation',
      industry: 'Professional Services',
      description: 'Revolutionized a consulting firm\'s operations with intelligent automation and AI insights.',
      icon: Users,
      challenge: 'Manual client onboarding and report generation were consuming 60% of staff time, limiting growth potential.',
      solution: 'Deployed AI-powered client management system, automated document processing, and intelligent reporting tools.',
      metrics: [
        {
          label: 'Efficiency Gain',
          value: '340%',
          change: '+340%',
          icon: Zap
        },
        {
          label: 'Client Capacity',
          value: '5x',
          change: '+400%',
          icon: Target
        },
        {
          label: 'Processing Time',
          value: '85%',
          change: '-85%',
          icon: Clock
        }
      ],
      results: [
        'Automated client onboarding',
        'AI-powered report generation',
        'Intelligent task prioritization',
        'Scalable service delivery'
      ],
      duration: '4 months',
      investment: '$62,000'
    },
    {
      id: 'b2b-optimization',
      title: 'B2B Sales Optimization',
      industry: 'B2B Technology',
      description: 'Optimized sales pipeline and customer acquisition for a B2B software company.',
      icon: TrendingUp,
      challenge: 'Low conversion rates (8%) and long sales cycles (6 months) were limiting growth and revenue potential.',
      solution: 'Implemented AI-driven lead scoring, predictive analytics for customer behavior, and automated follow-up systems.',
      metrics: [
        {
          label: 'Conversion Rate',
          value: '34%',
          change: '+325%',
          icon: Target
        },
        {
          label: 'Sales Cycle',
          value: '2.1mo',
          change: '-65%',
          icon: Clock
        },
        {
          label: 'Revenue Growth',
          value: '287%',
          change: '+287%',
          icon: DollarSign
        }
      ],
      results: [
        'AI-powered lead scoring',
        'Predictive customer insights',
        'Automated follow-up sequences',
        'Intelligent pipeline management'
      ],
      duration: '5 months',
      investment: '$78,000'
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

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    if (onCaseStudyClick) {
      onCaseStudyClick(caseStudy.id);
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Case </span>
            <span className="text-innovation">Studies</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real transformations, measurable results. See how we&apos;ve helped businesses 
            <span className="text-innovation font-semibold"> bridge the intelligence dimension</span>.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              className="group"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="relative bg-neutral border border-border rounded-3xl p-8 h-full cursor-pointer overflow-hidden transition-all duration-500 hover:border-innovation hover:shadow-glow-innovation"
                onClick={() => handleCaseStudyClick(caseStudy)}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(37, 252, 17, 0.1) 1px, transparent 1px),
                      linear-gradient(-45deg, rgba(12, 129, 2, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <caseStudy.icon size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-innovation transition-colors duration-300">
                        {caseStudy.title}
                      </h3>
                      <p className="text-sm text-innovation font-medium">
                        {caseStudy.industry}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Solution</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {caseStudy.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-innovation/20 rounded-lg mb-2 mx-auto">
                          <metric.icon size={16} className="text-innovation" />
                        </div>
                        <div className="text-lg font-bold text-white mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                        <div className="text-xs text-innovation font-medium">
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Key Results</h4>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <CheckCircle size={14} className="text-innovation mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Details */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{caseStudy.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      <span>{caseStudy.investment}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-innovation font-semibold group-hover:text-trust transition-colors duration-300">
                      <span className="mr-2">View Details</span>
                      <ArrowRight 
                        size={16} 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ROI: {caseStudy.id === 'retail-automation' ? '450%' : caseStudy.id === 'service-transformation' ? '380%' : '520%'}
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-innovation/5 to-transparent" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-innovation/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>


            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-innovation/10 to-trust/10 border border-innovation/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to See <span className="text-innovation">Your Results</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the growing list of businesses that have transformed their operations with AI.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4 group">
              <span className="mr-2">Start Your Transformation</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Export individual case study components for reuse
export function RetailAutomationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-3xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <ShoppingCart size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Retail Automation Success</h3>
          <p className="text-sm text-innovation font-medium">E-commerce & Retail</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Transformed a traditional retail chain into a fully automated, AI-powered operation.
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-innovation font-bold">+156% Revenue</span>
        <span className="text-muted-foreground">3 months</span>
      </div>
    </div>
  );
}

export function ServiceTransformationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-3xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <Users size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Service Industry Transformation</h3>
          <p className="text-sm text-innovation font-medium">Professional Services</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Revolutionized a consulting firm&apos;s operations with intelligent automation and AI insights.
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-innovation font-bold">+340% Efficiency</span>
        <span className="text-muted-foreground">4 months</span>
      </div>
    </div>
  );
}

export function B2BOptimizationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-neutral border border-border rounded-3xl p-6 hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center">
          <TrendingUp size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">B2B Sales Optimization</h3>
          <p className="text-sm text-innovation font-medium">B2B Technology</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Optimized sales pipeline and customer acquisition for a B2B software company.
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-innovation font-bold">+287% Revenue</span>
        <span className="text-muted-foreground">5 months</span>
      </div>
    </div>
  );
}

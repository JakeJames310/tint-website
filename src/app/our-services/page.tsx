'use client';

import { motion } from 'framer-motion';
import NewHeader from '../components/ui/NewHeader';
import { Bot, Cog, Lightbulb, CheckCircle, ArrowRight, Workflow, FileText, Brain, Shield, Zap, Clock } from 'lucide-react';

export default function OurServices() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const services = [
    {
      icon: Workflow,
      title: "AI Workflow Automation",
      tagline: "Turn repetitive tasks into automated processes",
      description: "Stop losing hours to manual data entry, email management, and routine communications.",
      features: [
        "Automatically process and respond to customer inquiries",
        "Sync data between your tools without manual intervention",
        "Generate reports and insights without lifting a finger",
        "Handle scheduling, follow-ups, and routine tasks"
      ],
      perfectFor: "Businesses drowning in administrative tasks",
      color: "innovation"
    },
    {
      icon: Bot,
      title: "Custom AI Solutions",
      tagline: "Built specifically for your unique business needs",
      description: "No two businesses are alike, so why settle for one-size-fits-all solutions?",
      features: [
        "Custom chatbots that understand your business and customers",
        "Intelligent document processing systems",
        "Automated content generation tools",
        "Specialized integrations between your existing tools"
      ],
      perfectFor: "Businesses with specific processes",
      color: "trust"
    },
    {
      icon: Lightbulb,
      title: "AI Strategy Consultation",
      tagline: "Get expert guidance on your AI journey",
      description: "Not sure where to start or what's possible? Our consultations help you navigate the AI landscape.",
      features: [
        "Identify the highest-impact automation opportunities",
        "Develop a practical AI implementation roadmap",
        "Choose the right tools and technologies",
        "Avoid common pitfalls and wasted investments"
      ],
      perfectFor: "Business owners who want AI guidance",
      color: "innovation"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business, not pushing predetermined solutions",
      icon: Brain
    },
    {
      number: "02",
      title: "Design",
      description: "We map out automations that enhance your existing workflows",
      icon: FileText
    },
    {
      number: "03",
      title: "Build",
      description: "We create and test your custom solutions with your real-world scenarios",
      icon: Cog
    },
    {
      number: "04",
      title: "Deploy",
      description: "We implement gradually, ensuring everything works perfectly",
      icon: Zap
    },
    {
      number: "05",
      title: "Support",
      description: "We provide ongoing optimization and support as your business grows",
      icon: Shield
    }
  ];

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
        <div className="absolute top-40 left-20 w-96 h-96 bg-innovation/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-trust/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
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
              Transform Your{' '}
              <span className="text-innovation">Business Operations</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-zinc-300 max-w-3xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Custom AI solutions that save time, reduce errors, and scale with your business
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="relative min-h-[80vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-12 lg:py-16">
          <div className="w-full max-w-7xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-lg text-zinc-400">Tailored solutions for every business challenge</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative bg-neutral/30 backdrop-blur-sm rounded-2xl p-8 border-0 hover:bg-neutral/40 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* Service Card */}
                <div className="flex flex-col h-full">
                  {/* Icon and Title */}
                  <div className="text-center mb-6">
                    <div className={`p-4 bg-${service.color}/10 rounded-xl inline-block mb-4`}>
                      <service.icon className={`w-12 h-12 text-${service.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-innovation text-sm font-medium">{service.tagline}</p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-zinc-300 mb-6 text-center">{service.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-innovation mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Perfect For */}
                  <div className="bg-black/30 rounded-xl p-3 text-center mt-auto">
                    <span className="text-xs text-zinc-400">Perfect for: </span>
                    <span className="text-xs text-white font-bold">{service.perfectFor}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative min-h-[80vh] flex flex-col bg-neutral/10 overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-12 lg:py-16">
          <div className="w-full max-w-7xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-lg text-zinc-400">A proven process for successful AI implementation</p>
          </motion.div>

          {/* Process Timeline */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Connection Line - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-innovation via-trust to-innovation lg:-translate-x-1/2" />
            
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Step Number Circle - Hidden on mobile, visible on desktop */}
                  <div className="hidden lg:flex absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-16 h-16 bg-black bg-innovation/20 rounded-full items-center justify-center z-10">
                    <span className="text-innovation font-bold">{step.number}</span>
                  </div>
                  
                  {/* Content - No left margin on mobile since circles are hidden */}
                  <div className={`flex-1 ml-0 lg:ml-0 ${index % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
                    <div className={`bg-neutral/30 backdrop-blur-sm rounded-2xl p-6 border-0 inline-block ${
                      index % 2 === 0 ? 'lg:ml-auto' : ''
                    }`}>
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <step.icon className="w-6 h-6 text-innovation" />
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-zinc-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative min-h-[80vh] flex flex-col overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex-1 flex items-center justify-center py-12 lg:py-16">
          <div className="w-full max-w-7xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Tesseract?</h2>
            <p className="text-lg text-zinc-400">Real benefits for real businesses</p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, title: "Save Time", description: "Automate repetitive tasks and free up hours every week" },
              { icon: Shield, title: "Reduce Errors", description: "Eliminate human error with consistent automated processes" },
              { icon: Zap, title: "Scale Effortlessly", description: "Handle growth without proportionally increasing costs" },
              { icon: Brain, title: "Smart Insights", description: "Get data-driven insights to make better decisions" },
              { icon: Cog, title: "Custom Solutions", description: "Solutions tailored specifically to your business needs" },
              { icon: CheckCircle, title: "Proven Results", description: "Track record of successful implementations and happy clients" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-neutral/30 backdrop-blur-sm rounded-2xl p-6 border-0 hover:bg-innovation/20 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <benefit.icon className="w-10 h-10 text-innovation mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
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
            Let&apos;s discuss how our services can revolutionize your operations
          </p>
          <motion.a
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-innovation text-black font-semibold rounded-xl hover:bg-innovation/90 transition-colors duration-300"
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
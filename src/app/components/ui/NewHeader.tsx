'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, LogIn } from 'lucide-react';

export default function NewHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'AI Consulting & Implementation', href: '/services#ai-consulting', description: 'Transform your business with cutting-edge AI solutions' },
        { name: 'Business Process Automation', href: '/services#automation', description: 'Streamline operations with intelligent automation' },
        { name: 'Digital Transformation', href: '/services#digital-transformation', description: 'Complete digital overhaul for your business' }
      ]
    },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Our Mission', href: '/about#mission', description: 'Bridging human ingenuity and AI' },
        { name: 'The Tesseract Concept', href: '/about#tesseract', description: 'Beyond three dimensions' },
        { name: 'Founder Story', href: '/about#founder', description: 'From startup dreams to innovation' }
      ]
    },
    {
      name: 'Case Studies',
      href: '/case-studies',
      dropdown: [
        { name: 'Retail Automation', href: '/case-studies#retail', description: '200% revenue increase through AI' },
        { name: 'Service Transformation', href: '/case-studies#service', description: '60% cost reduction with automation' },
        { name: 'B2B Optimization', href: '/case-studies#b2b', description: 'Streamlined operations and growth' }
      ]
    },
    {
      name: 'Reviews',
      href: '/reviews',
      dropdown: [
        { name: 'Client Testimonials', href: '/reviews#testimonials', description: 'What our clients say about us' },
        { name: 'Success Stories', href: '/reviews#success', description: 'Real results from real businesses' }
      ]
    }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/tint-logo-new.png"
                  alt="Tint Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
              <span className="text-lg font-semibold">Tesseract Integrations</span>
            </motion.div>
          </Link>

          <div className="flex items-center justify-between flex-1 ml-16">
            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center justify-between w-96">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href}>
                    <motion.button
                      className="flex items-center space-x-1 text-white hover:text-innovation transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-neutral/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </motion.button>
                  </Link>
                  
                  {/* Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-1 w-80 bg-neutral border border-border rounded-2xl p-4 shadow-2xl z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((dropdownItem, index) => (
                          <Link key={index} href={dropdownItem.href}>
                            <motion.div
                              className="p-3 rounded-xl hover:bg-border transition-colors duration-300 cursor-pointer"
                              whileHover={{ x: 4 }}
                            >
                              <h4 className="text-white font-medium mb-1">{dropdownItem.name}</h4>
                              <p className="text-zinc-400 text-sm">{dropdownItem.description}</p>
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              </div>
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center justify-between w-64">
              {/* Login Button */}
              <motion.button 
                className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-neutral/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn size={16} />
                <span className="font-medium">Login</span>
              </motion.button>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
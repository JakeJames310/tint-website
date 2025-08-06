'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import UserMenu from '@/app/components/auth/UserMenu';

export default function NewHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, signIn, isLoading } = useAuth();

  const navItems = [
    {
      name: 'Who We Are',
      href: '#',
      dropdown: [
        { name: 'About Tesseract Integrations', href: '/about-tesseract', description: 'Open your business to the next dimension' },
        { name: 'About Our Founder', href: '/about-founder', description: 'Meet Jake James and learn about our mission' }
      ]
    },
    {
      name: 'What We Do',
      href: '#',
      dropdown: [
        { name: 'Our Services', href: '/our-services', description: 'Transform your business with custom AI solutions' },
        { name: 'Book a Consultation', href: '/book-consultation', description: 'Free 30-minute consultation to explore possibilities' }
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-innovation transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center justify-between flex-1 ml-16">
            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    className="flex items-center space-x-1 text-white hover:text-innovation transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-neutral/50"
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    }}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </motion.button>
                  
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
              {/* Login/User Menu */}
              {isLoading ? (
                <div className="px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-neutral animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <motion.button 
                  onClick={() => signIn()}
                  className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-neutral/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn size={16} />
                  <span className="font-medium">Login</span>
                </motion.button>
              )}
              <div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-x-0 top-[70px] z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-6 py-4">
              {navItems.map((item) => (
                <div key={item.name} className="mb-4">
                  <h3 className="text-white font-medium mb-2">{item.name}</h3>
                  <div className="pl-4 space-y-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link 
                        key={index} 
                        href={dropdownItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="py-2">
                          <p className="text-innovation text-sm font-medium">{dropdownItem.name}</p>
                          <p className="text-zinc-500 text-xs">{dropdownItem.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Mobile Login/User Section */}
              <div className="pt-4 border-t border-neutral-800">
                {isLoading ? (
                  <div className="w-8 h-8 rounded-full bg-neutral animate-pulse"></div>
                ) : isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Logged in</span>
                    <UserMenu />
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      signIn();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white w-full py-2"
                  >
                    <LogIn size={16} />
                    <span className="font-medium">Login</span>
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
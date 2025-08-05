'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      {/* User Avatar Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-neutral/50 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full border border-border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-innovation/20 border border-innovation/50 flex items-center justify-center">
            <span className="text-innovation text-sm font-medium">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
        )}
        <span className="text-white text-sm font-medium hidden sm:block">
          {user.name || user.email?.split('@')[0]}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-neutral border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-innovation/20 flex items-center justify-center">
                    <User className="text-innovation" size={20} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-zinc-400 text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to profile page (to be implemented)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-zinc-300 hover:text-white hover:bg-border/50 transition-colors"
              >
                <User size={16} />
                <span className="text-sm">Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings page (to be implemented)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-zinc-300 hover:text-white hover:bg-border/50 transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </button>

              <div className="border-t border-border my-2"></div>

              <button
                onClick={async () => {
                  setIsOpen(false);
                  await signOut();
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-zinc-300 hover:text-red-400 hover:bg-border/50 transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
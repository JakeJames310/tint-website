'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle, X } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginModal from '@/app/components/auth/LoginModal';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ImprovedChatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const controls = useAnimation();
  
  const { isAuthenticated, hasSkippedAuth, user } = useAuth();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Expand when messages exist or input is focused
  useEffect(() => {
    const shouldExpand = messages.length > 0 || isFocused || error !== null;
    setIsExpanded(shouldExpand);
    
    controls.start({
      height: shouldExpand ? 'auto' : 'auto',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  }, [messages.length, isFocused, error, controls]);

  const handleSend = async () => {
    // Check if user is authenticated or has skipped auth
    if (!isAuthenticated && !hasSkippedAuth) {
      setShowLoginModal(true);
      return;
    }

    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessage('');
      setError(null);

      // Add user message to chat
      const newUserMessage: Message = {
        id: `msg_${Date.now()}`,
        content: userMessage,
        role: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newUserMessage]);

      // Send to API
      setIsLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            conversationId: conversationId,
            userId: user?.email, // Include user email for personalization
          }),
        });

        // Check response status first
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          throw new Error(errorData.error || 'Failed to send message');
        }

        const data = await response.json();
        
        // Debug logging
        console.log('API Response:', data);
        console.log('Reply content:', data.reply);

        // Update conversation ID if not set
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId);
        }

        // Add assistant response
        const assistantMessage: Message = {
          id: `msg_${Date.now()}_assistant`,
          content: data.reply || 'No response received',
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);

      } catch (err) {
        console.error('Chat error:', err);
        setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearError = () => setError(null);

  const suggestions = [
    "What automation services do you offer?",
    "Where can I reach out for more information?",
    "How do I get started with digital transformation?"
  ];

  return (
    <div className="relative z-10 py-16 w-full">
      <div className="w-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header - Outside the capsule */}
        <motion.div 
          className="text-center mb-8 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-full flex items-center justify-center shadow-lg">
              <Sparkles size={24} className="text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            How can <span className="text-innovation">Tesseract</span> serve you today?
          </h2>
          <p className="text-zinc-400">Ask me anything about automating your business</p>
        </motion.div>

        {/* Main Chatbot Capsule - Fully Encapsulated */}
        <motion.div 
          className="relative bg-neutral/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          animate={controls}
          layout
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-innovation/10 via-transparent to-trust/10 opacity-50 pointer-events-none" />
          
          {/* Inner Container with Padding */}
          <div className="relative" style={{padding: '16px 2% 0 2%'}}>
          
          {/* Error Message - Inside the capsule */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden"
              >
                <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border-b border-red-500/30">
                  <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 mr-4">
                    <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                    <p className="text-red-300 text-sm break-words">{error}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={18} />
                  </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Area - Expandable */}
          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  height: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="relative"
              >
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                  <div className="relative py-6 space-y-4 scroll-smooth" style={{padding: '24px 2% 24px 2%'}}>
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ 
                          type: 'spring',
                          stiffness: 500,
                          damping: 40
                        }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <motion.div
                          className={`max-w-[85%] px-8 py-1.5 rounded-2xl break-words ${
                            msg.role === 'user'
                              ? 'bg-innovation text-black shadow-lg shadow-innovation/20 text-base relative before:absolute before:top-[50%] before:right-[-8px] before:w-0 before:h-0 before:border-l-[10px] before:border-l-innovation before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent before:-translate-y-1/2'
                              : 'text-sm relative before:absolute before:top-[50%] before:left-[-8px] before:w-0 before:h-0 before:border-r-[10px] before:border-r-[#D4D4D4] before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent before:-translate-y-1/2'
                          }`}
                          style={msg.role === 'assistant' ? { backgroundColor: '#D4D4D4', color: '#000000' } : {}}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        >
                          <div style={{padding: '0 5%'}}>
                            <p className="leading-relaxed whitespace-pre-wrap break-words" style={{ color: '#000000' }}>{msg.content}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Loading indicator */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 backdrop-blur-sm text-zinc-200 px-5 py-3 rounded-2xl flex items-center space-x-2 border border-zinc-700/50 max-w-[85%]">
                          <Loader2 size={16} className="animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area - Always visible */}
          <div className="py-6">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                // Check auth when user focuses input
                if (!isAuthenticated && !hasSkippedAuth) {
                  setShowLoginModal(true);
                  inputRef.current?.blur();
                } else {
                  setIsFocused(true);
                }
              }}
              onBlur={() => setIsFocused(false)}
              placeholder={messages.length === 0 ? "Message Tesseract AI..." : "Type your message..."}
              disabled={isLoading}
              className="w-full bg-transparent text-white placeholder-zinc-500 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent resize-none px-4 py-4 text-base leading-relaxed min-h-[56px] max-h-[200px] disabled:opacity-50 transition-all duration-300" style={{border: 'none', outline: 'none'}}
              rows={1}
            />
            
            {/* Suggestions - Only show when no messages and not focused */}
            <AnimatePresence>
              {messages.length === 0 && !isFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-6"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setMessage(suggestion);
                          inputRef.current?.focus();
                        }}
                        disabled={isLoading}
                        className="bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </motion.div>

        {/* Footer - Outside the capsule */}
        <motion.p 
          className="text-center text-zinc-500 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Powered by advanced AI • Click enter to send chat
        </motion.p>
      </div>
      
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Sign in to chat with Tesseract AI"
      />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, ArrowUp } from 'lucide-react';

export default function FullWidthChatbot() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Placeholder for future n8n webhook integration
      console.log('Sending message:', message);
      console.log('Webhook integration coming soon');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "What automation services do you offer?",
    "Show me some example workflows",
    "How do I get started with digital transformation?"
  ];

  return (
    <div className="relative z-10 py-16 bg-gradient-to-t from-neutral/20 to-transparent w-full">
      <div className="w-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-full flex items-center justify-center">
              <Sparkles size={24} className="text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            How can <span className="text-innovation">Tesseract</span> serve you today?
          </h2>
          <p className="text-zinc-400">Ask me anything about automating your business</p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          className="bg-neutral border border-border rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Chat Input */}
          <div className="relative px-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Tesseract AI..."
              className="w-full bg-transparent text-white placeholder-zinc-400 border-none outline-none resize-none px-4 pr-16 py-6 text-lg leading-relaxed min-h-[80px] max-h-[200px]"
              rows={3}
              // Focus and blur handlers removed
            />
            
            {/* Send Button */}
            <motion.button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                message.trim() 
                  ? 'bg-innovation text-black hover:bg-innovation/90' 
                  : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              }`}
              whileHover={message.trim() ? { scale: 1.05 } : {}}
              whileTap={message.trim() ? { scale: 0.95 } : {}}
            >
              {message.trim() ? (
                <ArrowUp size={18} />
              ) : (
                <Send size={18} />
              )}
            </motion.button>
          </div>

          {/* Suggestions */}
          <div className="border-t border-border p-4 rounded-b-3xl">
            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="bg-border hover:bg-zinc-600 text-zinc-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors duration-300 border border-zinc-600 hover:border-zinc-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          className="text-center text-zinc-500 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Powered by advanced AI • n8n webhook integration coming soon
        </motion.p>
      </div>
    </div>
  );
}
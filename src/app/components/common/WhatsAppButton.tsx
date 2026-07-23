// src/components/common/WhatsAppButton.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsAppButton({ 
  phoneNumber = '0100000334', 
  message = 'Hi, I would like to learn more about Multi-SaaS Platform' 
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  // Auto-hide after 10 seconds? (optional)
  // useEffect(() => {
  //   const timer = setTimeout(() => setIsVisible(false), 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-900 shadow-soft border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <p className="font-medium">Chat with us on WhatsApp</p>
                <p className="text-xs text-gray-500">We typically reply in minutes</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative group"
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping group-hover:animate-none" />
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-hard transition-all duration-300 hover:scale-105">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
          </motion.button>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close WhatsApp button"
          >
            <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
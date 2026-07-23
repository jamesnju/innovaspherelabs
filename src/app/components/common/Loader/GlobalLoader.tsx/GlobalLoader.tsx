// src/components/common/Loader/GlobalLoader.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startLoading = () => {
      setIsLoading(true);
      setProgress(0);
      
      // Simulate progress
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      // Ensure loader doesn't get stuck
      timeoutId = setTimeout(() => {
        setProgress(95);
      }, 5000);
    };

    const finishLoading = () => {
      setProgress(100);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
    };

    // Start loading on route change
    startLoading();

    // Simulate route change completion
    const timer = setTimeout(() => {
      finishLoading();
    }, 600);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-secondary-500 to-accent-500"
            style={{ width: `${progress}%` }}
          />
          
          {/* Loading Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-secondary-500 rounded-full animate-spin" />
                
                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg" />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Loading...
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Please wait while we prepare your experience
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
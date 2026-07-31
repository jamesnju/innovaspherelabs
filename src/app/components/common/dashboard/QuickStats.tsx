// src/components/common/dashboard/QuickStats.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface QuickStat {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
  href: string;
}

interface QuickStatsProps {
  stats: QuickStat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  // Ensure stats is an array and filter out invalid items
  const validStats = Array.isArray(stats) 
    ? stats.filter(stat => stat && typeof stat === 'object' && 'value' in stat)
    : [];

  if (validStats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse"
          >
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const formatValue = (value: number, title: string) => {
    if (value === undefined || value === null) return '0';
    
    // If value is a currency (check if title contains 'Amount' or 'Revenue')
    if (title.toLowerCase().includes('amount') || 
        title.toLowerCase().includes('revenue') ||
        title.toLowerCase().includes('pending')) {
      return `$${value.toLocaleString()}`;
    }
    
    return value.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {validStats.map((stat, index) => (
        <motion.div
          key={stat.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={stat.href || '#'}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color || 'bg-gray-500'} bg-opacity-10`}>
                  <div className={`${stat.color || 'text-gray-500'}`}>
                    {stat.icon || null}
                  </div>
                </div>
                {stat.change !== undefined && stat.change !== null && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatValue(stat.value || 0, stat.title || '')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title || 'Untitled'}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
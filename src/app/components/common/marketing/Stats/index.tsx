// src/components/marketing/Stats/index.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

interface StatsProps {
  stats?: {
    businesses: string;
    customers: string;
    transactions: string;
    uptime: string;
    growth: string;
    countries: string;
  } | StatItem[];
}

const defaultStats: StatItem[] = [
  { label: 'Businesses', value: '10,000+' },
  { label: 'Customers Served', value: '50,000+' },
  { label: 'Transactions', value: '1M+' },
  { label: 'Uptime', value: '99.99', suffix: '%' },
];

// Convert object stats to array
const objectToStatItems = (stats: any): StatItem[] => {
  return [
    { label: 'Businesses', value: stats.businesses || '0' },
    { label: 'Customers', value: stats.customers || '0' },
    { label: 'Transactions', value: stats.transactions || '0' },
    { label: 'Uptime', value: stats.uptime || '99.99', suffix: '%' },
    { label: 'Growth', value: stats.growth || '0%' },
    { label: 'Countries', value: stats.countries || '0' },
  ];
};

export function Stats({ stats = defaultStats }: StatsProps) {
  // Normalize stats to array
  const statItems: StatItem[] = Array.isArray(stats) 
    ? stats 
    : objectToStatItems(stats);

  const [counts, setCounts] = useState<number[]>(statItems.map(() => 0));

  useEffect(() => {
    const intervals = statItems.map((stat, index) => {
      const target = parseInt(stat.value.replace(/,/g, '').replace(/[^0-9.]/g, ''));
      if (isNaN(target)) return null;

      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          const increment = Math.ceil(target / 50);
          const current = newCounts[index] || 0;
          newCounts[index] = Math.min(current + increment, target);
          return newCounts;
        });
      }, 30);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [statItems]);

  // Only show first 4 stats for better display
  const displayStats = statItems.slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-r from-secondary-500 to-accent-500">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-extrabold">
                {stat.value.includes('+') ? (
                  <>
                    {counts[index]?.toLocaleString() || '0'}+
                  </>
                ) : (
                  <>
                    {stat.suffix ? counts[index] || '0' : stat.value}
                    {stat.suffix || ''}
                  </>
                )}
              </div>
              <div className="text-white/80 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
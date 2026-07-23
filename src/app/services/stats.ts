// src/lib/services/stats.ts
import { cache } from 'react';

export interface StatsData {
  businesses: string;
  customers: string;
  transactions: string;
  uptime: string;
  growth: string;
  countries: string;
}

export const getStats = cache(async (): Promise<StatsData> => {
  // In production, fetch from database
  // For now, return mock data
  return {
    businesses: '10,000+',
    customers: '50,000+',
    transactions: '1M+',
    uptime: '99.99%',
    growth: '150%',
    countries: '50+',
  };
});
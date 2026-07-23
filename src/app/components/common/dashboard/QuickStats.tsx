// src/components/dashboard/QuickStats.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface QuickStatsProps {
  stats: {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
    changes: {
      revenue: number;
      orders: number;
      customers: number;
      products: number;
    };
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  const statItems: Stat[] = [
    {
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: stats.changes.revenue,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: 'Orders',
      value: stats.orders.toLocaleString(),
      change: stats.changes.orders,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      label: 'Customers',
      value: stats.customers.toLocaleString(),
      change: stats.changes.customers,
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Products',
      value: stats.products.toLocaleString(),
      change: stats.changes.products,
      icon: <Package className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
              <div className="text-secondary-500">{stat.icon}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {stat.change > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : stat.change < 0 ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : null}
            <span
              className={`text-sm font-medium ${
                stat.change > 0
                  ? 'text-green-600 dark:text-green-400'
                  : stat.change < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {stat.change > 0 ? '+' : ''}{stat.change}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
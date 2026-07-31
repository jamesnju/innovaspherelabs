'use client';

import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface BillingOverviewProps {
  data: {
    totalRevenue: number;
    pendingInvoices: number;
    pendingAmount: number;
    successRate: number;
  };
}

export function BillingOverview({ data }: BillingOverviewProps) {
  const stats = [
    {
      label: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      change: 15.2,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    },
    {
      label: 'Pending Invoices',
      value: data.pendingInvoices,
      change: -8.3,
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    },
    {
      label: 'Pending Amount',
      value: `$${data.pendingAmount.toLocaleString()}`,
      change: -5.2,
      icon: <AlertCircle className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    },
    {
      label: 'Success Rate',
      value: `${data.successRate}%`,
      change: 2.1,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
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
            <div className={`p-3 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {stat.change > 0 ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : stat.change < 0 ? (
              <ArrowDown className="h-4 w-4 text-red-500" />
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
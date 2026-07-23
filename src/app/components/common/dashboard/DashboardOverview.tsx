// src/components/dashboard/DashboardOverview.tsx
'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface DashboardOverviewProps {
  data: {
    sales: { date: string; amount: number }[];
    orders: { date: string; count: number }[];
    revenue: number;
    growth: number;
  };
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sales Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Daily sales performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary-500 rounded-full" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Sales</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent-500 rounded-full" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Orders</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.sales}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
            <XAxis 
              dataKey="date" 
              className="text-xs text-gray-500 dark:text-gray-400"
            />
            <YAxis 
              className="text-xs text-gray-500 dark:text-gray-400"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
              formatter={(value: any) => [`$${value}`, 'Sales']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#4F46E5"
              strokeWidth={2}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
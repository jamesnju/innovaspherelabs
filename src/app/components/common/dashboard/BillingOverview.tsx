// src/components/dashboard/BillingOverview.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

interface BillingOverviewProps {
  summary: {
    plan: string;
    status: 'active' | 'inactive' | 'pending';
    nextBillingDate: string;
    amount: number;
    features: string[];
  };
}

export function BillingOverview({ summary }: BillingOverviewProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
          <CreditCard className="h-6 w-6 text-secondary-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Current Plan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your subscription details
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Plan</span>
          <span className="font-semibold text-gray-900 dark:text-white capitalize">
            {summary.plan}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Status</span>
          <Badge className={statusColors[summary.status]}>
            {summary.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Next Billing</span>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white">
              {new Date(summary.nextBillingDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Amount</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${summary.amount.toFixed(2)}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              /month
            </span>
          </span>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Included Features:
          </p>
          <div className="space-y-1">
            {summary.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 btn-primary">Upgrade Plan</Button>
          <Button variant="outline" className="flex-1">View Invoices</Button>
        </div>
      </div>
    </motion.div>
  );
}
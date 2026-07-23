// src/components/admin/RecentCustomers.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { RecentCustomer } from '../../services/admin';

interface RecentCustomersProps {
  customers: RecentCustomer[];
}

export function RecentCustomers({ customers }: RecentCustomersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Customers
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            New businesses that joined recently
          </p>
        </div>
        <Link
          href="/admin/customers"
          className="text-sm text-secondary-500 hover:text-secondary-600 font-medium flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {customers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={customer.avatar}
                  fallback={customer.name.charAt(0)}
                  size="md"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {customer.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {customer.company}
                    </span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {customer.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={customer.plan === 'premium' ? 'success' : 'default'}>
                  {customer.plan}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  {new Date(customer.joinedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
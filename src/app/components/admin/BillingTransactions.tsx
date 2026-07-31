'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface Transaction {
  id: string;
  clientName: string;
  amount: number;
  status: string;
  date: string;
  plan: string;
}

interface BillingTransactionsProps {
  transactions: Transaction[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function BillingTransactions({ transactions, meta }: BillingTransactionsProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest billing transactions across the platform
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
      case 'PAID':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Latest billing transactions across the platform
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar
                fallback={transaction.clientName.charAt(0)}
                size="md"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.clientName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(transaction.date), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="primary">
                {transaction.plan}
              </Badge>
              <Badge className={getStatusColor(transaction.status)}>
                {transaction.status?.toLowerCase() || 'unknown'}
              </Badge>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${transaction.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {meta.page} of {meta.totalPages} pages ({meta.total} total transactions)
          </p>
        </div>
      )}
    </motion.div>
  );
}
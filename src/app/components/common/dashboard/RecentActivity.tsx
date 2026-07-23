// src/components/dashboard/RecentActivity.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Package, 
  CreditCard,
  Clock
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'sale' | 'user' | 'product' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  amount?: number;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return <ShoppingBag className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getColor = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'user':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'product':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'payment':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
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
          Recent Activity
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Latest actions from your business
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl ${getColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.description}
                </p>
                {activity.amount && (
                  <p className="text-sm font-semibold text-secondary-600 dark:text-secondary-400 mt-1">
                    ${activity.amount.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
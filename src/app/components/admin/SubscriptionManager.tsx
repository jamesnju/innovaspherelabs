// src/components/admin/SubscriptionManager.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  Save, 
  X, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Subscription, SubscriptionStatus } from '../../services/admin';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface SubscriptionManagerProps {
  subscription: Subscription;
  onUpdate?: (data: Partial<Subscription>) => Promise<void>;
}

export function SubscriptionManager({ subscription, onUpdate }: SubscriptionManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [plan, setPlan] = useState(subscription.plan);
  const [status, setStatus] = useState<SubscriptionStatus>(subscription.status);

  const statusColors: Record<SubscriptionStatus, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    expired: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    cancelled: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  };

  const plans = [
    { value: 'free', label: 'Free' },
    { value: 'basic', label: 'Basic' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  const statuses: { value: SubscriptionStatus; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleSave = async () => {
    try {
      await onUpdate?.({ plan, status });
      toast.success('Subscription updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  const getDaysRemaining = () => {
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();
  const isExpiringSoon = daysRemaining > 0 && daysRemaining < 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Subscription Management
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage customer subscription details
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setPlan(subscription.plan);
                setStatus(subscription.status);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="btn-primary"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Plan */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
          {isEditing ? (
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
            >
              {plans.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {subscription.plan}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          ) : (
            <Badge className={statusColors[subscription.status]}>
              {subscription.status}
            </Badge>
          )}
        </div>

        {/* Start Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
          <span className="text-gray-900 dark:text-white">
            {new Date(subscription.startDate).toLocaleDateString()}
          </span>
        </div>

        {/* End Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">End Date</span>
          <span className="text-gray-900 dark:text-white">
            {new Date(subscription.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Days Remaining */}
        {subscription.status === 'active' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Days Remaining
              </span>
              <div className="flex items-center gap-2">
                {isExpiringSoon && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={`font-bold ${
                  isExpiringSoon ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {daysRemaining} days
                </span>
              </div>
            </div>
            {isExpiringSoon && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Subscription will expire soon. Consider renewing.
              </p>
            )}
          </div>
        )}

        {/* Auto Renew */}
        {subscription.autoRenew !== undefined && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Auto Renew</span>
              <Badge className={subscription.autoRenew ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}>
                {subscription.autoRenew ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        )}

        {/* Features */}
        {subscription.features && subscription.features.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Features Included
            </p>
            <div className="flex flex-wrap gap-2">
              {subscription.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!isEditing && subscription.status === 'active' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-yellow-600 hover:text-yellow-700 border-yellow-200 hover:border-yellow-300 dark:border-yellow-800">
              Pause Subscription
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-800">
              Cancel
            </Button>
          </div>
        )}

        {subscription.status === 'expired' && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button className="w-full btn-primary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Renew Subscription
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
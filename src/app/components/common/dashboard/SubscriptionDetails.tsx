// src/components/dashboard/SubscriptionDetails.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  Edit,
  Save,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface SubscriptionDetailsProps {
  subscription: {
    id: string;
    plan: string;
    status: 'active' | 'inactive' | 'pending';
    startDate: string;
    endDate: string;
    autoRenew: boolean;
    features: string[];
    paymentMethod: {
      type: string;
      last4: string;
      expiry: string;
    };
  };
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [autoRenew, setAutoRenew] = useState(subscription.autoRenew);

  const handleSave = async () => {
    try {
      // Save subscription settings
      toast.success('Subscription updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Subscription Details
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your subscription settings
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
                setAutoRenew(subscription.autoRenew);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Plan
            </p>
            <p className="mt-1 text-gray-900 dark:text-white capitalize font-semibold">
              {subscription.plan}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </p>
            <Badge className="mt-1">
              {subscription.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Start Date
            </p>
            <p className="mt-1 text-gray-900 dark:text-white">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              End Date
            </p>
            <p className="mt-1 text-gray-900 dark:text-white">
              {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Auto-Renew
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {autoRenew ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            {isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRenew(!autoRenew)}
              >
                {autoRenew ? 'Disable' : 'Enable'}
              </Button>
            ) : (
              <Badge variant={autoRenew ? 'success' : 'default'}>
                {autoRenew ? 'Active' : 'Inactive'}
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Features Included
          </p>
          <div className="grid grid-cols-2 gap-2">
            {subscription.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Payment Method
          </p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-white">
                {subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires {subscription.paymentMethod.expiry}
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Update
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
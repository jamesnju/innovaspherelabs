// src/components/admin/CustomerDetails.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  CreditCard,
  Users,
  Package,
  Edit,
  Save,
  X,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';

import toast from 'react-hot-toast';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { CustomerDetails as CustomerDetailsType } from '../../services/admin';

interface CustomerDetailsProps {
  customer: CustomerDetailsType;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(customer);

  const handleSave = async () => {
    try {
      // Save customer details
      toast.success('Customer details updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update customer details');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={customer.avatar} fallback={customer.name.charAt(0)} size="lg" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {customer.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{customer.role}</span>
              <span>•</span>
              <span>{customer.companyName}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}>
            {customer.status}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.phone}</span>
                </div>
              )}
              {customer.company?.address && (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.company.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Joined {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Subscription Details</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Plan</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {customer.subscription.plan}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <Badge className={customer.subscription.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}>
                  {customer.subscription.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Start Date</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(customer.subscription.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">End Date</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(customer.subscription.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
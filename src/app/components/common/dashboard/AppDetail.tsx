// src/components/common/dashboard/AppDetail.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Zap, 
  ShoppingBag,
  Package,
  BarChart3,
  Users,
  Cloud,
  Wifi,
  RefreshCw,
  Shield,
  Gift,
  Star
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AppDetailProps {
  app: {
    id: string;
    name: string;
    description: string;
    price: string;
    features: string[];
    icon: React.ReactNode;
    color: string;
    plan?: 'free' | 'premium' | 'enterprise';
    isSubscribed?: boolean;
  };
  user: any;
}

export function AppDetail({ app, user }: AppDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  // Pricing plans
  const plans = [
    {
      name: 'Monthly',
      price: '$29',
      period: '/mo',
      features: [
        'Offline mode',
        'Real-time sync',
        'Inventory tracking',
        'Sales reports',
        'Multi-branch support',
        '24/7 support'
      ]
    },
    {
      name: 'Yearly',
      price: '$290',
      period: '/yr',
      features: [
        'Offline mode',
        'Real-time sync',
        'Inventory tracking',
        'Sales reports',
        'Multi-branch support',
        '24/7 support',
        'Priority support',
        'Advanced analytics'
      ],
      popular: true,
      savings: 'Save $58'
    }
  ];

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/apps/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: app.id,
          plan: selectedPlan,
          userId: user?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      // Redirect to checkout or show success
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.success('Successfully subscribed!');
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/apps/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: app.id,
          plan: selectedPlan,
          userId: user?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upgrade');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.success('Successfully upgraded!');
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upgrade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSubscribed = app.isSubscribed || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      {/* App Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 md:gap-6">
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: `${app.color}20` }}
          >
            <div style={{ color: app.color }} className="text-3xl md:text-4xl">
              {app.icon}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {app.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {app.description}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-secondary-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Starting from {app.price}
                </span>
              </div>
              {isSubscribed && (
                <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                  Subscribed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Feature Details */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Why Choose {app.name}?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="h-5 w-5 text-secondary-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Offline Mode</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continue selling even without internet connection
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-secondary-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Real-time Sync</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Data syncs automatically when back online
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-secondary-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Inventory Tracking</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time stock management across all branches
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-secondary-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Sales Reports</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detailed analytics and insights for your business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Starting from
              </h3>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {app.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Complete {app.name} solution for retail businesses
              </p>
            </div>

            {/* Plan Toggle */}
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                  selectedPlan === 'yearly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 bg-secondary-500 text-white rounded-full">
                  Save
                </span>
              </button>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-3">
              {plans.find(p => p.name.toLowerCase() === selectedPlan)?.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            {isSubscribed ? (
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full mt-8 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Upgrading...
                  </span>
                ) : (
                  'Upgrade Plan'
                )}
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full mt-8 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  'Start Free Trial →'
                )}
              </button>
            )}

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
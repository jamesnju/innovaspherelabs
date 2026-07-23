// src/components/marketing/Pricing/PricingTable.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

interface PricingTableProps {
  plans: Plan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  const [interval, setInterval] = useState<'month' | 'year'>('month');

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setInterval('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              interval === 'month'
                ? 'bg-white dark:bg-gray-900 shadow-soft text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('year')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              interval === 'year'
                ? 'bg-white dark:bg-gray-900 shadow-soft text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs text-green-500">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const price = interval === 'year' ? plan.price * 12 * 0.8 : plan.price;
          const isPopular = plan.isPopular;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-soft border ${
                isPopular
                  ? 'border-secondary-500 dark:border-secondary-400'
                  : 'border-gray-200 dark:border-gray-800'
              } p-6 flex flex-col`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-secondary-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /{interval === 'month' ? 'mo' : 'yr'}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/signup">
                  <Button className="w-full btn-primary">
                    Get Started
                  </Button>
                </Link>
                {isPopular && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    No credit card required
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
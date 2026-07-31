// src/components/common/dashboard/SubscriptionPlans.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plan } from '@/src/types/shared.types';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { getAvailablePlansClient, upgradePlan } from '@/src/app/services/billing.client';

interface SubscriptionPlansProps {
  currentPlan?: string;
  plans?: Plan[];
  subscriptionId?: string;
}

export function SubscriptionPlans({ 
  currentPlan: initialCurrentPlan, 
  plans: initialPlans,
  subscriptionId 
}: SubscriptionPlansProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>(initialPlans || []);
  const [currentPlan, setCurrentPlan] = useState(initialCurrentPlan);
  const [isLoadingPlans, setIsLoadingPlans] = useState(!initialPlans);

  // Fetch plans if not provided as props
  useEffect(() => {
    if (!initialPlans) {
      const fetchPlans = async () => {
        try {
          const fetchedPlans = await getAvailablePlansClient();
          setPlans(fetchedPlans);
        } catch (err) {
          console.error('Failed to fetch plans:', err);
        } finally {
          setIsLoadingPlans(false);
        }
      };
      fetchPlans();
    }
  }, [initialPlans]);

  const handleUpgrade = async (planId: string) => {
    try {
      setLoading(planId);
      setError(null);
      setSuccess(null);

      const result = await upgradePlan(planId);
      setSuccess(`Successfully upgraded to ${planId} plan!`);
      setCurrentPlan(planId);
      
      // Refresh the page after a delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to upgrade plan');
    } finally {
      setLoading(null);
    }
  };

  const isCurrentPlan = (planId: string) => currentPlan === planId;
  const isUpgrade = (planId: string) => {
    const planOrder = ['FREE', 'BASIC', 'PREMIUM'];
    const currentIndex = planOrder.indexOf(currentPlan || 'FREE');
    const planIndex = planOrder.indexOf(planId);
    return planIndex > currentIndex;
  };

  if (isLoadingPlans) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-secondary-500" />
        </div>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">No plans available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Available Plans
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-4">
        {plans.map((plan) => {
          const isCurrent = isCurrentPlan(plan.id);
          const canUpgrade = isUpgrade(plan.id) && !isCurrent;

          return (
            <div
              key={plan.id}
              className={`relative p-4 rounded-lg border transition-all ${
                isCurrent
                  ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                  : canUpgrade
                  ? 'border-gray-200 dark:border-gray-800 hover:border-secondary-300 dark:hover:border-secondary-700'
                  : 'border-gray-200 dark:border-gray-800 opacity-60'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-2 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Popular
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 bg-secondary-500 text-white rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {plan.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.currency} {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      /month
                    </span>
                  </div>
                </div>

                {canUpgrade && (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading === plan.id}
                    className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {loading === plan.id ? 'Upgrading...' : 'Upgrade'}
                  </button>
                )}

                {isCurrent && (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Active
                  </button>
                )}

                {!isCurrent && !canUpgrade && (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    {currentPlan ? 'Downgrade' : 'Unavailable'}
                  </button>
                )}
              </div>

              <div className="mt-4">
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check className="h-4 w-4 text-secondary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {currentPlan && (
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Current plan: <span className="font-medium">{currentPlan}</span>
        </p>
      )}
    </div>
  );
}
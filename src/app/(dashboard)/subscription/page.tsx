// src/app/(dashboard)/subscription/page.tsx
import { Metadata } from 'next';
import { SubscriptionDetails } from '../../components/common/dashboard/SubscriptionDetails';
import { SubscriptionPlans } from '../../components/common/dashboard/SubscriptionPlans';
import { getCurrentUser } from '../../services/auth.server';
import { getAvailablePlans, getCurrentSubscription } from '../../services/billing';

export const metadata: Metadata = {
  title: 'Subscription - Manage Your Plan',
  description: 'View and manage your subscription plan.',
};

export default async function SubscriptionPage() {
  const [user, subscription, plans] = await Promise.all([
    getCurrentUser(),
    getCurrentSubscription(),
    getAvailablePlans(),
  ]);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isSuperAdmin 
            ? 'Manage subscription plans' 
            : 'Manage your subscription plan and billing preferences.'}
        </p>
      </div>

      {isSuperAdmin ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            ℹ️ You are viewing this page as a Super Admin. Subscription management is limited.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SubscriptionDetails subscription={subscription} />
          </div>
          <div>
            <SubscriptionPlans 
              currentPlan={subscription?.plan} 
              plans={plans}
              subscriptionId={subscription?.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
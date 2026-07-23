// src/app/(dashboard)/billing/page.tsx
import { Metadata } from 'next';
import { getBillingData } from '../../services/billing';
import { BillingHistory } from '../../components/common/dashboard/BillingHistory';
import { BillingOverview } from '../../components/common/dashboard/BillingOverview';
import { SubscriptionDetails } from '../../components/common/dashboard/SubscriptionDetails';
export const metadata: Metadata = {
  title: 'Billing - Manage Your Subscription',
  description: 'View and manage your subscription plans and billing history.',
};

export default async function BillingPage() {
  const billingData = await getBillingData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your subscription and view billing history.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SubscriptionDetails subscription={billingData.subscription} />
          <BillingHistory history={billingData.history} />
        </div>
        <div>
          <BillingOverview summary={billingData.summary} />
        </div>
      </div>
    </div>
  );
}
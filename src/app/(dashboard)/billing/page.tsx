// src/app/(dashboard)/billing/page.tsx
import { Metadata } from 'next';
import { BillingHistory } from '../../components/common/dashboard/BillingHistory';
import { BillingOverview } from '../../components/common/dashboard/BillingOverview';
import { getCurrentUser } from '../../services/auth.server';
import { getBillingData } from '../../services/billing';

export const metadata: Metadata = {
  title: 'Billing - Manage Your Subscription',
  description: 'View and manage your subscription plans and billing history.',
};

export default async function BillingPage() {
  const [user, billingData] = await Promise.all([
    getCurrentUser(),
    getBillingData(),
  ]);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isSuperAdmin 
            ? 'View all billing information and transactions.' 
            : 'Manage your subscription and view billing history.'}
        </p>
      </div>

      {isSuperAdmin ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            ℹ️ You are viewing this page as a Super Admin. Billing management is limited.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BillingHistory 
              invoices={billingData.invoices} 
              meta={billingData.invoiceMeta}
            />
          </div>
          <div>
            <BillingOverview summary={billingData.summary} />
          </div>
        </div>
      )}
    </div>
  );
}
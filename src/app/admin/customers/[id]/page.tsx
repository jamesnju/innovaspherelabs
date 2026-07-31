// src/app/(admin)/customers/[id]/page.tsx
import { CustomerDetails } from '@/src/app/components/admin/CustomerDetails';
import { SubscriptionManager } from '@/src/app/components/admin/SubscriptionManager';
import { getCustomerById } from '@/src/app/services/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const customer = await getCustomerById(params.id);
  
  if (!customer) {
    return {
      title: 'Customer Not Found',
    };
  }

  return {
    title: `${customer.companyName} - Customer Details`,
    description: `Manage ${customer.companyName}'s subscription and account details.`,
  };
}

export default async function CustomerDetailsPage({ params }: Props) {
  const customer = await getCustomerById(params.id);
  
  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {customer.companyName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage customer details and subscription.
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CustomerDetails customer={customer} />
        </div>
        <div>
          <SubscriptionManager subscription={customer.subscription} />
        </div>
      </div>
    </div>
  );
}
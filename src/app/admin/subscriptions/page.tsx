// src/app/(admin)/admin/subscriptions/page.tsx
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { getClients } from '../../services/admin.server';
import { SubscriptionsTable } from '../../components/admin/SubscriptionsTable';

export const metadata: Metadata = {
  title: 'Subscriptions - Admin Management',
  description: 'Manage all subscriptions on the platform.',
};

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    plan?: string;
  };
}

export default async function SubscriptionsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '10');
  const { data: clients, meta } = await getClients(page, limit, searchParams.search);

  // Map clients to subscription data
  const subscriptions = clients
    .filter(client => client.subscription)
    .map(client => ({
      id: client.id,
      clientName: client.name,
      clientEmail: client.email,
      plan: client.subscription?.plan || 'FREE',
      status: client.subscription?.status || 'INACTIVE',
      users: client._count?.users || 0,
    }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all client subscriptions and plans.
        </p>
      </div>

      <SubscriptionsTable subscriptions={subscriptions} meta={meta} />
    </div>
  );
}
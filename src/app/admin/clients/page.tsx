// src/app/(admin)/admin/clients/page.tsx
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { getClients } from '../../services/admin.server';
import { ClientsTable } from '../../components/admin/ClientsTable';

export const metadata: Metadata = {
  title: 'Clients - Admin Management',
  description: 'Manage all clients on the platform.',
};

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  };
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = parseInt(searchParams.limit || '10', 10);
  const { data: clients, meta } = await getClients(page, limit, searchParams.search, searchParams.status);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all clients and their subscriptions.
        </p>
      </div>

      <ClientsTable clients={clients} meta={meta} />
    </div>
  );
}
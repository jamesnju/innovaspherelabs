// src/app/(admin)/customers/page.tsx
import { Metadata } from 'next';
import { CustomerTable } from '../../components/admin/CustomerTable';
import { getCustomers } from '../../services/admin';

export const metadata: Metadata = {
  title: 'Customers - Manage Businesses',
  description: 'View and manage all businesses on your platform.',
};

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all businesses using your platform.
        </p>
      </div>
      <CustomerTable customers={customers} />
    </div>
  );
}
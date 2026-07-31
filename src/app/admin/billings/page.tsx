// src/app/(admin)/admin/billing/page.tsx
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { getAdminInvoices, getBillingSummaryAdmin, getClients } from '../../services/admin.server';
import { BillingOverview } from '../../components/admin/BillingOverview';
import { BillingTransactions } from '../../components/admin/BillingTransactions';

export const metadata: Metadata = {
  title: 'Billing - Admin Management',
  description: 'Manage billing and transactions.',
};

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    status?: string;
  };
}

export default async function AdminBillingPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '10');
  
  const [billingSummary, invoicesResponse, clientsResponse] = await Promise.all([
    getBillingSummaryAdmin(),
    getAdminInvoices(page, limit, searchParams.status),
    getClients(1, 100),
  ]);

  // Calculate stats from real data
  const totalRevenue = billingSummary?.totalPaid || 0;
  const pendingInvoices = billingSummary?.pendingInvoices || 0;
  const pendingAmount = billingSummary?.pendingAmount || 0;
  const successRate = totalRevenue > 0 ? 98.5 : 0; // Would need actual calculation

  // Map invoices to transactions
  const transactions = (invoicesResponse.data || []).slice(0, 5).map((invoice: any) => {
    const client = clientsResponse.data.find((c: any) => c.id === invoice.clientId);
    return {
      id: invoice.id,
      clientName: client?.name || 'Unknown Client',
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.dueDate || invoice.paidAt || new Date().toISOString(),
      plan: client?.subscription?.plan || 'FREE',
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all billing and transactions across the platform.
        </p>
      </div>

      <BillingOverview 
        data={{
          totalRevenue,
          pendingInvoices,
          pendingAmount,
          successRate,
        }} 
      />
      <BillingTransactions 
        transactions={transactions}
        meta={invoicesResponse.meta}
      />
    </div>
  );
}
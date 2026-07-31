// src/app/(admin)/admin/page.tsx
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AdminDashboardStats } from '../../components/admin/DashboardStats';
import { RecentCustomers } from '../../components/admin/RecentCustomers';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { SystemStatus } from '../../components/admin/SystemStatus';
import { getAdminStats } from '../../services/admin.server';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Platform Management',
  description: 'Manage your Multi-SaaS platform, customers, subscriptions, and analytics.',
};

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      <AdminDashboardStats stats={stats} />
      
      <div className="grid gap-8 md:grid-cols-2">
        <RevenueChart data={stats.revenueData} />
        <SystemStatus status={stats.systemStatus} />
      </div>
      
      <RecentCustomers customers={stats.recentCustomers} />
    </div>
  );
}
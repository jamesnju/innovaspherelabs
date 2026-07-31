// src/app/(dashboard)/page.tsx
import { Metadata } from 'next';
import { QuickStats } from '../../components/common/dashboard/QuickStats';
import { RecentActivity } from '../../components/common/dashboard/RecentActivity';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../services/auth.server';
import { getDashboardData } from '../../services/dashboard';
import { AvailableApps } from '../../components/common/dashboard/AvailableApps';

export const metadata: Metadata = {
  title: 'Dashboard - Overview',
  description: 'Your business dashboard overview',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login');
  }

  // Get dashboard data
  const dashboardData = await getDashboardData();

  // Check if user is SUPER_ADMIN
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isSuperAdmin 
            ? 'Manage your platform and view all client data.' 
            : 'Here\'s what\'s happening with your business today.'}
        </p>
      </div>

      {/* Quick Stats - Only show for non-super admin */}
      {!isSuperAdmin && dashboardData.quickStats && dashboardData.quickStats.length > 0 && (
        <QuickStats stats={dashboardData.quickStats} />
      )}

      {/* Super Admin Message */}
      {isSuperAdmin && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            ℹ️ You are viewing this page as a Super Admin. Quick stats are disabled for admin accounts.
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Available Apps - Only show for non-super admin */}
        {!isSuperAdmin && (
          <div className="lg:col-span-2">
            <AvailableApps apps={dashboardData.availableApps || []} />
          </div>
        )}

        {/* Recent Activity */}
        <div className={`${!isSuperAdmin ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <RecentActivity activities={dashboardData.recentActivity || []} />
        </div>
      </div>

      {/* Billing Summary for non-super admin */}
      {!isSuperAdmin && dashboardData.billingSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Invoices</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {dashboardData.billingSummary.pendingInvoices || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Amount</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              ${(dashboardData.billingSummary.pendingAmount || 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${(dashboardData.billingSummary.totalPaid || 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
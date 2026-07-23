// src/app/(dashboard)/dashboard/page.tsx
import { Metadata } from 'next';
import { AppLauncher } from '../../components/common/dashboard/AppLauncher';
import { DashboardOverview } from '../../components/common/dashboard/DashboardOverview';
import { QuickStats } from '../../components/common/dashboard/QuickStats';
import { RecentActivity } from '../../components/common/dashboard/RecentActivity';
import { getDashboardData } from '../../services/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - Your Business Hub',
  description: 'View your business overview and launch your applications.',
};

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here's an overview of your business performance.
        </p>
      </div>

      <QuickStats stats={data.stats} />
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardOverview data={data.overview} />
        </div>
        <div>
          <AppLauncher apps={data.availableApps} />
        </div>
      </div>
      
      <RecentActivity activities={data.recentActivity} />
    </div>
  );
}
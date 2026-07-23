// src/app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { DashboardLayout } from '../components/common/Layout/DashboardLayout';
import { getCurrentUser } from '../services/auth';


export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user || user.role === 'super_admin') {
    redirect('/login');
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
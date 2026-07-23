// src/app/(admin)/layout.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../services/auth';
import { AdminLayout } from '../components/common/Layout/AdminLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'super_admin') {
    redirect('/login');
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
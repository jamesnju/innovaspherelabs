// src/app/(admin)/layout.tsx
import { AdminLayout } from '../components/common/Layout/AdminLayout';
import { getCurrentUser } from '../services/auth.server';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  // Check if user is SUPER_ADMIN
  if (!user || user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}

// // src/app/(admin)/layout.tsx
// import { redirect } from 'next/navigation';
// import { getCurrentUser } from '../services/auth';
// import { AdminLayout } from '../components/common/Layout/AdminLayout';

// export default async function Layout({ children }: { children: React.ReactNode }) {
//   const user = await getCurrentUser();
  
//   if (!user || user.role !== 'super_admin') {
//     redirect('/login');
//   }

//   return <AdminLayout user={user}>{children}</AdminLayout>;
// }
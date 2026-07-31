// src/app/services/dashboard.ts
import { cache } from 'react';
import { ReactNode } from 'react';
import { 
  ShoppingBag, 
  Store, 
  Package, 
  Coffee, 
  GraduationCap, 
  Users,
  CreditCard,
  FileText,
  TrendingUp
} from 'lucide-react';
import { getCurrentUser } from './auth.server';
import { getDashboardStats, getBillingSummary } from './billing';

export interface DashboardData {
  stats: {
    totalUsers: number;
    totalProducts: number;
    totalInvoices: number;
    pendingAmount: number;
    changes?: {
      users: number;
      products: number;
      invoices: number;
      revenue: number;
    };
  };
  billingSummary: {
    pendingInvoices: number;
    pendingAmount: number;
    totalPaid: number;
  };
  quickStats: Array<{
    id: string;
    title: string;
    value: number;
    change: number;
    icon: ReactNode;
    color: string;
    href: string;
  }>;
  availableApps: App[];
  recentActivity: Array<{
    id: string;
    type: 'sale' | 'user' | 'product' | 'payment' | 'invoice' | 'login';
    title: string;
    description: string;
    timestamp: string;
    amount?: number;
  }>;
  userInfo?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface App {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  url: string;
  status: 'active' | 'coming_soon';
  color: string;
}

// src/app/services/dashboard.ts (Update the getDashboardData function)

export const getDashboardData = cache(async (): Promise<DashboardData> => {
  try {
    const user = await getCurrentUser();
    
    // Check if user is SUPER_ADMIN - return minimal data
    if (user?.role === 'SUPER_ADMIN') {
      return {
        stats: {
          totalUsers: 0,
          totalProducts: 0,
          totalInvoices: 0,
          pendingAmount: 0,
          changes: {
            users: 0,
            products: 0,
            invoices: 0,
            revenue: 0,
          },
        },
        billingSummary: {
          pendingInvoices: 0,
          pendingAmount: 0,
          totalPaid: 0,
        },
        quickStats: [],
        availableApps: [],
        recentActivity: [],
        userInfo: user ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } : undefined,
      };
    }

    // Fetch data for regular users
    const [dashboardStats, billingSummary] = await Promise.all([
      getDashboardStats().catch(() => null),
      getBillingSummary().catch(() => null),
    ]);

    const stats = dashboardStats || {
      users: 0,
      products: 0,
      invoices: 0,
      pendingAmount: 0,
    };

    const summary = billingSummary || {
      pendingInvoices: 0,
      pendingAmount: 0,
      totalPaid: 0,
      lastInvoice: null,
      subscription: {
        id: '',
        plan: 'FREE',
        status: 'ACTIVE',
      },
    };

    const icons = {
      users: <Users className="h-6 w-6" />,
      products: <Package className="h-6 w-6" />,
      invoices: <FileText className="h-6 w-6" />,
      pending: <CreditCard className="h-6 w-6" />,
      pos: <ShoppingBag className="h-6 w-6" />,
      ecommerce: <Store className="h-6 w-6" />,
      inventory: <Package className="h-6 w-6" />,
      restaurant: <Coffee className="h-6 w-6" />,
      school: <GraduationCap className="h-6 w-6" />,
    };

    // Ensure quickStats always has valid data
    const quickStats = [
      {
        id: 'users',
        title: 'Total Users',
        value: stats.users || 0,
        change: 12.5,
        icon: icons.users,
        color: 'bg-blue-500',
        href: '/dashboard/settings/team',
      },
      {
        id: 'products',
        title: 'Total Products',
        value: stats.products || 0,
        change: 8.3,
        icon: icons.products,
        color: 'bg-green-500',
        href: '/dashboard/inventory',
      },
      {
        id: 'invoices',
        title: 'Total Invoices',
        value: stats.invoices || 0,
        change: 5.2,
        icon: icons.invoices,
        color: 'bg-purple-500',
        href: '/dashboard/billing',
      },
      {
        id: 'pending',
        title: 'Pending Amount',
        value: stats.pendingAmount || 0,
        change: -2.1,
        icon: icons.pending,
        color: 'bg-orange-500',
        href: '/dashboard/billing',
      },
    ];

    // Available apps (only for non-SUPER_ADMIN)
    const availableApps: App[] = [
      {
        id: 'pos',
        name: 'POS System',
        description: 'Point of Sale application',
        icon: icons.pos,
        url: process.env.NEXT_PUBLIC_POS_URL || '#',
        status: 'active' as const,
        color: '#4F46E5',
      },
      {
        id: 'ecommerce',
        name: 'E-commerce',
        description: 'Online store management',
        icon: icons.ecommerce,
        url: process.env.NEXT_PUBLIC_ECOMMERCE_URL || '#',
        status: 'active' as const,
        color: '#F59E0B',
      },
      {
        id: 'inventory',
        name: 'Inventory Management',
        description: 'Track and manage stock',
        icon: icons.inventory,
        url: '#',
        status: 'coming_soon' as const,
        color: '#10B981',
      },
      {
        id: 'restaurant',
        name: 'Restaurant Management',
        description: 'Manage your restaurant operations',
        icon: icons.restaurant,
        url: '#',
        status: 'coming_soon' as const,
        color: '#8B5CF6',
      },
    ];

    // Mock recent activity
    const recentActivity = [
      {
        id: '1',
        type: 'invoice' as const,
        title: 'New Invoice Generated',
        description: `Invoice ${summary.lastInvoice?.invoiceNumber || 'INV-001'}`,
        timestamp: new Date().toISOString(),
        amount: summary.lastInvoice?.amount || 0,
      },
      {
        id: '2',
        type: 'payment' as const,
        title: 'Payment Received',
        description: 'Payment of $49.00 for Premium Plan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        amount: 49.00,
      },
      {
        id: '3',
        type: 'user' as const,
        title: 'New User Added',
        description: 'Sarah Johnson joined your team',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ];

    return {
      stats: {
        totalUsers: stats.users || 0,
        totalProducts: stats.products || 0,
        totalInvoices: stats.invoices || 0,
        pendingAmount: stats.pendingAmount || 0,
        changes: {
          users: 12.5,
          products: 8.3,
          invoices: 5.2,
          revenue: 15.2,
        },
      },
      billingSummary: {
        pendingInvoices: summary.pendingInvoices || 0,
        pendingAmount: summary.pendingAmount || 0,
        totalPaid: summary.totalPaid || 0,
      },
      quickStats: quickStats,
      availableApps: availableApps,
      recentActivity: recentActivity,
      userInfo: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    // Return safe default data
    return {
      stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalInvoices: 0,
        pendingAmount: 0,
        changes: {
          users: 0,
          products: 0,
          invoices: 0,
          revenue: 0,
        },
      },
      billingSummary: {
        pendingInvoices: 0,
        pendingAmount: 0,
        totalPaid: 0,
      },
      quickStats: [],
      availableApps: [],
      recentActivity: [],
    };
  }
});

// export const getDashboardData = cache(async (): Promise<DashboardData> => {
//   const user = await getCurrentUser();
  
//   // Check if user is SUPER_ADMIN - return minimal data
//   if (user?.role === 'SUPER_ADMIN') {
//     return {
//       stats: {
//         totalUsers: 0,
//         totalProducts: 0,
//         totalInvoices: 0,
//         pendingAmount: 0,
//       },
//       billingSummary: {
//         pendingInvoices: 0,
//         pendingAmount: 0,
//         totalPaid: 0,
//       },
//       quickStats: [],
//       availableApps: [],
//       recentActivity: [],
//       userInfo: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     };
//   }

//   // Fetch data for regular users
//   const [dashboardStats, billingSummary] = await Promise.all([
//     getDashboardStats(),
//     getBillingSummary(),
//   ]);

//   const stats = dashboardStats || {
//     users: 0,
//     products: 0,
//     invoices: 0,
//     pendingAmount: 0,
//   };

//   const summary = billingSummary || {
//     pendingInvoices: 0,
//     pendingAmount: 0,
//     totalPaid: 0,
//     lastInvoice: null,
//   };

//   const icons = {
//     users: <Users className="h-6 w-6" />,
//     products: <Package className="h-6 w-6" />,
//     invoices: <FileText className="h-6 w-6" />,
//     pending: <CreditCard className="h-6 w-6" />,
//     pos: <ShoppingBag className="h-6 w-6" />,
//     ecommerce: <Store className="h-6 w-6" />,
//     inventory: <Package className="h-6 w-6" />,
//     restaurant: <Coffee className="h-6 w-6" />,
//     school: <GraduationCap className="h-6 w-6" />,
//   };

//   const quickStats = [
//     {
//       id: 'users',
//       title: 'Total Users',
//       value: stats.users || 0,
//       change: 12.5,
//       icon: icons.users,
//       color: 'bg-blue-500',
//       href: '/dashboard/settings/team',
//     },
//     {
//       id: 'products',
//       title: 'Total Products',
//       value: stats.products || 0,
//       change: 8.3,
//       icon: icons.products,
//       color: 'bg-green-500',
//       href: '/dashboard/inventory',
//     },
//     {
//       id: 'invoices',
//       title: 'Total Invoices',
//       value: stats.invoices || 0,
//       change: 5.2,
//       icon: icons.invoices,
//       color: 'bg-purple-500',
//       href: '/dashboard/billing',
//     },
//     {
//       id: 'pending',
//       title: 'Pending Amount',
//       value: stats.pendingAmount || 0,
//       change: -2.1,
//       icon: icons.pending,
//       color: 'bg-orange-500',
//       href: '/dashboard/billing',
//     },
//   ];

//   // Available apps (only for non-SUPER_ADMIN)
//   const availableApps: App[] = [
//     {
//       id: 'pos',
//       name: 'POS System',
//       description: 'Point of Sale application',
//       icon: icons.pos,
//       url: process.env.NEXT_PUBLIC_POS_URL || '#',
//       status: 'active' as const,
//       color: '#4F46E5',
//     },
//     {
//       id: 'ecommerce',
//       name: 'E-commerce',
//       description: 'Online store management',
//       icon: icons.ecommerce,
//       url: process.env.NEXT_PUBLIC_ECOMMERCE_URL || '#',
//       status: 'active' as const,
//       color: '#F59E0B',
//     },
//     {
//       id: 'inventory',
//       name: 'Inventory Management',
//       description: 'Track and manage stock',
//       icon: icons.inventory,
//       url: '#',
//       status: 'coming_soon' as const,
//       color: '#10B981',
//     },
//     {
//       id: 'restaurant',
//       name: 'Restaurant Management',
//       description: 'Manage your restaurant operations',
//       icon: icons.restaurant,
//       url: '#',
//       status: 'coming_soon' as const,
//       color: '#8B5CF6',
//     },
//   ];

//   // Mock recent activity (would come from API in production)
//   const recentActivity = [
//     {
//       id: '1',
//       type: 'invoice' as const,
//       title: 'New Invoice Generated',
//       description: `Invoice #${summary.lastInvoice?.invoiceNumber || 'INV-001'}`,
//       timestamp: new Date().toISOString(),
//       amount: summary.lastInvoice?.amount || 0,
//     },
//     {
//       id: '2',
//       type: 'payment' as const,
//       title: 'Payment Received',
//       description: 'Payment of $49.00 for Premium Plan',
//       timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
//       amount: 49.00,
//     },
//     {
//       id: '3',
//       type: 'user' as const,
//       title: 'New User Added',
//       description: 'Sarah Johnson joined your team',
//       timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
//     },
//   ];

//   return {
//     stats: {
//       totalUsers: stats.users || 0,
//       totalProducts: stats.products || 0,
//       totalInvoices: stats.invoices || 0,
//       pendingAmount: stats.pendingAmount || 0,
//       changes: {
//         users: 12.5,
//         products: 8.3,
//         invoices: 5.2,
//         revenue: 15.2,
//       },
//     },
//     billingSummary: {
//       pendingInvoices: summary.pendingInvoices || 0,
//       pendingAmount: summary.pendingAmount || 0,
//       totalPaid: summary.totalPaid || 0,
//     },
//     quickStats,
//     availableApps,
//     recentActivity,
//     userInfo: user ? {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     } : undefined,
//   };
// });
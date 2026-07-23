// src/lib/services/dashboard.tsx
import { cache } from 'react';
import { getCurrentUser } from './auth';
import { ReactNode } from 'react';
import { ShoppingBag, Store, Package, Coffee, GraduationCap, Users } from 'lucide-react';
import { db } from '@/src/lib/firebase/admin';

// Define the App type with ReactNode icon
export interface App {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  url: string;
  status: 'active' | 'coming_soon';
  color: string;
}

export const getDashboardData = cache(async () => {
  const user = await getCurrentUser();
  const companyId = user?.companyId;

  // Create icon elements
  const icons = {
    pos: <ShoppingBag className="h-6 w-6" />,
    ecommerce: <Store className="h-6 w-6" />,
    inventory: <Package className="h-6 w-6" />,
    restaurant: <Coffee className="h-6 w-6" />,
    school: <GraduationCap className="h-6 w-6" />,
    default: <Users className="h-6 w-6" />,
  };

  if (!companyId) {
    return {
      stats: {
        revenue: 0,
        orders: 0,
        customers: 0,
        products: 0,
        changes: {
          revenue: 0,
          orders: 0,
          customers: 0,
          products: 0,
        },
      },
      overview: {
        sales: [],
        orders: [],
        revenue: 0,
        growth: 0,
      },
      availableApps: [
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
      ],
      recentActivity: [],
    };
  }

  // Get company data
  const companyDoc = await db.collection('companies').doc(companyId).get();
  const companyData = companyDoc.data();

  // Generate mock sales data
  const sales = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 1000) + 100,
    };
  });

  const orders = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20) + 1,
    };
  });

  // Mock stats
  const stats = {
    revenue: 15750,
    orders: 124,
    customers: 89,
    products: 234,
    changes: {
      revenue: 15.2,
      orders: 8.7,
      customers: 12.3,
      products: 5.1,
    },
  };

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'sale' as const,
      title: 'New Sale #1234',
      description: 'John Doe purchased 3 items',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      amount: 245.50,
    },
    {
      id: '2',
      type: 'user' as const,
      title: 'New User Registered',
      description: 'Jane Smith created an account',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: '3',
      type: 'product' as const,
      title: 'Product Added',
      description: 'New product "Premium Widget" added to inventory',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: '4',
      type: 'payment' as const,
      title: 'Payment Received',
      description: 'Payment of $499.99 from ABC Corp',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      amount: 499.99,
    },
  ];

  return {
    stats,
    overview: {
      sales,
      orders,
      revenue: stats.revenue,
      growth: stats.changes.revenue,
    },
    availableApps: [
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
    ],
    recentActivity,
  };
});
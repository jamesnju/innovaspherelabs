// src/lib/services/admin.ts
import { db } from '@/src/lib/firebase/admin';
import { cache } from 'react';

// Define subscription status type
export type SubscriptionStatus = 'active' | 'inactive' | 'pending' | 'expired' | 'cancelled';

// Define the Customer type that matches the CustomerTable component
export interface Customer {
  id: string;
  companyName: string;
  email: string;
  plan: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  avatar?: string;
  products: string[];
}

// Define RecentCustomer type for the recent customers list
export interface RecentCustomer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  joinedAt: string;
  avatar?: string;
}

// Define Company type
export interface Company {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

// Define Subscription type for SubscriptionManager
export interface Subscription {
  plan: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew?: boolean;
  features?: string[];
}

// Define CustomerDetails type for CustomerDetails component
export interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  avatar?: string;
  company?: Company;
  subscription: Subscription;
}

export const getAdminStats = cache(async () => {
  // Get total customers
  const customersSnapshot = await db.collection('users')
    .where('role', '!=', 'super_admin')
    .get();
  const totalCustomers = customersSnapshot.size;

  // Get active subscriptions
  const subscriptionsSnapshot = await db.collection('companies')
    .where('subscription.status', '==', 'active')
    .get();
  const activeSubscriptions = subscriptionsSnapshot.size;

  // Calculate revenue (mock data for demo)
  const revenue = 45230;
  const growth = 12.5;

  // Get recent customers
  const recentCustomersSnapshot = await db.collection('users')
    .where('role', '!=', 'super_admin')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get();

  const recentCustomers: RecentCustomer[] = recentCustomersSnapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data?.name || 'Unknown',
      email: data?.email || '',
      company: data?.companyName || 'No Company',
      plan: data?.plan || 'free',
      joinedAt: data?.createdAt || new Date().toISOString(),
      avatar: data?.avatar || undefined,
    };
  });

  return {
    totalCustomers,
    activeSubscriptions,
    revenue,
    growth,
    changes: {
      customers: 8.2,
      subscriptions: 5.4,
      revenue: 12.5,
      growth: 3.1,
    },
    revenueData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [28000, 32000, 35000, 38000, 42000, 45000, 43000, 47000, 51000, 54000, 58000, 62000],
    },
    systemStatus: {
      overall: 'operational' as const,
      lastUpdated: new Date().toISOString(),
      services: [
        { name: 'API Server', status: 'operational' as const, uptime: '99.99%', icon: 'Server' },
        { name: 'Database', status: 'operational' as const, uptime: '99.97%', icon: 'Database' },
        { name: 'Firebase', status: 'operational' as const, uptime: '99.95%', icon: 'Cloud' },
        { name: 'Authentication', status: 'operational' as const, uptime: '99.99%', icon: 'Shield' },
      ],
    },
    recentCustomers,
  };
});

export const getCustomers = cache(async (): Promise<Customer[]> => {
  try {
    const snapshot = await db.collection('users')
      .where('role', '!=', 'super_admin')
      .get();

    return snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = doc.data();
      // Ensure status is one of the allowed values
      let status: 'active' | 'suspended' | 'pending' = 'active';
      if (data?.status === 'suspended') {
        status = 'suspended';
      } else if (data?.status === 'pending') {
        status = 'pending';
      } else {
        status = 'active';
      }

      return {
        id: doc.id,
        companyName: data?.companyName || 'Unknown Company',
        email: data?.email || '',
        plan: data?.plan || 'free',
        status: status,
        createdAt: data?.createdAt || new Date().toISOString(),
        products: data?.products || ['POS', 'E-commerce'],
        avatar: data?.avatar || undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
});

export const getCustomerById = cache(async (id: string): Promise<CustomerDetails | null> => {
  try {
    const doc = await db.collection('users').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    
    // Get company data
    let company: Company | undefined = undefined;
    if (data?.companyId) {
      const companyDoc = await db.collection('companies').doc(data.companyId).get();
      if (companyDoc.exists) {
        const companyData = companyDoc.data();
        company = {
          name: companyData?.name || '',
          email: companyData?.email || '',
          phone: companyData?.phone || '',
          address: companyData?.address || undefined,
        };
      }
    }

    // Ensure status is one of the allowed values
    let status: 'active' | 'suspended' | 'pending' = 'active';
    if (data?.status === 'suspended') {
      status = 'suspended';
    } else if (data?.status === 'pending') {
      status = 'pending';
    } else {
      status = 'active';
    }

    // Convert to SubscriptionStatus for the subscription object
    let subscriptionStatus: SubscriptionStatus;
    if (data?.subscription?.status === 'inactive') {
      subscriptionStatus = 'inactive';
    } else if (data?.subscription?.status === 'pending') {
      subscriptionStatus = 'pending';
    } else if (data?.subscription?.status === 'expired') {
      subscriptionStatus = 'expired';
    } else if (data?.subscription?.status === 'cancelled') {
      subscriptionStatus = 'cancelled';
    } else {
      subscriptionStatus = 'active';
    }

    return {
      id: doc.id,
      name: data?.name || 'Unknown',
      email: data?.email || '',
      phone: data?.phone || undefined,
      companyName: data?.companyName || 'Unknown Company',
      role: data?.role || 'user',
      status: status,
      createdAt: data?.createdAt || new Date().toISOString(),
      avatar: data?.avatar || undefined,
      company: company,
      subscription: {
        plan: data?.plan || 'free',
        status: subscriptionStatus,
        startDate: data?.createdAt || new Date().toISOString(),
        endDate: data?.subscriptionEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true,
        features: ['POS System', 'E-commerce', 'Inventory Management'],
      },
    };
  } catch (error) {
    console.error('Error fetching customer by id:', error);
    return null;
  }
});
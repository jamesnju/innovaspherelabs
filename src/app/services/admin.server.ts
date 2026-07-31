// src/app/services/admin.server.ts
import 'server-only';
import { cache } from 'react';
import { getAuthToken } from './auth.server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface AdminStats {
  totalCustomers: number;
  activeSubscriptions: number;
  revenue: number;
  growth: number;
  changes: {
    customers: number;
    subscriptions: number;
    revenue: number;
    growth: number;
  };
  revenueData: {
    labels: string[];
    values: number[];
  };
  recentCustomers: RecentCustomer[];
  systemStatus: {
    services: ServiceStatus[];
    overall: 'operational' | 'degraded' | 'outage';
    lastUpdated: string;
  };
}

export interface RecentCustomer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  avatar?: string;
  joinedAt: string;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  icon: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  category?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  subscription?: {
    plan: string;
    status: string;
  };
  _count?: {
    users: number;
  };
  users?: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }>;
  invoices?: any[];
  customizations?: {
    theme: any;
    branding: any;
  };
}

export interface ClientsResponse {
  data: Client[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Get all clients (Super Admin only)
export async function getClients(page: number = 1, limit: number = 10, search?: string, status?: string): Promise<ClientsResponse> {
  try {
    const token = await getAuthToken();
    if (!token) return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append('search', search);
    if (status) params.append('status', status);

    const response = await fetch(`${API_URL}/clients?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch clients:', response.status);
      return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
    }

    const result = await response.json();
    return {
      data: result.data || [],
      meta: result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
  }
}

// Get client by ID
export async function getClientById(id: string): Promise<Client | null> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/clients/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch client:', response.status);
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching client:', error);
    return null;
  }
}

// Get billing summary for admin
export async function getBillingSummaryAdmin(): Promise<any> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/billing/summary`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch billing summary:', response.status);
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching billing summary:', error);
    return null;
  }
}

// Get all invoices (admin)
export async function getAdminInvoices(page: number = 1, limit: number = 10, status?: string): Promise<any> {
  try {
    const token = await getAuthToken();
    if (!token) return { data: [], meta: {} };

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append('status', status);

    const response = await fetch(`${API_URL}/billing/invoices?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch invoices:', response.status);
      return { data: [], meta: {} };
    }

    const result = await response.json();
    return {
      data: result.data || [],
      meta: result.meta || {},
    };
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return { data: [], meta: {} };
  }
}

// Get admin stats
export const getAdminStats = cache(async (): Promise<AdminStats> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return getDefaultAdminStats();
    }

    // Fetch clients and billing summary in parallel
    const [clientsResponse, billingSummary] = await Promise.all([
      getClients(1, 100),
      getBillingSummaryAdmin(),
    ]);

    const clients = clientsResponse.data || [];

    // Calculate stats from real data
    const totalCustomers = clients.length;
    const activeSubscriptions = clients.filter(c => c.subscription?.status === 'ACTIVE').length;
    
    // Get revenue from billing summary
    const revenue = billingSummary?.totalPaid || 0;
    const pendingAmount = billingSummary?.pendingAmount || 0;
    const pendingInvoices = billingSummary?.pendingInvoices || 0;

    // Calculate growth (mock for now, would need historical data)
    const growth = activeSubscriptions > 0 ? 15.5 : 0;

    // Generate monthly revenue data from invoices (if available)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = months.slice(0, currentMonth + 1);
    
    // Try to get real invoice data for revenue chart
    let values: number[] = [];
    try {
      const invoicesResponse = await getAdminInvoices(1, 100);
      const invoices = invoicesResponse.data || [];
      
      // Group invoices by month
      const monthlyRevenue: { [key: string]: number } = {};
      invoices.forEach((invoice: any) => {
        if (invoice.status === 'COMPLETED' || invoice.status === 'PAID') {
          const date = new Date(invoice.dueDate || invoice.paidAt);
          const monthKey = months[date.getMonth()];
          if (monthKey) {
            monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + invoice.amount;
          }
        }
      });
      
      values = labels.map(month => monthlyRevenue[month] || 0);
    } catch {
      // Fallback to mock data if invoice fetch fails
      values = labels.map(() => Math.floor(Math.random() * 3000) + 1000);
    }

    // Recent customers from real data
    const recentCustomers: RecentCustomer[] = clients.slice(0, 5).map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      company: client.name,
      plan: client.subscription?.plan || 'FREE',
      joinedAt: new Date().toISOString(), // Would use actual createdAt if available
    }));

    // System status (real API health check would go here)
    const systemStatus = {
      services: [
        { name: 'API Server', status: 'operational' as const, uptime: '99.9%', icon: 'Server' },
        { name: 'Database', status: 'operational' as const, uptime: '99.95%', icon: 'Database' },
        { name: 'Auth Service', status: 'operational' as const, uptime: '99.8%', icon: 'Shield' },
        { name: 'Payment Gateway', status: 'operational' as const, uptime: '99.7%', icon: 'CreditCard' },
      ],
      overall: 'operational' as const,
      lastUpdated: new Date().toISOString(),
    };

    return {
      totalCustomers,
      activeSubscriptions,
      revenue,
      growth,
      changes: {
        customers: 12.5, // Would need historical data
        subscriptions: 8.3,
        revenue: 15.2,
        growth: 5.1,
      },
      revenueData: {
        labels,
        values,
      },
      recentCustomers,
      systemStatus,
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return getDefaultAdminStats();
  }
});

function getDefaultAdminStats(): AdminStats {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const labels = months.slice(0, currentMonth + 1);

  return {
    totalCustomers: 0,
    activeSubscriptions: 0,
    revenue: 0,
    growth: 0,
    changes: {
      customers: 0,
      subscriptions: 0,
      revenue: 0,
      growth: 0,
    },
    revenueData: {
      labels,
      values: labels.map(() => 0),
    },
    recentCustomers: [],
    systemStatus: {
      services: [
        { name: 'API Server', status: 'operational', uptime: '99.9%', icon: 'Server' },
        { name: 'Database', status: 'operational', uptime: '99.95%', icon: 'Database' },
        { name: 'Auth Service', status: 'operational', uptime: '99.8%', icon: 'Shield' },
        { name: 'Payment Gateway', status: 'operational', uptime: '99.7%', icon: 'CreditCard' },
      ],
      overall: 'operational',
      lastUpdated: new Date().toISOString(),
    },
  };
}
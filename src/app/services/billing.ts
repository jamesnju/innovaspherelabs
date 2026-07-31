// src/app/services/billing.server.ts
import 'server-only';
import { cache } from 'react';
import { getAuthToken } from './auth.server';
import { 
  Subscription, 
  Plan, 
  Invoice, 
  BillingSummary,
  DashboardStats,
} from '@/src/types/shared.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Fetch current subscription
export async function getCurrentSubscription(): Promise<Subscription | null> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/subscriptions/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch subscription:', response.status);
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

// Fetch available plans
export async function getAvailablePlans(): Promise<Plan[]> {
  try {
    const token = await getAuthToken();
    if (!token) return [];

    const response = await fetch(`${API_URL}/subscriptions/plans`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch plans:', response.status);
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
}

// Fetch invoices
export async function getInvoices(page: number = 1, limit: number = 10): Promise<{ data: Invoice[]; meta: any }> {
  try {
    const token = await getAuthToken();
    if (!token) return { data: [], meta: {} };

    const response = await fetch(`${API_URL}/billing/invoices?page=${page}&limit=${limit}`, {
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

// Fetch billing summary
export async function getBillingSummary(): Promise<BillingSummary | null> {
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

// Fetch dashboard stats
export async function getDashboardStats(): Promise<DashboardStats | null> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/clients/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch dashboard stats:', response.status);
      return null;
    }

    const result = await response.json();
    return result.data?.stats || null;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
}

// Get all billing data for the billing page (Server Component)
export const getBillingData = cache(async () => {
  const [subscription, plans, invoices, summary] = await Promise.all([
    getCurrentSubscription(),
    getAvailablePlans(),
    getInvoices(1, 10),
    getBillingSummary(),
  ]);

  return {
    subscription,
    plans,
    invoices: invoices.data,
    invoiceMeta: invoices.meta,
    summary,
  };
});
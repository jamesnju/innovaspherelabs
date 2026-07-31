// src/app/services/billing.client.ts
'use client';

import { 
  Subscription,
  Plan,
} from '@/src/types/shared.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Update subscription (Client-side)
export async function updateSubscription(data: {
  plan?: string;
  autoRenew?: boolean;
  billingCycle?: string;
  productIds?: string[];
}): Promise<Subscription | null> {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token found');

    const response = await fetch(`${API_URL}/subscriptions/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update subscription');
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

// Upgrade plan (Client-side)
export async function upgradePlan(plan: string): Promise<Subscription | null> {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token found');

    const response = await fetch(`${API_URL}/subscriptions/upgrade`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upgrade plan');
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error upgrading plan:', error);
    throw error;
  }
}

// Get available plans (Client-side)
export async function getAvailablePlansClient(): Promise<Plan[]> {
  try {
    const token = getAuthToken();
    if (!token) return [];

    const response = await fetch(`${API_URL}/subscriptions/plans`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
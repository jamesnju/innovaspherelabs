// src/app/services/auth.server.ts
import 'server-only';
import { cookies } from 'next/headers';
import { User } from '@/src/types/shared.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    if (!token) {
      console.log('No auth token found in cookies');
      return null;
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch user:', response.status, response.statusText);
      return null;
    }

    const result = await response.json();
    
    if (!result || !result.success) {
      console.error('API returned unsuccessful response:', result);
      return null;
    }

    const data = result.data;
    
    if (!data) {
      console.error('No data in API response');
      return null;
    }

    let userData = data.user || data;
    let clientData = data.client || data.user?.client || null;

    if (userData && !clientData) {
      clientData = userData.client || null;
    }

    if (!userData || !userData.id) {
      console.error('Invalid user data received:', userData);
      return null;
    }

    const user: User = {
      id: userData.id,
      name: userData.name || 'Unknown User',
      email: userData.email || '',
      role: userData.role || 'USER',
      status: userData.status || 'ACTIVE',
    };

    if (clientData && clientData.id) {
      user.client = {
        id: clientData.id,
        name: clientData.name || 'Unknown Client',
        email: clientData.email || userData.email || '',
        subscription: clientData.subscription ? {
          id: clientData.subscription.id,
          plan: clientData.subscription.plan || 'FREE',
          status: clientData.subscription.status || 'ACTIVE',
          startDate: clientData.subscription.startDate,
          endDate: clientData.subscription.endDate,
          autoRenew: clientData.subscription.autoRenew,
          trialStart: clientData.subscription.trialStart,
          trialEnd: clientData.subscription.trialEnd,
          billingCycle: clientData.subscription.billingCycle || 'MONTHLY',
          price: clientData.subscription.price || '0',
          currency: clientData.subscription.currency || 'USD',
          features: clientData.subscription.features || [],
          metadata: clientData.subscription.metadata,
          createdAt: clientData.subscription.createdAt,
          updatedAt: clientData.subscription.updatedAt,
          deletedAt: clientData.subscription.deletedAt,
        } : undefined,
      };
      
      user.clientId = clientData.id;
      user.companyId = clientData.id;
    }

    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    return token?.value || null;
  } catch (error) {
    console.error('Get auth token error:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'SUPER_ADMIN';
}
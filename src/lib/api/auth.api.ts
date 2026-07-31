// src/lib/services/auth.ts
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  client?: {
    id: string;
    name: string;
    subscription?: {
      plan: string;
      status: string;
    };
  };
  userPreferences?: {
    theme: string;
    language: string;
  };
}

export interface AuthResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user:', response.status);
      return null;
    }

    const result: AuthResponse = await response.json();
    
    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
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

export async function hasRole(role: string | string[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}

export async function getClient(): Promise<any | null> {
  try {
    const user = await getCurrentUser();
    return user?.client || null;
  } catch (error) {
    console.error('Get client error:', error);
    return null;
  }
}

export async function getSubscription(): Promise<any | null> {
  try {
    const user = await getCurrentUser();
    return user?.client?.subscription || null;
  } catch (error) {
    console.error('Get subscription error:', error);
    return null;
  }
}
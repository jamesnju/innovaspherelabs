// src/lib/services/auth.ts
import { verifyIdToken } from '@/src/lib/firebase/server';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies(); // Add await here
    const token = cookieStore.get('firebase-token');
    
    if (!token) {
      return null;
    }
    
    const decodedToken = await verifyIdToken(token.value);
    return decodedToken;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'super_admin';
}

export async function hasRole(role: string | string[]) {
  const user = await getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}
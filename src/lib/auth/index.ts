// src/lib/auth/index.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import type { Session } from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);

// Define User type for server-side usage
export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'super_admin' | 'business_owner' | 'manager' | 'employee';
  companyId?: string;
  companyName?: string;
  emailVerified?: Date;
}

// Server-side helper to get session
export async function getServerSession(): Promise<Session | null> {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

// Server-side helper to get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await getServerSession();
    return session?.user as AuthUser || null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

// Server-side helper to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

// Server-side helper to check if user is admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'super_admin';
}

// Server-side helper to check if user has specific role
export async function hasRole(role: string | string[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}

// // src/lib/auth/index.ts
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import type { Session } from 'next-auth';

// export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);

// // Define User type for server-side usage
// export interface AuthUser {
//   id: string;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
//   role: 'super_admin' | 'business_owner' | 'manager' | 'employee';
//   companyId?: string;
//   companyName?: string;
//   emailVerified?: Date;
// }

// // Server-side helper to get session
// export async function getServerSession(): Promise<Session | null> {
//   try {
//     const session = await auth();
//     return session;
//   } catch (error) {
//     console.error('Get session error:', error);
//     return null;
//   }
// }

// // Server-side helper to get current user
// export async function getCurrentUser(): Promise<AuthUser | null> {
//   try {
//     const session = await getServerSession();
//     return session?.user as AuthUser || null;
//   } catch (error) {
//     console.error('Get current user error:', error);
//     return null;
//   }
// }

// // Server-side helper to check if user is authenticated
// export async function isAuthenticated(): Promise<boolean> {
//   const user = await getCurrentUser();
//   return !!user;
// }

// // Server-side helper to check if user is admin
// export async function isAdmin(): Promise<boolean> {
//   const user = await getCurrentUser();
//   return user?.role === 'super_admin';
// }

// // Server-side helper to check if user has specific role
// export async function hasRole(role: string | string[]): Promise<boolean> {
//   const user = await getCurrentUser();
//   if (!user) return false;
  
//   if (Array.isArray(role)) {
//     return role.includes(user.role);
//   }
  
//   return user.role === role;
// }
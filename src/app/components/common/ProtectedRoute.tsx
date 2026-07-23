// src/components/common/ProtectedRoute.tsx
'use client';

import { useAuth, useRequireAdmin, useRequireAuth } from '@/src/contexts/AuthContext';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole = 'user',
  fallback 
}: ProtectedRouteProps) {
  const { loading: authLoading } = useAuth();
  
  // Use the appropriate hook based on required role
  const authCheck = requiredRole === 'admin' 
    ? useRequireAdmin() 
    : useRequireAuth();

  // Show loading state
  if (authLoading || authCheck.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-secondary-500 rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (requiredRole === 'admin') {
    // For admin routes, use isAdmin from the hook
    const { isAdmin, isAuthenticated } = authCheck as { isAdmin: boolean; isAuthenticated: boolean; loading: boolean };
    if (!isAuthenticated || !isAdmin) {
      return fallback || null;
    }
  } else {
    // For user routes, use isAuthenticated from the hook
    const { isAuthenticated } = authCheck as { isAuthenticated: boolean; loading: boolean };
    if (!isAuthenticated) {
      return fallback || null;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
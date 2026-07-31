// src/components/common/Layout/DashboardLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Users,
  ShoppingBag,
  Store,
  Package,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Sun,
  Moon,
  Rocket,
  Gift,
  UserCog,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Avatar } from '../../ui/Avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on large screens
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // On mobile, sidebar should be closed by default
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if user is SUPER_ADMIN
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Navigation items based on role
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Subscription', href: '/subscription', icon: Gift },
  ];

  // Add admin-only items
  if (isSuperAdmin) {
    navigation.push(
      { name: 'Clients', href: '/dashboard/clients', icon: Users },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings }
    );
  } else {
    navigation.push(
      { name: 'Team', href: '/dashboard/settings/team', icon: UserCog },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings }
    );
  }

  const handleLogout = async () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Don't show sidebar items for super admin on certain pages
  const showSidebar = !isSuperAdmin || !pathname?.includes('/dashboard/clients');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Menu Button - Always visible */}
      {showSidebar && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-soft border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <>
          {/* Mobile Overlay */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
          )}
          
          <motion.aside
            initial={false}
            animate={{
              x: isSidebarOpen ? 0 : (isMobile ? -280 : -280),
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl ${
              isMobile ? '' : 'lg:translate-x-0'
            }`}
            style={{
              transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              ...(isMobile ? {} : { transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }),
            }}
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg" />
                  <span className="font-bold text-xl text-gray-900 dark:text-white">
                    Dashboard
                  </span>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Launch Apps - Only for non-super admin */}
              {!isSuperAdmin && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="p-3 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl">
                    <div className="flex items-center gap-2 text-white">
                      <Rocket className="h-5 w-5" />
                      <span className="font-medium text-sm">Launch Apps</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <button className="w-full text-left text-xs text-white/80 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10">
                        🚀 POS App
                      </button>
                      <button className="w-full text-left text-xs text-white/80 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10">
                        🛒 E-commerce
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* User Profile */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user?.image}
                    fallback={user?.name?.charAt(0) || 'U'}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user?.role?.toLowerCase() || 'User'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}

      {/* Main Content */}
      <div 
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          showSidebar && isSidebarOpen && !isMobile ? 'lg:ml-64' : ''
        } ${showSidebar && isSidebarOpen && isMobile ? 'opacity-50' : ''}`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Spacer for menu button on large screens */}
              {showSidebar && <div className="w-12 lg:hidden" />}
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isSuperAdmin ? 'Admin Dashboard' : 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <Avatar
                  src={user?.image}
                  fallback={user?.name?.charAt(0) || 'U'}
                  size="sm"
                />
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname || 'page'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
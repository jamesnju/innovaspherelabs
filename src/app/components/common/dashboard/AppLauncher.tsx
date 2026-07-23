// src/components/dashboard/AppLauncher.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Store, 
  Package, 
  Coffee,
  GraduationCap,
  Users,
  ArrowRight
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  status: 'active' | 'coming_soon';
  color: string;
}

interface AppLauncherProps {
  apps: App[];
}

export function AppLauncher({ apps }: AppLauncherProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'pos':
        return <ShoppingBag className="h-6 w-6" />;
      case 'ecommerce':
        return <Store className="h-6 w-6" />;
      case 'inventory':
        return <Package className="h-6 w-6" />;
      case 'restaurant':
        return <Coffee className="h-6 w-6" />;
      case 'school':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Launch
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Access your applications
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {app.status === 'active' ? (
              <Link
                href={app.url}
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: app.color }}
                  >
                    {getIcon(app.id)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {app.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-secondary-500 transition-colors" />
              </Link>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 opacity-60">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white opacity-50"
                    style={{ backgroundColor: app.color }}
                  >
                    {getIcon(app.id)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {app.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
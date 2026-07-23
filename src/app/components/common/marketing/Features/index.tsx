// src/components/marketing/Features/index.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Store, 
  Package, 
  Shield, 
  Zap, 
  BarChart3,
  Users,
  Cloud
} from 'lucide-react';

const features = [
  {
    icon: ShoppingBag,
    title: 'POS System',
    description: 'Powerful point of sale system with offline capability and real-time sync.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Store,
    title: 'E-commerce',
    description: 'Build and manage your online store with ease. Sell anywhere, anytime.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels, manage suppliers, and automate reordering.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.99% uptime and data encryption.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with offline-first architecture and instant sync.',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights and reports to make data-driven decisions.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Users,
    title: 'Multi-User Support',
    description: 'Role-based access for your team members and employees.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Seamless synchronization across all your devices and locations.',
    color: 'from-sky-500 to-blue-500',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powerful features designed to help you manage and scale your business efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary-500/0 to-accent-500/0 group-hover:from-secondary-500/5 group-hover:to-accent-500/5 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
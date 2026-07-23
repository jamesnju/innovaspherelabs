// src/components/marketing/Products/ProductGrid.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Store, Package, Coffee, GraduationCap, Users } from 'lucide-react';
import { Button } from '../../../ui/Button';
import type { Product as ProductType } from '../../../../services/products';

// Import the Product type from services

// Map icon strings to components
const iconMap: Record<string, React.ReactNode> = {
  'pos': <ShoppingBag className="h-6 w-6" />,
  'ecommerce': <Store className="h-6 w-6" />,
  'inventory': <Package className="h-6 w-6" />,
  'restaurant': <Coffee className="h-6 w-6" />,
  'school': <GraduationCap className="h-6 w-6" />,
  'crm': <Users className="h-6 w-6" />,
};

const colorMap: Record<string, string> = {
  'pos': 'from-blue-500 to-indigo-500',
  'ecommerce': 'from-amber-500 to-orange-500',
  'inventory': 'from-emerald-500 to-green-500',
  'restaurant': 'from-rose-500 to-red-500',
  'school': 'from-violet-500 to-purple-500',
  'crm': 'from-cyan-500 to-blue-500',
};

interface ProductGridProps {
  products: ProductType[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return <Package className="h-6 w-6" />;
    return iconMap[iconName] || <Package className="h-6 w-6" />;
  };

  const getColor = (iconName?: string) => {
    if (!iconName) return 'from-gray-500 to-gray-600';
    return colorMap[iconName] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-6">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${getColor(product.icon)} flex items-center justify-center mb-4`}>
              <div className="text-white">{getIcon(product.icon)}</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
            {product.price && (
              <p className="text-sm font-medium text-secondary-500 mb-4">
                Starting from {product.price}
              </p>
            )}
            <ul className="space-y-2 mb-6">
              {product.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={`/products/${product.slug}`}>
              <Button variant="outline" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
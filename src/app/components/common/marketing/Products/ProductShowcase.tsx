// src/components/marketing/Products/ProductShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Store, Package, Coffee, GraduationCap, Users } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Product } from '@/src/app/services/products';

interface ProductShowcaseProps {
  products?: Product[];
}

const iconMap: Record<string, React.ReactNode> = {
  'pos': <ShoppingBag className="h-8 w-8" />,
  'ecommerce': <Store className="h-8 w-8" />,
  'inventory': <Package className="h-8 w-8" />,
  'restaurant': <Coffee className="h-8 w-8" />,
  'school': <GraduationCap className="h-8 w-8" />,
  'crm': <Users className="h-8 w-8" />,
};

const colorMap: Record<string, string> = {
  'pos': 'from-blue-500 to-indigo-500',
  'ecommerce': 'from-amber-500 to-orange-500',
  'inventory': 'from-emerald-500 to-green-500',
  'restaurant': 'from-rose-500 to-red-500',
  'school': 'from-violet-500 to-purple-500',
  'crm': 'from-cyan-500 to-blue-500',
};

const defaultProducts: Product[] = [
  {
    id: 'pos',
    name: 'POS System',
    description: 'Powerful point of sale system with offline capability and real-time sync.',
    slug: 'pos',
    category: 'Point of Sale',
    icon: 'pos',
    // color: 'from-blue-500 to-indigo-500',
    features: ['Offline mode', 'Real-time sync', 'Inventory tracking', 'Sales reports'],
    price: '$29/mo',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Build and manage your online store with ease.',
    slug: 'ecommerce',
    category: 'E-commerce',
    icon: 'ecommerce',
    // color: 'from-amber-500 to-orange-500',
    features: ['Online store', 'Payment gateways', 'Order management', 'Customer analytics'],
    price: '$29/mo',
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    description: 'Track stock levels, manage suppliers, and automate reordering.',
    slug: 'inventory',
    category: 'Inventory',
    icon: 'inventory',
    // color: 'from-emerald-500 to-green-500',
    features: ['Stock tracking', 'Supplier management', 'Auto-reorder', 'Reports'],
    price: '$19/mo',
  },
];

export function ProductShowcase({ products = defaultProducts }: ProductShowcaseProps) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return <Package className="h-8 w-8" />;
    return iconMap[iconName] || <Package className="h-8 w-8" />;
  };

  const getColor = (iconName?: string) => {
    if (!iconName) return 'from-gray-500 to-gray-600';
    return colorMap[iconName] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Products</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the right solution for your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-950 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
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

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="primary" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
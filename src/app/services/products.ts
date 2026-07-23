// src/lib/services/products.ts
import { cache } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  slug: string;
  category: string;
  image?: string;
  price?: string;
  features: string[];
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mock products with icons and colors
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'POS System',
    description: 'Powerful point of sale system with offline capability',
    longDescription: 'Complete POS solution for retail businesses with offline mode, inventory tracking, and real-time syncing.',
    slug: 'pos',
    category: 'Point of Sale',
    price: '$29/mo',
    icon: 'pos',
    color: 'from-blue-500 to-indigo-500',
    features: ['Offline mode', 'Real-time sync', 'Inventory tracking', 'Sales reports', 'Multi-branch support'],
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Build and manage your online store with ease',
    longDescription: 'Full-featured e-commerce platform with payment gateways, order management, and customer analytics.',
    slug: 'ecommerce',
    category: 'E-commerce',
    price: '$29/mo',
    icon: 'ecommerce',
    color: 'from-amber-500 to-orange-500',
    features: ['Online store', 'Payment gateways', 'Order management', 'Customer analytics', 'SEO optimized'],
  },
  {
    id: '3',
    name: 'Inventory Management',
    description: 'Track stock levels, manage suppliers, and automate reordering',
    longDescription: 'Comprehensive inventory management system with barcode scanning, low stock alerts, and supplier management.',
    slug: 'inventory',
    category: 'Inventory',
    price: '$19/mo',
    icon: 'inventory',
    color: 'from-emerald-500 to-green-500',
    features: ['Stock tracking', 'Supplier management', 'Auto-reorder', 'Barcode scanning', 'Reports'],
  },
];

export const getAllProducts = cache(async (): Promise<Product[]> => {
  // In production, fetch from database
  return mockProducts;
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const product = mockProducts.find(p => p.slug === slug);
  return product || null;
});

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  return mockProducts.slice(0, 3);
});

export const getRelatedProducts = cache(async (productId: string, category: string): Promise<Product[]> => {
  return mockProducts.filter(p => p.id !== productId && p.category === category);
});
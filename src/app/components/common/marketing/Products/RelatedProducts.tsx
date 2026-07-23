// src/components/marketing/Products/RelatedProducts.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface RelatedProduct {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Products
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 hover:shadow-hard transition-all duration-300"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
            <Link href={`/products/${product.slug}`}>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
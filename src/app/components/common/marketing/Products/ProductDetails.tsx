// src/components/marketing/Products/ProductDetails.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    features: string[];
    image?: string;
    price?: string;
    slug: string;
    category: string;
  };
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
            </div>
            {product.price && (
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                <p className="text-2xl font-bold text-secondary-500">{product.price}</p>
              </div>
            )}
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {product.longDescription || product.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Get Started
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Ready to transform your business with {product.name}?
              </p>
              <Link href="/signup">
                <Button className="w-full btn-primary">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
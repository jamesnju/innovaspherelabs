// src/lib/services/pricing.ts
import { cache } from 'react';

export const getPricingPlans = cache(async () => {
  return [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Basic POS System',
        'Up to 10 Products',
        '1 User',
        'Basic Reports',
        'Email Support',
      ],
      isPopular: false,
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Great for small businesses',
      price: 29,
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Full POS System',
        'Unlimited Products',
        'Up to 5 Users',
        'Advanced Reports',
        'Inventory Management',
        'Email & Chat Support',
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For growing businesses',
      price: 49,
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Full POS System',
        'E-commerce Platform',
        'Unlimited Products',
        'Unlimited Users',
        'Advanced Analytics',
        'Inventory Management',
        'Offline Mode',
        'Priority Support',
        'API Access',
      ],
      isPopular: false,
    },
  ];
});

export const getFAQ = cache(async () => {
  return [
    {
      id: '1',
      question: 'What is Multi-SaaS Platform?',
      answer: 'Multi-SaaS Platform is an all-in-one business management solution that provides POS, E-commerce, and Inventory management tools in a single ecosystem. It helps businesses streamline their operations and grow efficiently.',
    },
    {
      id: '2',
      question: 'Can I use the POS system offline?',
      answer: 'Yes! Our POS system supports offline mode. All sales data is stored locally and automatically syncs when the internet connection is restored, ensuring you never miss a sale.',
    },
    {
      id: '3',
      question: 'How does the subscription work?',
      answer: 'We offer flexible monthly and yearly subscription plans. You can start with a free plan and upgrade as your business grows. All plans include access to core features with different limits.',
    },
    {
      id: '4',
      question: 'Can I switch between plans?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate your billing accordingly.',
    },
    {
      id: '5',
      question: 'Is my data secure?',
      answer: 'Yes, we take security seriously. All data is encrypted both in transit and at rest. We use Firebase Authentication for secure access and implement strict role-based permissions.',
    },
    {
      id: '6',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and M-Pesa (for Kenyan customers). All payments are processed securely through our payment partners.',
    },
  ];
});
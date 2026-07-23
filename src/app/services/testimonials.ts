// src/lib/services/testimonials.ts
import { cache } from 'react';

export const getTestimonials = cache(async () => {
  return [
    {
      id: '1',
      name: 'John Smith',
      role: 'CEO, ABC Retail',
      content: 'Multi-SaaS Platform has completely transformed how we manage our business. The POS system is intuitive, and the offline capability is a game-changer.',
      avatar: '/images/testimonials/john-smith.jpg',
      rating: 5,
      company: 'ABC Retail',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Owner, Sarah\'s Boutique',
      content: 'The e-commerce integration was seamless. We went from in-store only to a thriving online presence in just a few days.',
      avatar: '/images/testimonials/sarah-johnson.jpg',
      rating: 5,
      company: 'Sarah\'s Boutique',
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'Operations Manager, TechHub',
      content: 'The inventory management features have saved us countless hours. Everything is synchronized across our multiple locations.',
      avatar: '/images/testimonials/mike-chen.jpg',
      rating: 5,
      company: 'TechHub',
    },
  ];
});
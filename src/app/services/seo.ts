// src/lib/services/seo.ts
import { db } from '@/src/lib/firebase/admin';
import { cache } from 'react';

interface ProductSEO {
  id: string;
  slug: string;
  updatedAt: string;
  [key: string]: any;
}

interface BlogPostSEO {
  slug: string;
  publishedAt: string;
  updatedAt: string;
}

export const getAllProducts = cache(async (): Promise<ProductSEO[]> => {
  try {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductSEO[];
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
});

export const getAllBlogPosts = cache(async (): Promise<BlogPostSEO[]> => {
  // In production, fetch from database
  // For now, return mock data
  return [
    {
      slug: '10-tips-grow-business-pos-systems',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      slug: 'future-ecommerce-2024',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      slug: 'inventory-management-best-practices',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
});
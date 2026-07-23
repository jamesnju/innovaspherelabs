// src/app/sitemap.ts
// import { getAllProducts, getAllBlogPosts } from '@/lib/services/seo';

import { getAllBlogPosts, getAllProducts } from "./services/seo";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const products = await getAllProducts();
  const blogPosts = await getAllBlogPosts();
  
  const staticRoutes = [
    '',
    '/products',
    '/pricing',
    '/about',
    '/contact',
    '/blog',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  const productRoutes = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
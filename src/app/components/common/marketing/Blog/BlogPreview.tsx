// src/components/marketing/Blog/BlogPreview.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
}

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips to Grow Your Business with POS Systems',
    excerpt: 'Learn how modern POS systems can transform your business operations and boost sales.',
    coverImage: '/images/blog/pos-tips.jpg',
    slug: '10-tips-grow-business-pos-systems',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 5,
    author: {
      name: 'John Doe',
      avatar: '/images/avatars/john-doe.jpg',
    },
    category: 'Business Tips',
  },
  {
    id: '2',
    title: 'The Future of E-commerce in 2024',
    excerpt: 'Discover the latest trends and technologies shaping the future of online retail.',
    coverImage: '/images/blog/ecommerce-future.jpg',
    slug: 'future-ecommerce-2024',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 7,
    author: {
      name: 'Jane Smith',
      avatar: '/images/avatars/jane-smith.jpg',
    },
    category: 'E-commerce',
  },
  {
    id: '3',
    title: 'Inventory Management Best Practices',
    excerpt: 'Optimize your inventory management to reduce costs and improve efficiency.',
    coverImage: '/images/blog/inventory-management.jpg',
    slug: 'inventory-management-best-practices',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 6,
    author: {
      name: 'Mike Johnson',
      avatar: '/images/avatars/mike-johnson.jpg',
    },
    category: 'Inventory',
  },
];

export function BlogPreview({ posts = defaultPosts }: BlogPreviewProps) {
  const displayedPosts = posts.slice(0, 3);

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
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Expert advice and strategies to grow your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-hard hover:-translate-y-1">
                  <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
                    {/* Use the actual coverImage */}
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-3 left-3">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="primary" size="lg">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

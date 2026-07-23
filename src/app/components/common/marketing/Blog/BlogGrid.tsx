// src/components/marketing/Blog/BlogGrid.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '../../../ui/Badge';

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

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-hard hover:-translate-y-1">
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3">
                  {post.category}
                </Badge>
              </div>

              {/* Content */}
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

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Author
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
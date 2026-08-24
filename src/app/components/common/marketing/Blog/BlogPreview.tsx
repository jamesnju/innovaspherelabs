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
    title: 'How to Turn a Business Idea Into a Software Product',
    excerpt:
      'A practical guide to validating your idea, defining requirements and planning your first digital product.',
    coverImage: '/images/blog/software-product.jpg',
    slug: 'turn-business-idea-into-software-product',
    publishedAt: '2026-08-20T00:00:00.000Z',
    readTime: 7,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/james.jpg',
    },
    category: 'Software Development',
  },
  {
    id: '2',
    title: 'Web App vs Mobile App: Which Should Your Business Build?',
    excerpt:
      'Understand the differences between web applications, PWAs and mobile apps before investing in development.',
    coverImage: '/images/blog/web-vs-mobile.jpg',
    slug: 'web-app-vs-mobile-app',
    publishedAt: '2026-08-15T00:00:00.000Z',
    readTime: 6,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/john.jpg',
    },
    category: 'Technology',
  },
  {
    id: '3',
    title: 'How Custom Software Can Improve Business Operations',
    excerpt:
      'Explore how custom software can automate repetitive work, improve visibility and help businesses scale.',
    coverImage: '/images/blog/custom-software.jpg',
    slug: 'custom-software-business-operations',
    publishedAt: '2026-08-10T00:00:00.000Z',
    readTime: 5,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/james.jpg',
    },
    category: 'Business Technology',
  },
];

export function BlogPreview({ posts = defaultPosts }: BlogPreviewProps) {
  const displayedPosts = posts.slice(0, 3);

  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-2 text-sm font-semibold text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
            Savo Insights
          </div>

          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            Ideas, technology &{' '}
            <span className="gradient-text">business insights</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practical insights to help you understand technology, build better
            products and grow your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950">
                  <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <Badge className="absolute left-4 top-4">
                      {post.category}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-secondary-500 dark:text-white">
                      {post.title}
                    </h3>

                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-500 transition-all group-hover:gap-3">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="primary" size="lg">
              Explore All Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// // src/components/marketing/Blog/BlogPreview.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Calendar, Clock, ArrowRight } from 'lucide-react';
// import { Badge } from '../../../ui/Badge';
// import { Button } from '../../../ui/Button';

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   coverImage: string;
//   slug: string;
//   publishedAt: string;
//   readTime: number;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   category: string;
// }

// interface BlogPreviewProps {
//   posts?: BlogPost[];
// }

// const defaultPosts: BlogPost[] = [
//   {
//     id: '1',
//     title: '10 Tips to Grow Your Business with POS Systems',
//     excerpt: 'Learn how modern POS systems can transform your business operations and boost sales.',
//     coverImage: '/images/blog/pos-tips.jpg',
//     slug: '10-tips-grow-business-pos-systems',
//     publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 5,
//     author: {
//       name: 'John Doe',
//       avatar: '/images/avatars/john-doe.jpg',
//     },
//     category: 'Business Tips',
//   },
//   {
//     id: '2',
//     title: 'The Future of E-commerce in 2024',
//     excerpt: 'Discover the latest trends and technologies shaping the future of online retail.',
//     coverImage: '/images/blog/ecommerce-future.jpg',
//     slug: 'future-ecommerce-2024',
//     publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 7,
//     author: {
//       name: 'Jane Smith',
//       avatar: '/images/avatars/jane-smith.jpg',
//     },
//     category: 'E-commerce',
//   },
//   {
//     id: '3',
//     title: 'Inventory Management Best Practices',
//     excerpt: 'Optimize your inventory management to reduce costs and improve efficiency.',
//     coverImage: '/images/blog/inventory-management.jpg',
//     slug: 'inventory-management-best-practices',
//     publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 6,
//     author: {
//       name: 'Mike Johnson',
//       avatar: '/images/avatars/mike-johnson.jpg',
//     },
//     category: 'Inventory',
//   },
// ];

// export function BlogPreview({ posts = defaultPosts }: BlogPreviewProps) {
//   const displayedPosts = posts.slice(0, 3);

//   return (
//     <section className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Latest <span className="gradient-text">Insights</span>
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             Expert advice and strategies to grow your business
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {displayedPosts.map((post, index) => (
//             <motion.article
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="group"
//             >
//               <Link href={`/blog/${post.slug}`}>
//                 <div className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-hard hover:-translate-y-1">
//                   <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
//                     {/* Use the actual coverImage */}
//                     <Image
//                       src={post.coverImage}
//                       alt={post.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     <Badge className="absolute top-3 left-3">
//                       {post.category}
//                     </Badge>
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="h-3 w-3" />
//                         {new Date(post.publishedAt).toLocaleDateString()}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {post.readTime} min read
//                       </span>
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary-500 transition-colors">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
//                       {post.excerpt}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </motion.article>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link href="/blog">
//             <Button variant="primary" size="lg">
//               View All Articles
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

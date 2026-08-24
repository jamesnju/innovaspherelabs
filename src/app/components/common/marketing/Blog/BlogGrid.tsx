// src/app/components/common/marketing/Blog/BlogGrid.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Badge } from '../../../ui/Badge';
import { BlogPost } from '../../../../services/blog';

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -6 }}
          className="group"
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    💡
                  </div>
                )}

                <Badge className="absolute left-4 top-4">
                  {post.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
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

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-secondary-500 dark:text-white">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>

                {/* Author + Arrow */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      {post.author.avatar ? (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {post.author.name}
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-secondary-500" />
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

// // src/components/marketing/Blog/BlogGrid.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Calendar, Clock, User } from 'lucide-react';
// import { Badge } from '../../../ui/Badge';

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

// interface BlogGridProps {
//   posts: BlogPost[];
// }

// export function BlogGrid({ posts }: BlogGridProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {posts.map((post, index) => (
//         <motion.article
//           key={post.id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           className="group"
//         >
//           <Link href={`/blog/${post.slug}`}>
//             <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-hard hover:-translate-y-1">
//               {/* Cover Image */}
//               <div className="relative aspect-video overflow-hidden">
//                 <Image
//                   src={post.coverImage}
//                   alt={post.title}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <Badge className="absolute top-3 left-3">
//                   {post.category}
//                 </Badge>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
//                   <span className="flex items-center gap-1">
//                     <Calendar className="h-3 w-3" />
//                     {new Date(post.publishedAt).toLocaleDateString()}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Clock className="h-3 w-3" />
//                     {post.readTime} min read
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary-500 transition-colors">
//                   {post.title}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
//                   {post.excerpt}
//                 </p>

//                 <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
//                   <div className="relative w-8 h-8 rounded-full overflow-hidden">
//                     <Image
//                       src={post.author.avatar}
//                       alt={post.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">
//                       {post.author.name}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Author
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </motion.article>
//       ))}
//     </div>
//   );
// }
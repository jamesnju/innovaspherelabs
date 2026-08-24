// src/components/marketing/Blog/BlogPost.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';
import { BlogPost as BlogPostType } from '../../../../services/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  const content = post.content || '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
    >
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-secondary-500 dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Insights
      </Link>

      <header className="mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <Badge>{post.category}</Badge>

          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} min read
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl md:leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="m-auto h-5 w-5" />
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Savo Insights
            </p>
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            💡
          </div>
        )}
      </div>

      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-secondary-500 prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-14 rounded-3xl bg-gradient-to-r from-secondary-500 to-accent-500 p-8 text-center text-white md:p-12">
        <h2 className="mb-3 text-2xl font-bold md:text-3xl">
          Have a software idea?
        </h2>

        <p className="mx-auto mb-6 max-w-2xl text-white/80">
          You don't need to have everything figured out. Talk to Savo and
          let's explore what we can build together.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
        >
          Book a Free Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

// // src/components/marketing/Blog/BlogPost.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
// import { Badge } from '../../../ui/Badge';
// import { Button } from '../../../ui/Button';
// // import type { BlogPost as BlogPostType } from '@/services/blog';
// import {  BlogPost as BlogPostType} from '../../../../services/blog';


// interface BlogPostProps {
//   post: BlogPostType; // Use the imported type
// }

// export function BlogPost({ post }: BlogPostProps) {
//   // Ensure content is always a string
//   const content = post.content || '';

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-4xl mx-auto"
//     >
//       {/* Back Button */}
//       <Link
//         href="/blog"
//         className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-8"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Blog
//       </Link>

//       {/* Header */}
//       <header className="mb-8">
//         <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
//           <Badge>{post.category}</Badge>
//           <span className="flex items-center gap-1">
//             <Calendar className="h-3 w-3" />
//             {new Date(post.publishedAt).toLocaleDateString()}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock className="h-3 w-3" />
//             {post.readTime} min read
//           </span>
//         </div>

//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//           {post.title}
//         </h1>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
//               {post.author.avatar ? (
//                 <Image
//                   src={post.author.avatar}
//                   alt={post.author.name}
//                   fill
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
//                   <User className="h-5 w-5" />
//                 </div>
//               )}
//             </div>
//             <div>
//               <p className="font-medium text-gray-900 dark:text-white">
//                 {post.author.name}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {post.author.bio || 'Author'}
//               </p>
//             </div>
//           </div>
//           <Button variant="outline" size="sm">
//             <Share2 className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </header>

//       {/* Cover Image */}
//       <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-200 dark:bg-gray-800">
//         {post.coverImage ? (
//           <Image
//             src={post.coverImage}
//             alt={post.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
//             <span className="text-6xl">📝</span>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div 
//         className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-secondary-500 prose-img:rounded-xl"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {/* Tags */}
//       {post.tags && post.tags.length > 0 && (
//         <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
//           <div className="flex flex-wrap gap-2">
//             {post.tags.map((tag) => (
//               <Badge key={tag} variant="secondary">
//                 #{tag}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.article>
//   );
// }
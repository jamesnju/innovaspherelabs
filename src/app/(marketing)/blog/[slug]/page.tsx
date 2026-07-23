// src/app/(marketing)/blog/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/src/app/components/common/marketing/Blog/BlogPost';
import { getBlogPostBySlug } from '@/src/app/services/blog';

interface Props {
  params: Promise<{ slug: string }>; // Changed to Promise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params Promise
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  // Await the params Promise
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container-custom section-spacing">
      <BlogPost post={post} />
    </div>
  );
}
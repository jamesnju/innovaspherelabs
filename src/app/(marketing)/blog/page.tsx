// src/app/(marketing)/blog/page.tsx
import { Metadata } from 'next';
import { BlogGrid } from '../../components/common/marketing/Blog/BlogGrid';
import { getBlogPosts } from '../../services/blog';

export const metadata: Metadata = {
  title: 'Blog - Business Insights & Tips',
  description: 'Stay updated with the latest business trends, tips, and insights from industry experts.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container-custom section-spacing">
      <div className="text-center mb-12">
        <h1 className="section-title mb-4">
          <span className="gradient-text">Insights</span> & Resources
        </h1>
        <p className="section-subtitle">
          Expert advice and strategies to grow your business
        </p>
      </div>
      <BlogGrid posts={posts} />
    </div>
  );
}
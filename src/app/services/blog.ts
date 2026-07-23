// src/lib/services/blog.ts
import { cache } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  tags?: string[];
}

// Mock blog posts data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips to Grow Your Business with POS Systems',
    excerpt: 'Learn how modern POS systems can transform your business operations and boost sales.',
        content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`,
    coverImage: '/images/blog/pos-tips.jpg',
    slug: '10-tips-grow-business-pos-systems',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 5,
    author: {
      name: 'John Doe',
      avatar: '/images/avatars/john-doe.jpg',
      bio: 'Expert in business management and technology solutions.',
    },
    category: 'Business Tips',
    tags: ['business', 'growth', 'pos'],
  },
  {
    id: '2',
    title: 'The Future of E-commerce in 2024',
    excerpt: 'Discover the latest trends and technologies shaping the future of online retail.',
        content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, 

    coverImage: '/images/blog/ecommerce-future.jpg',
    slug: 'future-ecommerce-2024',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 7,
    author: {
      name: 'Jane Smith',
      avatar: '/images/avatars/jane-smith.jpg',
      bio: 'E-commerce strategist and digital marketing expert.',
    },
    category: 'E-commerce',
    tags: ['ecommerce', 'trends', 'technology'],
  },
  {
    id: '3',
    title: 'Inventory Management Best Practices',
    excerpt: 'Optimize your inventory management to reduce costs and improve efficiency.',
        content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, // Add content

    coverImage: '/images/blog/inventory-management.jpg',
    slug: 'inventory-management-best-practices',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 6,
    author: {
      name: 'Mike Johnson',
      avatar: '/images/avatars/mike-johnson.jpg',
      bio: 'Supply chain management specialist.',
    },
    category: 'Inventory',
    tags: ['inventory', 'management', 'optimization'],
  },
  {
    id: '4',
    title: 'Why Offline POS is a Game Changer for Retail',
    excerpt: 'Understand the benefits of offline POS systems for retail businesses.',
        content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, // Add content

    coverImage: '/images/blog/offline-pos.jpeg',
    slug: 'offline-pos-game-changer-retail',
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 4,
    author: {
      name: 'Sarah Wilson',
      avatar: '/images/avatars/sarah-wilson.jpg',
      bio: 'Retail technology consultant.',
    },
    category: 'POS',
    tags: ['pos', 'offline', 'retail'],
  },
];

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  // In production, fetch from database
  // For now, return mock data
  return mockPosts;
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  // In production, fetch from database
  // For now, return mock data
  const post = mockPosts.find(p => p.slug === slug);
  
  if (!post) {
    return null;
  }

  // Add full content for single post view
  return {
    ...post,
    content: `
      <h2>Introduction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Key Takeaways</h2>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco</li>
      </ul>
      
      <h3>Main Section</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>Conclusion</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    `,
  };
});

export const getBlogPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
});

export const getFeaturedBlogPosts = cache(async (limit: number = 3): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
});

export const getRecentBlogPosts = cache(async (limit: number = 5): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
});

export const getBlogPostTags = cache(async (): Promise<string[]> => {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});
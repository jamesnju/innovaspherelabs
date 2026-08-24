// src/services/blog.ts

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  author: BlogAuthor;
  category: string;
  tags?: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Turn a Business Idea Into a Software Product',
    excerpt:
      'A practical guide to validating your idea, defining requirements and planning your first digital product.',
    content: `
      <p>
        Turning a business idea into a software product starts with understanding
        the problem you are trying to solve.
      </p>

      <h2>1. Start With the Problem</h2>

      <p>
        Before building software, clearly identify the problem your customers
        are experiencing. Good software solves a real business problem.
      </p>

      <h2>2. Validate Your Idea</h2>

      <p>
        Talk to potential customers and understand how they currently solve
        the problem. This helps you determine whether your idea is worth
        developing.
      </p>

      <h2>3. Define the Requirements</h2>

      <p>
        Create a clear list of features and requirements. Start with the
        most important functionality instead of trying to build everything
        at once.
      </p>

      <h2>4. Build an MVP</h2>

      <p>
        A minimum viable product allows you to launch faster, collect feedback
        and improve the product based on real user needs.
      </p>

      <h2>5. Keep Improving</h2>

      <p>
        Software development is an ongoing process. Use customer feedback,
        analytics and business results to continuously improve your product.
      </p>
    `,
    coverImage: '/images/blog/software-product.jpg',
    slug: 'turn-business-idea-into-software-product',
    publishedAt: '2026-08-20T00:00:00.000Z',
    readTime: 7,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/james.jpg',
    },
    category: 'Software Development',
    tags: ['Software Development', 'Business', 'MVP'],
  },

  {
    id: '2',
    title: 'Web App vs Mobile App: Which Should Your Business Build?',
    excerpt:
      'Understand the differences between web applications, PWAs and mobile apps before investing in development.',
    content: `
      <p>
        Choosing between a web application and a mobile application depends
        on your business goals, target users and required functionality.
      </p>

      <h2>Web Applications</h2>

      <p>
        Web applications can be accessed through a browser and are usually
        easier to deploy and maintain across multiple devices.
      </p>

      <h2>Mobile Applications</h2>

      <p>
        Mobile applications provide deeper integration with device features
        such as notifications, cameras, GPS and offline capabilities.
      </p>

      <h2>Which Should You Choose?</h2>

      <p>
        For many businesses, starting with a responsive web application can
        be a cost-effective way to validate the product before investing in
        native mobile applications.
      </p>
    `,
    coverImage: '/images/blog/web-vs-mobile.jpg',
    slug: 'web-app-vs-mobile-app',
    publishedAt: '2026-08-15T00:00:00.000Z',
    readTime: 6,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/victor.jpg',
    },
    category: 'Technology',
    tags: ['Web Apps', 'Mobile Apps', 'Technology'],
  },

  {
    id: '3',
    title: 'How Custom Software Can Improve Business Operations',
    excerpt:
      'Explore how custom software can automate repetitive work, improve visibility and help businesses scale.',
    content: `
      <p>
        Custom software can help businesses automate repetitive processes,
        reduce manual errors and provide better visibility into operations.
      </p>

      <h2>Automation</h2>

      <p>
        Businesses can automate repetitive tasks such as reporting,
        reconciliation, notifications and data processing.
      </p>

      <h2>Better Visibility</h2>

      <p>
        Centralized software gives teams access to accurate information
        and real-time reports.
      </p>

      <h2>Scalability</h2>

      <p>
        Custom systems can be designed around your business processes and
        expanded as the business grows.
      </p>
    `,
    coverImage: '/images/blog/custom-software.jpg',
    slug: 'custom-software-business-operations',
    publishedAt: '2026-08-10T00:00:00.000Z',
    readTime: 5,
    author: {
      name: 'Savo Team',
      avatar: '/images/team/james.jpg',
    },
    category: 'Business Technology',
    tags: ['Custom Software', 'Automation', 'Business'],
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const post = blogPosts.find(
    (post) => post.slug.toLowerCase() === slug.toLowerCase()
  );

  return post ?? null;
}// // src/lib/services/blog.ts7


// import { cache } from 'react';

// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   coverImage: string;
//   slug: string;
//   publishedAt: string;
//   readTime: number;
//   author: {
//     name: string;
//     avatar: string;
//     bio?: string;
//   };
//   category: string;
//   tags?: string[];
// }

// // Mock blog posts data
// const mockPosts: BlogPost[] = [
//   {
//     id: '1',
//     title: '10 Tips to Grow Your Business with POS Systems',
//     excerpt: 'Learn how modern POS systems can transform your business operations and boost sales.',
//         content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`,
//     coverImage: '/images/blog/pos-tips.jpg',
//     slug: '10-tips-grow-business-pos-systems',
//     publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 5,
//     author: {
//       name: 'John Doe',
//       avatar: '/images/avatars/john-doe.jpg',
//       bio: 'Expert in business management and technology solutions.',
//     },
//     category: 'Business Tips',
//     tags: ['business', 'growth', 'pos'],
//   },
//   {
//     id: '2',
//     title: 'The Future of E-commerce in 2024',
//     excerpt: 'Discover the latest trends and technologies shaping the future of online retail.',
//         content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, 

//     coverImage: '/images/blog/ecommerce-future.jpg',
//     slug: 'future-ecommerce-2024',
//     publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 7,
//     author: {
//       name: 'Jane Smith',
//       avatar: '/images/avatars/jane-smith.jpg',
//       bio: 'E-commerce strategist and digital marketing expert.',
//     },
//     category: 'E-commerce',
//     tags: ['ecommerce', 'trends', 'technology'],
//   },
//   {
//     id: '3',
//     title: 'Inventory Management Best Practices',
//     excerpt: 'Optimize your inventory management to reduce costs and improve efficiency.',
//         content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, // Add content

//     coverImage: '/images/blog/inventory-management.jpg',
//     slug: 'inventory-management-best-practices',
//     publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 6,
//     author: {
//       name: 'Mike Johnson',
//       avatar: '/images/avatars/mike-johnson.jpg',
//       bio: 'Supply chain management specialist.',
//     },
//     category: 'Inventory',
//     tags: ['inventory', 'management', 'optimization'],
//   },
//   {
//     id: '4',
//     title: 'Why Offline POS is a Game Changer for Retail',
//     excerpt: 'Understand the benefits of offline POS systems for retail businesses.',
//         content: `<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>`, // Add content

//     coverImage: '/images/blog/offline-pos.jpeg',
//     slug: 'offline-pos-game-changer-retail',
//     publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
//     readTime: 4,
//     author: {
//       name: 'Sarah Wilson',
//       avatar: '/images/avatars/sarah-wilson.jpg',
//       bio: 'Retail technology consultant.',
//     },
//     category: 'POS',
//     tags: ['pos', 'offline', 'retail'],
//   },
// ];

// export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
//   // In production, fetch from database
//   // For now, return mock data
//   return mockPosts;
// });

// export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
//   // In production, fetch from database
//   // For now, return mock data
//   const post = mockPosts.find(p => p.slug === slug);
  
//   if (!post) {
//     return null;
//   }

//   // Add full content for single post view
//   return {
//     ...post,
//     content: `
//       <h2>Introduction</h2>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//       <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
//       <h2>Key Takeaways</h2>
//       <ul>
//         <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
//         <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
//         <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco</li>
//       </ul>
      
//       <h3>Main Section</h3>
//       <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//       <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
//       <h3>Conclusion</h3>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//     `,
//   };
// });

// export const getBlogPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
//   const posts = await getBlogPosts();
//   return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
// });

// export const getFeaturedBlogPosts = cache(async (limit: number = 3): Promise<BlogPost[]> => {
//   const posts = await getBlogPosts();
//   return posts.slice(0, limit);
// });

// export const getRecentBlogPosts = cache(async (limit: number = 5): Promise<BlogPost[]> => {
//   const posts = await getBlogPosts();
//   return posts.sort((a, b) => 
//     new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
//   ).slice(0, limit);
// });

// export const getBlogPostTags = cache(async (): Promise<string[]> => {
//   const posts = await getBlogPosts();
//   const tags = new Set<string>();
//   posts.forEach(post => {
//     post.tags?.forEach(tag => tags.add(tag));
//   });
//   return Array.from(tags);
// });
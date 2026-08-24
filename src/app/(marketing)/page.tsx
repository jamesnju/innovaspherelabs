// src/app/(marketing)/page.tsx (Homepage)
import { Metadata } from 'next';
import { getStats } from '../services/stats';
import { getTestimonials } from '../services/testimonials';
import { getFeaturedProducts } from '../services/products';
import { BlogPreview } from '../components/common/marketing/Blog/BlogPreview';
import { CTASection } from '../components/common/marketing/CTA';
import { Features } from '../components/common/marketing/Features';
import { HeroSection } from '../components/common/marketing/Hero';
import { ProductShowcase } from '../components/common/marketing/Products/ProductShowcase';
import { Testimonials } from '../components/common/marketing/Testimonials';
import { Stats } from '../components/common/marketing/Stats';
import { Team } from '../components/common/marketing/MeetTheTeam';



export const metadata: Metadata = {
  title: 'Transform Your Business with Multi-SaaS Platform',
  description: 'Powerful POS, E-commerce, and Inventory management solutions for modern businesses. Start your free trial today.',
};

export default async function HomePage() {
  // Fetch data in parallel for better performance
  const [stats, testimonials, featuredProducts] = await Promise.all([
    getStats(),
    getTestimonials(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <HeroSection />
      <Features />
      {/* <ProductShowcase products={featuredProducts} /> */}
      {/* <Stats stats={stats} /> */}
            <Stats />

      <Testimonials />
            {/* <Testimonials testimonials={testimonials} /> */}
      <Team />

      <BlogPreview />
      <CTASection />
    </>
  )
}
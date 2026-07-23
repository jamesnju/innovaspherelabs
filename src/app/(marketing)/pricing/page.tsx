// src/app/(marketing)/pricing/page.tsx
import { Metadata } from 'next';
import { getFAQ, getPricingPlans } from '../../services/pricing';
import { PricingTable } from '../../components/common/marketing/Pricing/PricingTable';
import { FAQ } from '../../components/common/marketing/Pricing/FAQ';
// import { PricingTable } from '@/components/marketing/Pricing/PricingTable';
// import { FAQ } from '@/components/marketing/Pricing/FAQ';
// import { getPricingPlans, getFAQ } from '@/lib/services/pricing';

export const metadata: Metadata = {
  title: 'Pricing Plans - Flexible Options for Every Business',
  description: 'Choose the perfect plan for your business. Start with our free trial and upgrade as you grow.',
};

export default async function PricingPage() {
  const [plans, faqs] = await Promise.all([
    getPricingPlans(),
    getFAQ(),
  ]);

  return (
    <div className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="section-subtitle">
            Choose the plan that fits your business needs. Scale as you grow.
          </p>
        </div>
        <PricingTable plans={plans} />
        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
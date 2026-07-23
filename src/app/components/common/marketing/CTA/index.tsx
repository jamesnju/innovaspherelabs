// src/components/marketing/CTA/index.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '../../../ui/Button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-secondary-500 to-accent-500">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white max-w-3xl mx-auto"
        >
          <Rocket className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of businesses already using our platform to grow and succeed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/60 mt-4">
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
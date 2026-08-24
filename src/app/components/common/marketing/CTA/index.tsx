// src/components/marketing/CTA/index.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Rocket,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 dark:bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-secondary-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-10 hidden opacity-20 lg:block">
        <Sparkles className="h-16 w-16 text-secondary-400" />
      </div>

      <div className="absolute bottom-10 right-10 hidden opacity-20 lg:block">
        <Rocket className="h-20 w-20 text-accent-400" />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center text-white"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-accent-500 shadow-xl"
          >
            <Rocket className="h-8 w-8" />
          </motion.div>

          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-secondary-400" />
            Let's build something great
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Have an idea?
            <br />
            <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Let's turn it into reality.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            Whether you have a business idea, need to automate an existing
            process, or want to build a completely new digital product,
            we're here to help you figure out the right solution.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-gray-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:w-auto"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Tell Us Your Idea
            </Link>
          </div>

          {/* Supporting text */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <span>✓ No obligation</span>
            <span>✓ Free initial consultation</span>
            <span>✓ Practical guidance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// // src/components/marketing/CTA/index.tsx7

// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { ArrowRight, Rocket } from 'lucide-react';
// import { Button } from '../../../ui/Button';

// export function CTASection() {
//   return (
//     <section className="py-20 bg-gradient-to-r from-secondary-500 to-accent-500">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center text-white max-w-3xl mx-auto"
//         >
//           <Rocket className="h-16 w-16 mx-auto mb-6" />
//           <h2 className="text-3xl md:text-5xl font-bold mb-4">
//             Ready to Transform Your Business?
//           </h2>
//           <p className="text-lg text-white/80 mb-8">
//             Join thousands of businesses already using our platform to grow and succeed.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <Link href="/signup">
//               <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100">
//                 Start Free Trial
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//             <Link href="/contact">
//               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
//                 Contact Sales
//               </Button>
//             </Link>
//           </div>
//           <p className="text-sm text-white/60 mt-4">
//             No credit card required. 14-day free trial.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// src/components/marketing/Products/ProductDetails.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Calendar,
  Code2,
  Rocket,
} from 'lucide-react';

import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    features: string[];
    image?: string;
    price?: string;
    slug: string;
    category: string;
  };
}

export function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="max-w-5xl mx-auto"
    >
      {/* ============================================================
          BACK
      ============================================================ */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-secondary-600 dark:text-gray-400 dark:hover:text-secondary-400 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Services
      </Link>

      {/* ============================================================
          MAIN CARD
      ============================================================ */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* ==========================================================
            HEADER
        ========================================================== */}
        <div className="relative p-8 md:p-12 bg-gradient-to-br from-secondary-500/10 via-transparent to-accent-500/10">
          <div className="max-w-3xl">
            <Badge className="mb-4">
              {product.category}
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5">
              {product.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>
        </div>

        {/* ==========================================================
            CONTENT
        ========================================================== */}
        <div className="p-8 md:p-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ======================================================
                FEATURES
            ====================================================== */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-secondary-500" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    What we can build
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tailored around your requirements
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />

                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* ====================================================
                  DEVELOPMENT PROCESS
              ==================================================== */}
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  From idea to launch
                </h2>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      01. Discuss
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tell us about your idea and what you want to achieve.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                      <Code2 className="h-5 w-5 text-purple-500" />
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      02. Build
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We design, develop, test, and refine your solution.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                      <Rocket className="h-5 w-5 text-green-500" />
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      03. Launch
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Deploy your product and continue improving it as you grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================
                CTA
            ====================================================== */}
            <div>
              <div className="sticky top-8 bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/10 flex items-center justify-center mb-5">
                  <Calendar className="h-6 w-6 text-secondary-500" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Have a project in mind?
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Book a free consultation and tell us what you want to build.
                  You don't need a complete technical specification.
                </p>

                <Link href="/contact">
                  <Button className="w-full btn-primary">
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link
                  href="/contact"
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-secondary-500 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to Us
                </Link>

                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-5">
                  Free consultation · No obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// // src/components/marketing/Products/ProductDetails.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
// import { Badge } from '../../../ui/Badge';
// import { Button } from '../../../ui/Button';

// interface ProductDetailsProps {
//   product: {
//     id: string;
//     name: string;
//     description: string;
//     longDescription?: string;
//     features: string[];
//     image?: string;
//     price?: string;
//     slug: string;
//     category: string;
//   };
// }

// export function ProductDetails({ product }: ProductDetailsProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-4xl mx-auto"
//     >
//       <Link
//         href="/products"
//         className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-8"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Products
//       </Link>

//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 overflow-hidden">
//         <div className="p-8">
//           <div className="flex items-start justify-between mb-4">
//             <div>
//               <Badge className="mb-2">{product.category}</Badge>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//                 {product.name}
//               </h1>
//             </div>
//             {product.price && (
//               <div className="text-right">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
//                 <p className="text-2xl font-bold text-secondary-500">{product.price}</p>
//               </div>
//             )}
//           </div>

//           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//             {product.longDescription || product.description}
//           </p>

//           <div className="grid md:grid-cols-2 gap-6 mb-8">
//             <div>
//               <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
//                 Key Features
//               </h3>
//               <ul className="space-y-2">
//                 {product.features.map((feature) => (
//                   <li key={feature} className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
//                     <span className="text-gray-600 dark:text-gray-300">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
//               <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
//                 Get Started
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
//                 Ready to transform your business with {product.name}?
//               </p>
//               <Link href="/signup">
//                 <Button className="w-full btn-primary">
//                   Start Free Trial
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
//                 No credit card required
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
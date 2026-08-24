// src/components/marketing/Features/index.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Globe,
  ShoppingCart,
  CreditCard,
  Smartphone,
  Code2,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Applications & PWAs',
    description:
      'Modern, responsive web applications and Progressive Web Apps that work beautifully across phones, tablets and computers.',
    features: [
      'Business platforms',
      'Dashboards & portals',
      'Booking systems',
      'Management systems',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Systems',
    description:
      'Custom online stores that help businesses showcase products, accept orders and manage their entire online operation.',
    features: [
      'Product management',
      'Online payments',
      'Customer accounts',
      'Orders & inventory',
    ],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: CreditCard,
    title: 'POS & Business Systems',
    description:
      'Reliable POS and business management solutions designed around the way your business actually operates.',
    features: [
      'Sales & receipts',
      'Inventory management',
      'Reports & analytics',
      'Customer management',
    ],
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description:
      'Native mobile experiences for Android and iOS, from the initial idea through development and store publishing.',
    features: [
      'Android applications',
      'iOS applications',
      'API integration',
      'Store publishing support',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Have a unique business problem? We design and develop software specifically around your requirements.',
    features: [
      'Custom platforms',
      'API development',
      'System integrations',
      'Business automation',
    ],
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Lightbulb,
    title: 'Ideas Into Products',
    description:
      "You don't need a complete technical specification. Bring us your idea and we'll help you figure out what to build.",
    features: [
      'Idea discovery',
      'Product planning',
      'Technical guidance',
      'MVP development',
    ],
    gradient: 'from-rose-500 to-red-500',
  },
];

export function Features() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-secondary-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-4 py-2 text-sm font-semibold text-secondary-600 dark:border-secondary-900 dark:bg-secondary-900/20 dark:text-secondary-400">
            <Code2 className="h-4 w-4" />
            What We Do
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            We build{' '}
            <span className="gradient-text">digital products</span>
            <br className="hidden md:block" />
            that move businesses forward.
          </h2>

          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
            From your first idea to a production-ready application, Savo
            helps you plan, build, launch and improve digital solutions
            designed around your goals.
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:border-secondary-200 hover:bg-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-900"
              >
                {/* Hover glow */}
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-secondary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 transition-all group-hover:gap-3 dark:text-secondary-400"
                >
                  Discuss your project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            Not sure which solution you need?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Talk to Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// // src/components/marketing/Features/index.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const features = [
//   {
//     icon: '/images/icons/dataphone.gif',
//     title: 'POS System',
//     description: 'Powerful point of sale system with offline capability and real-time sync.',
//     color: 'from-blue-500 to-indigo-500',
//     alt: 'POS System icon'
//   },
//   {
//     icon: '/images/icons/online-shopping.gif',
//     title: 'E-commerce',
//     description: 'Build and manage your online store with ease. Sell anywhere, anytime.',
//     color: 'from-amber-500 to-orange-500',
//     alt: 'E-commerce icon'
//   },
//   {
//     icon: '/images/icons/clipboard.gif',
//     title: 'Inventory Management',
//     description: 'Track stock levels, manage suppliers, and automate reordering.',
//     color: 'from-emerald-500 to-green-500',
//     alt: 'Inventory Management icon'
//   },
//   {
//     icon: '/images/icons/cybersecurity.gif',
//     title: 'Secure & Reliable',
//     description: 'Enterprise-grade security with 99.99% uptime and data encryption.',
//     color: 'from-purple-500 to-pink-500',
//     alt: 'Security icon'
//   },
//   {
//     icon: '/images/icons/thunder.gif',
//     title: 'Lightning Fast',
//     description: 'Optimized for speed with offline-first architecture and instant sync.',
//     color: 'from-rose-500 to-red-500',
//     alt: 'Lightning Fast icon'
//   },
//   {
//     icon: '/images/icons/analytics.gif',
//     title: 'Advanced Analytics',
//     description: 'Real-time insights and reports to make data-driven decisions.',
//     color: 'from-cyan-500 to-blue-500',
//     alt: 'Advanced Analytics icon'
//   },
//   {
//     icon: '/images/icons/customer-support.gif',
//     title: 'Multi-User Support',
//     description: 'Role-based access for your team members and employees.',
//     color: 'from-violet-500 to-purple-500',
//     alt: 'Multi-User Support icon'
//   },
//   {
//     icon: '/images/icons/cloud-computing.gif',
//     title: 'Cloud Sync',
//     description: 'Seamless synchronization across all your devices and locations.',
//     color: 'from-sky-500 to-blue-500',
//     alt: 'Cloud Sync icon'
//   },
// ];

// export function Features() {
//   return (
//     <section className="py-20 bg-white dark:bg-gray-950">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Everything You Need to <span className="gradient-text">Grow</span>
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             Powerful features designed to help you manage and scale your business efficiently.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.05 }}
//               className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
//             >
//               {/* Increased container size from w-12 h-12 to w-16 h-16 */}
//               <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 overflow-hidden`}>
//                 <Image 
//                   src={feature.icon}
//                   alt={feature.alt}
//                   width={40}  // Increased from 24 to 40
//                   height={40} // Increased from 24 to 40
//                   className="h-10 w-10 object-contain" // Changed from h-6 w-6 to h-10 w-10
//                   unoptimized
//                 />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 text-sm">
//                 {feature.description}
//               </p>
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary-500/0 to-accent-500/0 group-hover:from-secondary-500/5 group-hover:to-accent-500/5 transition-all duration-300" />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

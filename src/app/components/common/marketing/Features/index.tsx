// src/components/marketing/Features/index.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: '/images/icons/dataphone.gif',
    title: 'POS System',
    description: 'Powerful point of sale system with offline capability and real-time sync.',
    color: 'from-blue-500 to-indigo-500',
    alt: 'POS System icon'
  },
  {
    icon: '/images/icons/online-shopping.gif',
    title: 'E-commerce',
    description: 'Build and manage your online store with ease. Sell anywhere, anytime.',
    color: 'from-amber-500 to-orange-500',
    alt: 'E-commerce icon'
  },
  {
    icon: '/images/icons/clipboard.gif',
    title: 'Inventory Management',
    description: 'Track stock levels, manage suppliers, and automate reordering.',
    color: 'from-emerald-500 to-green-500',
    alt: 'Inventory Management icon'
  },
  {
    icon: '/images/icons/cybersecurity.gif',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.99% uptime and data encryption.',
    color: 'from-purple-500 to-pink-500',
    alt: 'Security icon'
  },
  {
    icon: '/images/icons/thunder.gif',
    title: 'Lightning Fast',
    description: 'Optimized for speed with offline-first architecture and instant sync.',
    color: 'from-rose-500 to-red-500',
    alt: 'Lightning Fast icon'
  },
  {
    icon: '/images/icons/analytics.gif',
    title: 'Advanced Analytics',
    description: 'Real-time insights and reports to make data-driven decisions.',
    color: 'from-cyan-500 to-blue-500',
    alt: 'Advanced Analytics icon'
  },
  {
    icon: '/images/icons/customer-support.gif',
    title: 'Multi-User Support',
    description: 'Role-based access for your team members and employees.',
    color: 'from-violet-500 to-purple-500',
    alt: 'Multi-User Support icon'
  },
  {
    icon: '/images/icons/cloud-computing.gif',
    title: 'Cloud Sync',
    description: 'Seamless synchronization across all your devices and locations.',
    color: 'from-sky-500 to-blue-500',
    alt: 'Cloud Sync icon'
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powerful features designed to help you manage and scale your business efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
            >
              {/* Increased container size from w-12 h-12 to w-16 h-16 */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 overflow-hidden`}>
                <Image 
                  src={feature.icon}
                  alt={feature.alt}
                  width={40}  // Increased from 24 to 40
                  height={40} // Increased from 24 to 40
                  className="h-10 w-10 object-contain" // Changed from h-6 w-6 to h-10 w-10
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary-500/0 to-accent-500/0 group-hover:from-secondary-500/5 group-hover:to-accent-500/5 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
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
//               <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 overflow-hidden`}>
//                 <Image 
//                   src={feature.icon}
//                   alt={feature.alt}
//                   width={24}
//                   height={24}
//                   className="h-6 w-6 object-contain"
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

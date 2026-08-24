// src/components/marketing/Testimonials/index.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Code2,
  Rocket,
  Headphones,
  ShieldCheck,
  Users,
} from 'lucide-react';

const reasons = [
  {
    icon: Lightbulb,
    title: 'Start With the Idea',
    description:
      "You don't need to know exactly what to build. We help you turn your idea or business problem into a clear digital product.",
  },
  {
    icon: Code2,
    title: 'Built Around Your Needs',
    description:
      'We develop custom solutions instead of forcing your business to fit into software that was never designed for you.',
  },
  {
    icon: Rocket,
    title: 'From Idea to Launch',
    description:
      'We can support the journey from planning and development to deployment, publishing and future improvements.',
  },
  {
    icon: Headphones,
    title: 'Human Support',
    description:
      'Work directly with developers who understand your project and can help you make informed technical decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Solutions',
    description:
      'We focus on maintainable, secure and scalable software that can grow alongside your business.',
  },
  {
    icon: Users,
    title: 'Built for Real Businesses',
    description:
      'Our solutions are designed around practical workflows, real users and measurable business needs.',
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24 dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-2 text-sm font-semibold text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
            Why Savo
          </div>

          <h2 className="mb-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            More than{' '}
            <span className="gradient-text">just software development</span>
          </h2>

          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
            We don't simply build websites. We work with you to understand the
            problem, design the solution and create technology that supports
            your goals.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                  {reason.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// // src/components/marketing/Testimonials/index.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { Star, Quote } from 'lucide-react';

// interface Testimonial {
//   id: string;
//   name: string;
//   role: string;
//   company: string;
//   content: string;
//   avatar?: string;
//   rating: number;
// }

// interface TestimonialsProps {
//   testimonials?: Testimonial[];
// }

// const defaultTestimonials: Testimonial[] = [
//   {
//     id: '1',
//     name: 'John Smith',
//     role: 'CEO',
//     company: 'ABC Retail',
//     content: 'Multi-SaaS Platform has completely transformed how we manage our business. The POS system is intuitive, and the offline capability is a game-changer.',
//     rating: 5,
//   },
//   {
//     id: '2',
//     name: 'Sarah Johnson',
//     role: 'Owner',
//     company: "Sarah's Boutique",
//     content: 'The e-commerce integration was seamless. We went from in-store only to a thriving online presence in just a few days.',
//     rating: 5,
//   },
//   {
//     id: '3',
//     name: 'Mike Chen',
//     role: 'Operations Manager',
//     company: 'TechHub',
//     content: 'The inventory management features have saved us countless hours. Everything is synchronized across our multiple locations.',
//     rating: 5,
//   },
// ];

// export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
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
//             What Our <span className="gradient-text">Customers Say</span>
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             Real stories from businesses using our platform
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 relative"
//             >
//               <Quote className="absolute top-4 right-4 h-8 w-8 text-secondary-500/20" />
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
//                   {testimonial.name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     {testimonial.name}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {testimonial.role}, {testimonial.company}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < testimonial.rating
//                         ? 'text-yellow-400 fill-yellow-400'
//                         : 'text-gray-300 dark:text-gray-600'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 italic">
//                 "{testimonial.content}"
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
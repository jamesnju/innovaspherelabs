'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Code2, GitCommit } from 'lucide-react';

const team = [
  {
    name: 'James',
    role: 'Software Developer',
    description:
      'Full-stack software developer focused on building scalable web applications, business systems and digital products that solve real-world problems.',
    // Using a placeholder gradient as fallback – replace with actual image paths
    image: '/images/team/james.jpg',
    github: 'https://github.com/jamesnju',
  },
  {
    name: 'Victor',
    role: 'Software Developer',
    description:
      'Software developer passionate about turning ideas into practical digital experiences through clean, reliable and user-friendly technology.',
    image: '/images/team/victor.jpg',
    github: 'https://github.com/vic-mwas',
  },
];

export function Team() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-2 text-sm font-semibold text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
            <Code2 className="h-4 w-4" />
            Meet the Team
          </div>

          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            The people behind{' '}
            <span className="bg-gradient-to-r from-secondary-500 to-secondary-700 bg-clip-text text-transparent">
              Savo
            </span>
          </h2>

          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
            We're a team of software developers who enjoy turning ideas,
            business challenges and opportunities into useful digital products.
          </p>
        </motion.div>

        {/* Two-column grid with attractive cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-950"
            >
              {/* Image container – full width, fixed height, object-fit cover to avoid head cropping */}
              <div className="relative h-72 w-full flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback in case image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${member.name.replace(
                      ' ',
                      '+'
                    )}&background=6B4EFF&color=fff&size=400`;
                  }}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Name & role badge positioned at bottom-left */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-3xl font-bold text-white drop-shadow-md">
                    {member.name}
                  </p>
                  <p className="text-sm font-medium text-white/90 drop-shadow-sm">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Description and action */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-6 flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {member.description}
                </p>

                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all hover:border-secondary-500 hover:bg-secondary-50 hover:text-secondary-700 dark:border-gray-600 dark:bg-gray-900/80 dark:text-white dark:hover:border-secondary-400 dark:hover:bg-secondary-900/30 dark:hover:text-secondary-300"
                >
                  <GitCommit className="h-4 w-4" />
                  GitHub Profile
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* decorative accent */}
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-gradient-to-bl from-secondary-200/40 to-transparent dark:from-secondary-700/20" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-secondary-300/40 dark:shadow-secondary-900/40"
          >
            Have an idea? Let's talk
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// 'use client';7



// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';
// import {  ArrowUpRight, Code2, GitCommit } from 'lucide-react';

// const team = [
//   {
//     name: 'James',
//     role: 'Software Developer',
//     description:
//       'Full-stack software developer focused on building scalable web applications, business systems and digital products that solve real-world problems.',
//     image: '/images/team/james.jpg',
//     github: 'https://github.com/jamesnju',
//   },
//   {
//     name: 'Victor',
//     role: 'Software Developer',
//     description:
//       'Software developer passionate about turning ideas into practical digital experiences through clean, reliable and user-friendly technology.',
//     image: '/images/team/victor.jpg',
//     github: 'https://github.com/vic-mwas',
//   },
// ];

// export function Team() {
//   return (
//     <section className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mx-auto mb-14 max-w-3xl text-center"
//         >
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-2 text-sm font-semibold text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
//             <Code2 className="h-4 w-4" />
//             Meet the Team
//           </div>

//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
//             The people behind{' '}
//             <span className="gradient-text">Savo</span>
//           </h2>

//           <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
//             We're a team of software developers who enjoy turning ideas,
//             business challenges and opportunities into useful digital products.
//           </p>
//         </motion.div>

//         <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
//           {team.map((member, index) => (
//             <motion.div
//               key={member.name}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.15 }}
//               whileHover={{ y: -6 }}
//               className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
//             >
//               <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-800">
//                 <Image
//                   src={member.image}
//                   alt={`${member.name} - ${member.role}`}
//                   fill
//                   className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                 <div className="absolute bottom-5 left-5">
//                   <p className="text-2xl font-bold text-white">
//                     {member.name}
//                   </p>
//                   <p className="text-sm font-medium text-white/80">
//                     {member.role}
//                   </p>
//                 </div>
//               </div>

//               <div className="p-7">
//                 <p className="mb-6 leading-7 text-gray-600 dark:text-gray-300">
//                   {member.description}
//                 </p>

//                 <Link
//                   href={member.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-900"
//                 >
//                   <GitCommit className="h-4 w-4" />
//                   GitHub Profile
//                   <ArrowUpRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-14 text-center">
//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-2 rounded-xl bg-secondary-500 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-secondary-600"
//           >
//             Have an idea?
//             <ArrowUpRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
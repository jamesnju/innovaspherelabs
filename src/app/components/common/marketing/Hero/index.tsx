
// src/components/marketing/Hero/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../../ui/Button';

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=85',

    badge: 'Powerful POS for modern businesses',

    title: 'Sell Smarter.',

    highlight: 'Grow Faster.',

    description:
      'Take control of your sales with a powerful POS solution built to make transactions faster, simpler, and more efficient.',

    imageTitle: 'Powerful POS Solutions',
  },

  {
    image:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000&q=85',

    badge: 'Your business, online',

    title: 'Turn Browsers',

    highlight: 'Into Customers.',

    description:
      'Build your online presence, showcase your products, and reach more customers with powerful e-commerce tools from Savo.',

    imageTitle: 'Grow Your Online Business',
  },

  {
    image:
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=2000&q=85',

    badge: 'Inventory made simple',

    title: 'Know Your Stock.',

    highlight: 'Control Your Business.',

    description:
      'Track inventory in real time, reduce stock problems, and keep your business running smoothly with intelligent inventory management.',

    imageTitle: 'Smart Inventory Management',
  },

  {
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85',

    badge: 'Insights that drive growth',

    title: 'Understand Your',

    highlight: 'Business Better.',

    description:
      'Turn your business data into actionable insights and make smarter decisions with powerful reports and analytics.',

    imageTitle: 'Business Analytics',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * Automatically change the slide every 6 seconds.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Go to the next slide.
   */
  const nextSlide = () => {
    setCurrentSlide(
      (previous) => (previous + 1) % heroSlides.length
    );
  };

  /*
   * Go to the previous slide.
   */
  const previousSlide = () => {
    setCurrentSlide(
      (previous) =>
        (previous - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[720px] lg:min-h-[780px] overflow-hidden">
      {/* ============================================================
          BACKGROUND IMAGE CAROUSEL
      ============================================================ */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 1.2,
              },
              scale: {
                duration: 7,
                ease: 'easeOut',
              },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentHero.image})`,
            }}
          />
        </AnimatePresence>

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* ============================================================
          HERO CONTENT
      ============================================================ */}
      <div className="relative z-10 container-custom min-h-[720px] lg:min-h-[780px] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-24 lg:py-32">
          {/* ========================================================
              LEFT SIDE
          ======================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-2xl"
          >
            {/* ======================================================
                DYNAMIC BADGE
            ====================================================== */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-7"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />

                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-500" />
                </span>

                {currentHero.badge}
              </motion.div>
            </AnimatePresence>

            {/* ======================================================
                DYNAMIC HEADING
            ====================================================== */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`heading-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -25,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-7"
              >
                {currentHero.title}

                <span className="block text-secondary-400">
                  {currentHero.highlight}
                </span>
              </motion.h1>
            </AnimatePresence>

            {/* ======================================================
                DYNAMIC DESCRIPTION
            ====================================================== */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`description-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                }}
                className="text-lg md:text-xl text-white/80 mb-9 max-w-xl leading-relaxed"
              >
                {currentHero.description}
              </motion.p>
            </AnimatePresence>

            {/* ======================================================
                CTA BUTTONS
            ====================================================== */}
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
                delay: 0.5,
                duration: 0.6,
              }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="btn-primary shadow-xl hover:scale-105 transition-transform"
                >
                  Get Started Free

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-gray-900"
              >
                <Play className="mr-2 h-4 w-4" />

                Watch Demo
              </Button>
            </motion.div>

            {/* ======================================================
                TRUST SECTION
            ====================================================== */}
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
                delay: 0.7,
                duration: 0.6,
              }}
              className="flex items-center gap-5 mt-10"
            >
              {/* Customer avatars */}
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',

                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',

                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',

                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
                ].map((imageUrl, index) => (
                  <div
                    key={index}
                    className="w-9 h-9 rounded-full border-2 border-white/80 overflow-hidden bg-gray-200"
                  >
                    <img
                      src={imageUrl}
                      alt={`Savo customer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div>
                <p className="font-semibold text-white">
                  Trusted by growing businesses
                </p>

                <div className="flex items-center gap-1 text-sm text-white/70">
                  <CheckCircle className="h-4 w-4 text-green-400" />

                  <span>
                    Simple. Powerful. Scalable.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================
              RIGHT SIDE - SOFTWARE DASHBOARD
          ======================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* ==================================================
                  GLASS CONTAINER
              ================================================== */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-5"
              >
                {/* =================================================
                    BROWSER WINDOW
                ================================================= */}
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-950 shadow-xl">
                  {/* Browser bar */}
                  <div className="h-10 bg-gray-100 dark:bg-gray-900 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />

                    <div className="w-3 h-3 rounded-full bg-yellow-400" />

                    <div className="w-3 h-3 rounded-full bg-green-400" />

                    <div className="ml-4 flex-1 h-5 rounded-md bg-gray-200 dark:bg-gray-800" />
                  </div>

                  {/* =================================================
                      DASHBOARD CONTENT
                  ================================================= */}
                  <div className="p-6">
                    {/* Dashboard header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-500">
                          Business Overview
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Welcome to Savo
                        </h3>
                      </div>

                      {/* Savo icon */}
                      <div className="w-10 h-10 rounded-xl bg-secondary-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          S
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        STAT CARDS
                    ================================================= */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {/* Sales */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 mb-1">
                          Total Sales
                        </p>

                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          KSh 248,450
                        </p>

                        <p className="text-xs text-green-500 mt-1">
                          +18.4%
                        </p>
                      </div>

                      {/* Orders */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 mb-1">
                          Orders
                        </p>

                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          1,284
                        </p>

                        <p className="text-xs text-green-500 mt-1">
                          +12.8%
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        SALES CHART
                    ================================================= */}
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          Sales Overview
                        </p>

                        <span className="text-xs text-gray-500">
                          This month
                        </span>
                      </div>

                      <div className="flex items-end gap-2 h-28">
                        {[
                          35,
                          50,
                          42,
                          70,
                          58,
                          82,
                          68,
                          92,
                          76,
                          100,
                          88,
                          96,
                        ].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{
                              height: 0,
                            }}
                            animate={{
                              height: `${height}%`,
                            }}
                            transition={{
                              delay: 0.8 + index * 0.05,
                              duration: 0.5,
                            }}
                            className="flex-1 rounded-t-md bg-secondary-500/80"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  FLOATING STATUS CARD
              ================================================== */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -top-5 -right-5 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Platform Status
                    </p>

                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      99.99% Uptime
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  FLOATING RATING CARD
              ================================================== */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    ⭐
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      4.9/5
                    </p>

                    <p className="text-xs text-gray-500">
                      Customer satisfaction
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container-custom flex items-center justify-between">
          {/* Current slide information */}
          <div className="hidden sm:block">
            <p className="text-sm text-white/60">
              Savo
            </p>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                className="text-sm font-medium text-white"
              >
                {currentHero.imageTitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Previous button */}
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel indicators */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



// // src/components/marketing/Hero/index.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { ArrowRight, Play, CheckCircle } from 'lucide-react';
// import { Button } from '../../../ui/Button';

// export function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="container-custom py-20 lg:py-32">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-6"
//             >
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
//               </span>
//               Now available in early access
//             </motion.div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
//               Transform Your
//               <span className="gradient-text block"> Business Operations</span>
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
//               All-in-one POS, E-commerce, and Inventory management platform designed to help you scale your business efficiently.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link href="/signup">
//                 <Button size="lg" className="btn-primary">
//                   Get Started Free
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Button size="lg" variant="outline">
//                 <Play className="mr-2 h-4 w-4" />
//                 Watch Demo
//               </Button>
//             </div>
//             <div className="flex items-center gap-6 mt-8">
//   <div className="flex -space-x-2">
//     {[
//       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
//     ].map((imageUrl, i) => (
//       <div
//         key={i}
//         className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden"
//       >
//         <img
//           src={imageUrl}
//           alt={`Business owner ${i + 1}`}
//           className="w-full h-full object-cover"
//         />
//       </div>
//     ))}
//   </div>
//   <div>
//     <p className="font-medium text-gray-900 dark:text-white">
//       Trusted by 10,000+ businesses
//     </p>
//     <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
//       <CheckCircle className="h-4 w-4 text-green-500" />
//       <span>4.9/5 average rating</span>
//     </div>
//   </div>
// </div>
//             {/* <div className="flex items-center gap-6 mt-8">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
//                   />
//                 ))}
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   Trusted by 10,000+ businesses
//                 </p>
//                 <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
//                   <CheckCircle className="h-4 w-4 text-green-500" />
//                   <span>4.9/5 average rating</span>
//                 </div>
//               </div>
//             </div> */}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative"
//           >
//             <div className="relative rounded-2xl overflow-hidden shadow-hard bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
//               <div className="aspect-video bg-gradient-to-br from-secondary-500/10 to-accent-500/10 flex items-center justify-center">
//                 <div className="text-center p-8">
//                   <div className="w-20 h-20 mx-auto bg-secondary-500 rounded-2xl flex items-center justify-center mb-4">
//                     <Play className="h-10 w-10 text-white" />
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-300 font-medium">
//                     See the platform in action
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Floating elements */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-soft border border-gray-200 dark:border-gray-800 p-3"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                 <span className="text-sm font-medium">99.99% Uptime</span>
//               </div>
//             </motion.div>
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 4, repeat: Infinity, delay: 1 }}
//               className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-xl shadow-soft border border-gray-200 dark:border-gray-800 p-3"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl">⭐</span>
//                 <div>
//                   <p className="text-sm font-medium">4.9/5</p>
//                   <p className="text-xs text-gray-500">from 500+ reviews</p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
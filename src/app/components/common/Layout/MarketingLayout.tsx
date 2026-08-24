// src/components/common/Layout/MarketingLayout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  Code2,
  ChevronDown,
  ShoppingBag,
  Store,
  Package,
  Rocket,
  User,
} from 'lucide-react';

import { useAuth } from '@/src/contexts/AuthContext';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const products = [
  {
    name: 'POS System',
    href: '/products/pos',
    icon: ShoppingBag,
  },
  {
    name: 'E-Commerce',
    href: '/products/ecommerce',
    icon: Store,
  },
  {
    name: 'Inventory',
    href: '/products/inventory',
    icon: Package,
  },
];

export function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const { isAuthenticated, user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const dashboardHref =
    user?.role === 'super_admin'
      ? '/admin/dashboard'
      : '/dashboard';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/90">
        <div className="container-custom">
          <div className="flex h-20 items-center justify-between">

            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary-500 to-accent-500 shadow-lg transition-transform group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="SAVO"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div>
                <div className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Savo
                </div>

                <div className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-500 sm:block dark:text-gray-400">
                  Business Solutions
                </div>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}
            <nav className="hidden items-center gap-8 lg:flex">

              {/* Home */}
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
              >
                Home
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      productsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      transition={{
                        duration: 0.15,
                      }}
                      className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-800 dark:bg-gray-900">

                        {products.map((product) => {
                          const Icon = product.icon;

                          return (
                            <Link
                              key={product.href}
                              href={product.href}
                              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                <Icon className="h-4 w-4" />
                              </div>

                              {product.name}
                            </Link>
                          );
                        })}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              {/* <Link
                href="/pricing"
                className="text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
              >
                Pricing
              </Link> */}

              {/* About */}
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
              >
                About
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
              >
                Insights
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 transition hover:text-secondary-500 dark:text-gray-300"
              >
                Contact
              </Link>
            </nav>

            {/* =====================================================
                DESKTOP CTA
            ===================================================== */}
            <div className="hidden lg:block">

              {isAuthenticated ? (
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* =======================================================
              MOBILE NAVIGATION
          ======================================================= */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="overflow-hidden border-t border-gray-200 lg:hidden dark:border-gray-800"
              >
                <nav className="flex flex-col gap-2 py-5">

                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Home
                  </Link>

                  {/* Products */}
                  <button
                    type="button"
                    onClick={() => setProductsOpen(!productsOpen)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <span>Products</span>

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        productsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mobile Products */}
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="ml-4 overflow-hidden border-l border-gray-200 pl-3 dark:border-gray-700"
                      >
                        {products.map((product) => {
                          const Icon = product.icon;

                          return (
                            <Link
                              key={product.href}
                              href={product.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-600 transition hover:text-secondary-500 dark:text-gray-400"
                            >
                              <Icon className="h-4 w-4" />
                              {product.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pricing */}
                  <Link
                    href="/pricing"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Pricing
                  </Link>

                  {/* About */}
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    About
                  </Link>

                  {/* Blog */}
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Insights
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-secondary-500 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Contact
                  </Link>

                  {/* Mobile CTA */}
                  <Link
                    href={
                      isAuthenticated
                        ? dashboardHref
                        : '/contact'
                    }
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary-500 px-5 py-3.5 font-semibold text-white transition hover:bg-secondary-600"
                  >
                    {isAuthenticated ? (
                      <>
                        <User className="h-4 w-4" />
                        Dashboard
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4" />
                        Book a Free Consultation
                      </>
                    )}

                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT
          KEEPING MARKETINGLAYOUT + CHILDREN
      ========================================================= */}
      <main>
        {children}
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container-custom py-12">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

            {/* Brand */}
            <div>
              <Link
                href="/"
                className="group mb-4 flex items-center gap-3"
              >
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary-500 to-accent-500 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/logo.jpeg"
                    alt="SAVO"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Savo
                  </div>

                  <div className="text-[9px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Business Solutions
                  </div>
                </div>
              </Link>

              <p className="max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-400">
                All-in-one business management solutions for
                modern entrepreneurs.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                Products
              </h4>

              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/products/pos"
                    className="transition hover:text-secondary-500"
                  >
                    POS System
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products/ecommerce"
                    className="transition hover:text-secondary-500"
                  >
                    E-Commerce
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products/inventory"
                    className="transition hover:text-secondary-500"
                  >
                    Inventory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                Company
              </h4>

              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="transition hover:text-secondary-500"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blog"
                    className="transition hover:text-secondary-500"
                  >
                    Insights
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-secondary-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                Legal
              </h4>

              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="transition hover:text-secondary-500"
                  >
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link
                    href="/terms"
                    className="transition hover:text-secondary-500"
                  >
                    Terms
                  </Link>
                </li>

                <li>
                  <Link
                    href="/cookies"
                    className="transition hover:text-secondary-500"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SAVO. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
}

// // src/components/common/Layout/MarketingLayout.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useTheme } from 'next-themes';
// import { motion } from 'framer-motion';
// import { 
//   Menu, 
//   X, 
//   Sun, 
//   Moon, 
//   ChevronDown,
//   ShoppingBag,
//   Store,
//   Package,
//   Rocket,
//   User,
//   LogIn
// } from 'lucide-react';
// import { Button } from '../../ui/Button';
// import { useAuth } from '@/src/contexts/AuthContext';
// // import { Button } from '@/components/ui/Button';
// // import { useAuth } from '@/contexts/AuthContext';

// interface MarketingLayoutProps {
//   children: React.ReactNode;
// }

// export function MarketingLayout({ children }: MarketingLayoutProps) {
//   const { theme, setTheme } = useTheme();
//   const { isAuthenticated, user } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const navigation = [
//      { name: 'Home', href: '/' },
//     {
      
//       name: 'Products',
//       href: '/products',
//       dropdown: [
//         { name: 'POS System', href: '/products/pos', icon: ShoppingBag },
//         { name: 'E-commerce', href: '/products/ecommerce', icon: Store },
//         { name: 'Inventory', href: '/products/inventory', icon: Package },
//       ]
//     },
//     { name: 'Pricing', href: '/pricing' },
//     { name: 'Blog', href: '/blog' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
//         <nav className="container-custom flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="relative w-9 h-9">
//               <Image
//                 src="/logo.jpeg"
//                 alt="SAVO"
//                 width={36}
//                 height={36}
//                 className="rounded-lg object-cover"
//                 priority
//               />
//             </div>
//             {/* <div className="relative h-8 w-[100px]">
//               <Image
//                 src="/text.jpeg"
//                 alt="SAVO"
//                 width={100}
//                 height={32}
//                 className="object-contain"
//                 priority
//               />
//             </div> */}
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             {navigation.map((item) => {
//               if (item.dropdown) {
//                 return (
//                   <div key={item.name} className="relative group">
//                     <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
//                       {item.name}
//                       <ChevronDown className="h-4 w-4" />
//                     </button>
//                     <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                       <div className="bg-white dark:bg-gray-900 rounded-xl shadow-hard border border-gray-200 dark:border-gray-800 p-2 min-w-[200px]">
//                         {item.dropdown.map((dropdownItem) => (
//                           <Link
//                             key={dropdownItem.name}
//                             href={dropdownItem.href}
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
//                           >
//                             <dropdownItem.icon className="h-4 w-4" />
//                             {dropdownItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-3">
//             {/* <button
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               {mounted && theme === 'dark' ? (
//                 <Sun className="h-5 w-5" />
//               ) : (
//                 <Moon className="h-5 w-5" />
//               )}
//             </button> */}

//             {isAuthenticated ? (
//               <Link href={user?.role === 'super_admin' ? '/admin/dashboard' : '/dashboard'}>
//                 <Button variant="primary" size="sm">
//                   <User className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </Button>
//               </Link>
//             ) : (
//               <>
//                 {/* <Link href="/login" className="hidden sm:inline-block">
//                   <Button variant="ghost" size="sm">
//                     <LogIn className="h-4 w-4 mr-2" />
//                     Sign In
//                   </Button>
//                 </Link> */}
//                 <Link href="/contact">
//                   <Button variant="primary" size="sm" className="hidden sm:inline-flex">
//                     <Rocket className="h-4 w-4 mr-2" />
//                     Get Started
//                   </Button>
//                 </Link>
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
//           >
//             <div className="container-custom py-4 space-y-2">
//               {navigation.map((item) => {
//                 if (item.dropdown) {
//                   return (
//                     <div key={item.name} className="space-y-1">
//                       <p className="font-medium text-gray-900 dark:text-white px-3 py-2">
//                         {item.name}
//                       </p>
//                       {item.dropdown.map((dropdownItem) => (
//                         <Link
//                           key={dropdownItem.name}
//                           href={dropdownItem.href}
//                           className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
//                           onClick={() => setIsMobileMenuOpen(false)}
//                         >
//                           <dropdownItem.icon className="h-4 w-4" />
//                           {dropdownItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   );
//                 }
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
              
//               {!isAuthenticated && (
//                 <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
//                   {/* <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
//                     <Button variant="outline" className="w-full">
//                       Sign In
//                     </Button>
//                   </Link> */}
//                   <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
//                     <Button variant="primary" className="w-full">
//                       <Rocket className="h-4 w-4 mr-2" />
//                       Get Started
//                     </Button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="pt-16">
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//         <div className="container-custom py-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <Link href="/" className="flex items-center gap-3 mb-4">
//                 <div className="relative w-9 h-9">
//                   <Image
//                     src="/logo.jpeg"
//                     alt="SAVO"
//                     width={36}
//                     height={36}
//                     className="rounded-lg object-cover"
//                   />
//                 </div>
//                 <div className="relative h-8 w-[100px]">
//                   <Image
//                     src="/text.jpeg"
//                     alt="SAVO"
//                     width={100}
//                     height={32}
//                     className="object-contain"
//                   />
//                 </div>
//               </Link>
//               <p className="text-gray-600 dark:text-gray-400 text-sm">
//                 All-in-one business management solutions for modern entrepreneurs.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Products</h4>
//               <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                 <li><Link href="/products/pos" className="hover:text-secondary-500 transition-colors">POS System</Link></li>
//                 <li><Link href="/products/ecommerce" className="hover:text-secondary-500 transition-colors">E-commerce</Link></li>
//                 <li><Link href="/products/inventory" className="hover:text-secondary-500 transition-colors">Inventory</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
//               <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                 <li><Link href="/about" className="hover:text-secondary-500 transition-colors">About</Link></li>
//                 <li><Link href="/blog" className="hover:text-secondary-500 transition-colors">Blog</Link></li>
//                 <li><Link href="/contact" className="hover:text-secondary-500 transition-colors">Contact</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                 <li><Link href="/privacy" className="hover:text-secondary-500 transition-colors">Privacy</Link></li>
//                 <li><Link href="/terms" className="hover:text-secondary-500 transition-colors">Terms</Link></li>
//                 <li><Link href="/cookies" className="hover:text-secondary-500 transition-colors">Cookies</Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
//             &copy; {new Date().getFullYear()} SAVO. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

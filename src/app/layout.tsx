export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { GlobalLoader } from './components/common/Loader/GlobalLoader.tsx/GlobalLoader';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Multi-SaaS Platform - Business Management Solutions',
    template: '%s | Multi-SaaS Platform'
  },
  description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions. Scale your business with our modular SaaS ecosystem.',
  keywords: ['SaaS', 'POS', 'E-commerce', 'Inventory Management', 'Business Solutions', 'Multi-tenant'],
  authors: [{ name: 'Multi-SaaS Platform' }],
  creator: 'Multi-SaaS Platform',
  publisher: 'Multi-SaaS Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Multi-SaaS Platform - Business Management Solutions',
    description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions.',
    siteName: 'Multi-SaaS Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Multi-SaaS Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-SaaS Platform - Business Management Solutions',
    description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <GlobalLoader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// // src/app/layout.tsx
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Providers } from './providers';
// import { GlobalLoader } from './components/common/Loader/GlobalLoader.tsx/GlobalLoader';

// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
// });

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
//   title: {
//     default: 'Multi-SaaS Platform - Business Management Solutions',
//     template: '%s | Multi-SaaS Platform'
//   },
//   description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions. Scale your business with our modular SaaS ecosystem.',
//   keywords: ['SaaS', 'POS', 'E-commerce', 'Inventory Management', 'Business Solutions', 'Multi-tenant'],
//   authors: [{ name: 'Multi-SaaS Platform' }],
//   creator: 'Multi-SaaS Platform',
//   publisher: 'Multi-SaaS Platform',
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     url: process.env.NEXT_PUBLIC_APP_URL,
//     title: 'Multi-SaaS Platform - Business Management Solutions',
//     description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions.',
//     siteName: 'Multi-SaaS Platform',
//     images: [
//       {
//         url: '/og-image.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Multi-SaaS Platform',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Multi-SaaS Platform - Business Management Solutions',
//     description: 'All-in-one business management platform with POS, E-commerce, and Inventory solutions.',
//     images: ['/og-image.jpg'],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} scroll-smooth`}>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <link rel="manifest" href="/manifest.json" />
//       </head>
//       <body className="min-h-screen bg-background font-sans antialiased">
//         <GlobalLoader />
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

// app/not-found.tsx
'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './components/ui/Button';

// Add this export to make the page dynamic
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="btn-primary">
            Go Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
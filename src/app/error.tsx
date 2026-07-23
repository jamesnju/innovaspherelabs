// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">😕</div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're sorry for the inconvenience. Please try again.
        </p>
        <Button onClick={reset} className="btn-primary">
          Try again
        </Button>
      </div>
    </motion.div>
  );
}

// // src/app/error.tsx
// 'use client';

// import { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from './components/ui/Button';

// export default function Error({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="min-h-screen flex items-center justify-center px-4"
//     >
//       <div className="text-center max-w-md">
//         <div className="text-6xl mb-6">😕</div>
//         <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           We're sorry for the inconvenience. Please try again.
//         </p>
//         <Button onClick={reset} className="btn-primary">
//           Try again
//         </Button>
//       </div>
//     </motion.div>
//   );
// }
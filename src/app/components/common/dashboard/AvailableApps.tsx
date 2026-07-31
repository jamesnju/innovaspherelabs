// src/components/common/dashboard/AvailableApps.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, Clock } from 'lucide-react';
import { App } from '@/src/app/services/dashboard';

interface AvailableAppsProps {
  apps: App[];
}

export function AvailableApps({ apps }: AvailableAppsProps) {
  // If no apps, show empty state
  if (!apps || apps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
            <Rocket className="h-5 w-5 text-secondary-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Apps
          </h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No apps available at the moment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
          <Rocket className="h-5 w-5 text-secondary-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Apps
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Launch your business applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={app.status === 'active' ? `/apps/${app.id}` : '#'}
              className={`block p-4 rounded-xl border transition-all ${
                app.status === 'active'
                  ? 'border-gray-200 dark:border-gray-800 hover:border-secondary-300 dark:hover:border-secondary-700 hover:shadow-md'
                  : 'border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (app.status === 'coming_soon') {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${app.color}20` }}
                >
                  <div style={{ color: app.color }}>{app.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.name}
                    </p>
                    {app.status === 'coming_soon' && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {app.description}
                  </p>
                </div>
                {app.status === 'active' && (
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                )}
                {app.status === 'coming_soon' && (
                  <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


// // src/components/common/dashboard/AvailableApps.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { ArrowRight, Rocket, Clock } from 'lucide-react';
// import { App } from '@/src/app/services/dashboard';

// interface AvailableAppsProps {
//   apps: App[];
// }

// export function AvailableApps({ apps }: AvailableAppsProps) {
//   // If no apps, show empty state
//   if (!apps || apps.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
//             <Rocket className="h-5 w-5 text-secondary-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Available Apps
//           </h3>
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-center py-8">
//           No apps available at the moment.
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
//     >
//       <div className="flex items-center gap-3 mb-4">
//         <div className="p-2 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
//           <Rocket className="h-5 w-5 text-secondary-500" />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Available Apps
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Launch your business applications
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {apps.map((app, index) => (
//           <motion.div
//             key={app.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Link
//               href={app.url}
//               className={`block p-4 rounded-xl border transition-all ${
//                 app.status === 'active'
//                   ? 'border-gray-200 dark:border-gray-800 hover:border-secondary-300 dark:hover:border-secondary-700 hover:shadow-md'
//                   : 'border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed'
//               }`}
//               onClick={(e) => {
//                 if (app.status === 'coming_soon') {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               <div className="flex items-start gap-3">
//                 <div
//                   className="p-2 rounded-lg"
//                   style={{ backgroundColor: `${app.color}20` }}
//                 >
//                   <div style={{ color: app.color }}>{app.icon}</div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       {app.name}
//                     </p>
//                     {app.status === 'coming_soon' && (
//                       <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
//                         Soon
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {app.description}
//                   </p>
//                 </div>
//                 {app.status === 'active' && (
//                   <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
//                 )}
//                 {app.status === 'coming_soon' && (
//                   <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
//                 )}
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
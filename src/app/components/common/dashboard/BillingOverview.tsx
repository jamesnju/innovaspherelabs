// src/components/common/dashboard/BillingOverview.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { BillingSummary } from '@/src/types/shared.types';

interface BillingOverviewProps {
  summary: BillingSummary | null;
  onUpgrade?: () => void;
}

export function BillingOverview({ summary, onUpgrade }: BillingOverviewProps) {
  const router = useRouter();

  // If no summary, show empty state
  if (!summary) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex flex-col items-center gap-3 text-center py-8">
          <CreditCard className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No Billing Data
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your billing information will appear here.
          </p>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'INACTIVE':
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'PENDING':
      case 'TRIAL':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'INACTIVE':
      case 'EXPIRED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const isActive = summary.subscription?.status?.toUpperCase() === 'ACTIVE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 sticky top-24"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
          <CreditCard className="h-6 w-6 text-secondary-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Billing Summary
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your subscription overview
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Subscription Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            {getStatusIcon(summary.subscription?.status)}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {summary.subscription?.plan || 'No Plan'}
            </span>
          </div>
          <Badge className={getStatusColor(summary.subscription?.status)}>
            {summary.subscription?.status?.toLowerCase() || 'unknown'}
          </Badge>
        </div>

        {/* Pending Invoices */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Pending Invoices</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {summary.pendingInvoices || 0}
          </span>
        </div>

        {/* Pending Amount */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Pending Amount</span>
          <span className="font-semibold text-yellow-600 dark:text-yellow-400">
            {formatCurrency(summary.pendingAmount || 0)}
          </span>
        </div>

        {/* Total Paid */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Total Paid</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(summary.totalPaid || 0)}
          </span>
        </div>

        {/* Last Invoice */}
        {summary.lastInvoice && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Invoice
            </p>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {summary.lastInvoice.invoiceNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Due: {new Date(summary.lastInvoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(summary.lastInvoice.amount)}
                </p>
                <Badge className={getStatusColor(summary.lastInvoice.status)}>
                  {summary.lastInvoice.status?.toLowerCase() || 'unknown'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4">
          <Button 
            className="w-full"
            onClick={() => router.push('/subscription')}
          >
            Manage Subscription
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push('/billing')}
          >
            View All Invoices
          </Button>
          {isActive && (
            <Button 
              variant="outline" 
              className="w-full border-secondary-300 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-900/20"
              onClick={() => {
                if (onUpgrade) onUpgrade();
                else router.push('/subscription');
              }}
            >
              Upgrade Plan
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}


// // src/components/dashboard/BillingOverview.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { 
//   CreditCard, 
//   Calendar, 
//   CheckCircle,
//   AlertCircle
// } from 'lucide-react';
// import { Badge } from '../../ui/Badge';
// import { Button } from '../../ui/Button';

// interface BillingOverviewProps {
//   summary: {
//     plan: string;
//     status: 'active' | 'inactive' | 'pending';
//     nextBillingDate: string;
//     amount: number;
//     features: string[];
//   };
// }

// export function BillingOverview({ summary }: BillingOverviewProps) {
//   const statusColors = {
//     active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
//     inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
//     pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
//     >
//       <div className="flex items-center gap-3 mb-4">
//         <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
//           <CreditCard className="h-6 w-6 text-secondary-500" />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Current Plan
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Your subscription details
//           </p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <span className="text-gray-500 dark:text-gray-400">Plan</span>
//           <span className="font-semibold text-gray-900 dark:text-white capitalize">
//             {summary.plan}
//           </span>
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="text-gray-500 dark:text-gray-400">Status</span>
//           <Badge className={statusColors[summary.status]}>
//             {summary.status}
//           </Badge>
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="text-gray-500 dark:text-gray-400">Next Billing</span>
//           <div className="flex items-center gap-2">
//             <Calendar className="h-4 w-4 text-gray-400" />
//             <span className="text-gray-900 dark:text-white">
//               {new Date(summary.nextBillingDate).toLocaleDateString()}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="text-gray-500 dark:text-gray-400">Amount</span>
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             ${summary.amount.toFixed(2)}
//             <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
//               /month
//             </span>
//           </span>
//         </div>

//         <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Included Features:
//           </p>
//           <div className="space-y-1">
//             {summary.features.map((feature) => (
//               <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                 <CheckCircle className="h-4 w-4 text-green-500" />
//                 {feature}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex gap-3 pt-4">
//           <Button className="flex-1 btn-primary">Upgrade Plan</Button>
//           <Button variant="outline" className="flex-1">View Invoices</Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
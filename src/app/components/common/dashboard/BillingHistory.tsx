// src/components/common/dashboard/BillingHistory.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Invoice } from '@/src/types/shared.types';

interface BillingHistoryProps {
  invoices: Invoice[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

export function BillingHistory({ invoices, meta, onPageChange }: BillingHistoryProps) {
  const [page, setPage] = useState(meta?.page || 1);
  const itemsPerPage = meta?.limit || 10;
  const totalPages = meta?.totalPages || Math.ceil(invoices.length / itemsPerPage);
  
  // If no invoices, show empty state
  if (!invoices || invoices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-8 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No Invoices Yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Your invoices will appear here once you make your first payment.
          </p>
        </div>
      </motion.div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Billing History
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and download your invoices
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                Invoice
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                Description
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {invoices.map((invoice) => {
              // Format invoice items as description
              const description = invoice.items && invoice.items.length > 0
                ? invoice.items.map(item => item.description).join(', ')
                : 'Invoice';

              return (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {invoice.invoiceNumber || `#INV-${invoice.id.slice(0, 8)}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {description}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status?.toLowerCase() || 'unknown'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(`/dashboard/billing/invoices/${invoice.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          // Implement download functionality
                          console.log('Download invoice:', invoice.id);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((page - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(page * itemsPerPage, meta?.total || invoices.length)} of{' '}
            {meta?.total || invoices.length} invoices
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}


// // src/components/dashboard/BillingHistory.tsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   FileText,
//   Download,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { Button } from '../../ui/Button';
// import { Badge } from '../../ui/Badge';

// interface Invoice {
//   id: string;
//   date: string;
//   amount: number;
//   status: 'paid' | 'pending' | 'failed';
//   description: string;
// }

// interface BillingHistoryProps {
//   history: Invoice[];
// }

// export function BillingHistory({ history }: BillingHistoryProps) {
//   const [page, setPage] = useState(0);
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(history.length / itemsPerPage);
//   const currentItems = history.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

//   const getStatusColor = (status: Invoice['status']) => {
//     switch (status) {
//       case 'paid':
//         return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
//       case 'failed':
//         return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800"
//     >
//       <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Billing History
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             View and download your invoices
//           </p>
//         </div>
//         <Button variant="outline" size="sm">
//           <Download className="h-4 w-4 mr-2" />
//           Export All
//         </Button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 dark:bg-gray-800/50">
//             <tr>
//               <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
//                 Invoice
//               </th>
//               <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
//                 Date
//               </th>
//               <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
//                 Description
//               </th>
//               <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
//                 Amount
//               </th>
//               <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-300">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//             {currentItems.map((invoice) => (
//               <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-2">
//                     <FileText className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium text-gray-900 dark:text-white">
//                       #INV-{invoice.id.slice(0, 8)}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                   {new Date(invoice.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                   {invoice.description}
//                 </td>
//                 <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
//                   ${invoice.amount.toFixed(2)}
//                 </td>
//                 <td className="px-4 py-3">
//                   <Badge className={getStatusColor(invoice.status)}>
//                     {invoice.status}
//                   </Badge>
//                 </td>
//                 <td className="px-4 py-3 text-right">
//                   <div className="flex items-center justify-end gap-2">
//                     <Button variant="ghost" size="sm">
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Showing {page * itemsPerPage + 1} to{' '}
//             {Math.min((page + 1) * itemsPerPage, history.length)} of{' '}
//             {history.length} invoices
//           </p>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 0}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Page {page + 1} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages - 1}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }
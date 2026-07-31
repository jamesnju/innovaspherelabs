'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  Database,
  Server,
  Shield,
  CreditCard
} from 'lucide-react';

interface Service {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  icon: string;
}

interface SystemStatusProps {
  status: {
    services: Service[];
    overall: 'operational' | 'degraded' | 'outage';
    lastUpdated: string;
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  CreditCard: <CreditCard className="h-5 w-5" />,
};

export function SystemStatus({ status }: SystemStatusProps) {
  const statusColors = {
    operational: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    degraded: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    outage: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  const statusIcons = {
    operational: CheckCircle,
    degraded: AlertCircle,
    outage: XCircle,
  };

  const OverallIcon = statusIcons[status.overall];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Status
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time service status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full ${statusColors[status.overall]}`}>
            <span className="text-sm font-medium capitalize">
              {status.overall}
            </span>
          </div>
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(status.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {status.services.map((service, index) => {
          const Icon = statusIcons[service.status];
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500 dark:text-gray-400">
                  {iconMap[service.icon] || <Server className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uptime: {service.uptime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${
                  service.status === 'operational' ? 'text-green-500' :
                  service.status === 'degraded' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className={`text-sm font-medium capitalize ${
                  service.status === 'operational' ? 'text-green-600 dark:text-green-400' :
                  service.status === 'degraded' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {service.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
// src/components/ui/Skeleton.tsx
'use client';

import { cn } from '@/src/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circle' | 'text';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-800';
  
  const variantClasses = {
    default: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}
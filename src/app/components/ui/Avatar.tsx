// src/components/ui/Avatar.tsx
'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils/cn';
import { User } from 'lucide-react';

export interface AvatarProps {
  src?: string | null;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback, size = 'md', className }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-2xl',
    };

    const getInitials = (name: string) => {
      const parts = name.split(' ');
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0',
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <Image
            src={src}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : fallback ? (
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {getInitials(fallback)}
          </span>
        ) : (
          <User className="h-1/2 w-1/2 text-gray-400" />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
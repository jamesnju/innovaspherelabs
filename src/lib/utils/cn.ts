// src/lib/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS classes using clsx and tailwind-merge
 * This utility helps manage conditional className strings
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
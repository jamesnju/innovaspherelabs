// src/lib/utils/constants.ts
/**
 * Application constants
 */
export const APP_NAME = 'Multi-SaaS Platform';
export const APP_DESCRIPTION = 'All-in-one business management solutions';

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
  KES: { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling' },
} as const;

export const PLANS = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  BUSINESS_OWNER: 'business_owner',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;

export const PRODUCT_TYPES = {
  POS: 'pos',
  ECOMMERCE: 'ecommerce',
  INVENTORY: 'inventory',
  RESTAURANT: 'restaurant',
  SCHOOL: 'school',
  CRM: 'crm',
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  MPESA: 'mpesa',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
} as const;

export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  FULL: 'EEEE, MMMM d, yyyy',
  TIME: 'h:mm a',
  DATE_TIME: 'MMM d, yyyy h:mm a',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 25, 50, 100],
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
} as const;
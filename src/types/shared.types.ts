// src/types/shared.types.ts
// This file contains only types, no server-side imports

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  client?: {
    id: string;
    name: string;
    email: string;
    subscription?: {
      id?: string;
      plan: string;
      status: string;
      startDate?: string;
      endDate?: string | null;
      autoRenew?: boolean;
      trialStart?: string | null;
      trialEnd?: string | null;
      billingCycle?: string;
      price?: string;
      currency?: string;
      features?: string[];
      metadata?: Record<string, any>;
      createdAt?: string;
      updatedAt?: string;
      deletedAt?: string | null;
    };
  };
  clientId?: string;
  companyId?: string;
  userPreferences?: {
    theme: string;
    language: string;
  };
}

export interface SubscriptionProduct {
  id: string;
  product: {
    id: string;
    name: string;
    type: string;
  };
}

export interface Subscription {
  id: string;
  plan: string;
  status: string;
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  billingCycle: string;
  price: number;
  currency: string;
  subscriptionProducts?: SubscriptionProduct[];
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  isPopular: boolean;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  paymentId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  paidAt: string | null;
  items: InvoiceItem[];
  payments: Payment[];
}

export interface BillingSummary {
  subscription: {
    id: string;
    plan: string;
    status: string;
  };
  pendingInvoices: number;
  pendingAmount: number;
  totalPaid: number;
  lastInvoice: {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: string;
    dueDate: string;
  } | null;
}

export interface DashboardStats {
  users: number;
  products: number;
  invoices: number;
  pendingAmount: number;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: User;
    client: {
      id: string;
      name: string;
      email: string;
      subscription?: any;
    };
    token: string;
  };
  error?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    client: {
      id: string;
      name: string;
      email: string;
      subscription?: any;
    };
    token: string;
  };
  error?: string;
}
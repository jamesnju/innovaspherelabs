// src/lib/services/billing.ts - Add id to subscription object
import { cache } from 'react';
import { getCurrentUser } from './auth';
import { db } from '@/src/lib/firebase/admin';

export const getBillingData = cache(async () => {
  const user = await getCurrentUser();
  const companyId = user?.companyId;

  if (!companyId) {
    return {
      subscription: {
        id: 'sub_default', // Add this
        plan: 'free',
        status: 'active' as const,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true,
        features: ['Basic POS', 'Inventory'],
        paymentMethod: {
          type: 'Card',
          last4: '4242',
          expiry: '12/25',
        },
      },
      history: [],
      summary: {
        plan: 'free',
        status: 'active' as const,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 0,
        features: ['Basic POS', 'Inventory'],
      },
    };
  }

  // Get company data
  const companyDoc = await db.collection('companies').doc(companyId).get();
  const companyData = companyDoc.data();

  // Subscription with id
  const subscription = {
    id: 'sub_' + companyId.slice(0, 8), // Add unique id
    plan: companyData?.subscription?.plan || 'free',
    status: (companyData?.subscription?.status || 'active') as 'active' | 'inactive' | 'pending',
    startDate: companyData?.createdAt || new Date().toISOString(),
    endDate: companyData?.subscription?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    features: ['POS System', 'E-commerce', 'Inventory Management', 'Offline Mode', '24/7 Support'],
    paymentMethod: {
      type: 'Card',
      last4: '4242',
      expiry: '12/25',
    },
  };

  // Mock billing history
  const history = [
    {
      id: 'inv_001',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 49.99,
      status: 'paid' as const,
      description: 'Monthly subscription - Premium Plan',
    },
    {
      id: 'inv_002',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 49.99,
      status: 'paid' as const,
      description: 'Monthly subscription - Premium Plan',
    },
  ];

  const summary = {
    plan: subscription.plan,
    status: subscription.status,
    nextBillingDate: subscription.endDate,
    amount: subscription.plan === 'premium' ? 49.99 : subscription.plan === 'basic' ? 29.99 : 0,
    features: subscription.features,
  };

  return {
    subscription,
    history,
    summary,
  };
});
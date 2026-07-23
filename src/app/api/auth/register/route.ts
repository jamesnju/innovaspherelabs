// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/src/lib/firebase/admin';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  companyName: z.string().min(2).max(100),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const usersRef = db.collection('users');
    const existingUser = await usersRef
      .where('email', '==', validatedData.email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create company
    const companyRef = db.collection('companies').doc();
    const companyData = {
      name: validatedData.companyName,
      email: validatedData.email,
      phone: validatedData.phone || '',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        features: ['pos', 'inventory'],
      },
      settings: {
        theme: 'light',
        currency: 'USD',
        timezone: 'UTC',
      },
    };
    await companyRef.set(companyData);

    // Create user
    const userRef = db.collection('users').doc();
    const userData = {
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: 'business_owner',
      companyId: companyRef.id,
      status: 'active',
      emailVerified: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        avatar: null,
        bio: null,
        phone: validatedData.phone || '',
      },
      preferences: {
        notifications: true,
        language: 'en',
      },
    };
    await userRef.set(userData);

    // Update company with owner reference
    await companyRef.update({
      ownerId: userRef.id,
    });

    // Create default settings for POS and Ecommerce
    await createDefaultSettings(companyRef.id);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      companyId: companyRef.id,
      userId: userRef.id,
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function createDefaultSettings(companyId: string) {
  // Create POS settings
  const posSettingsRef = db.collection('settings').doc();
  await posSettingsRef.set({
    companyId,
    type: 'pos',
    config: {
      currency: 'USD',
      taxRate: 0,
      receiptFooter: 'Thank you for your business!',
      offlineMode: true,
      autoSync: true,
      printerSettings: {
        paperSize: '80mm',
        copies: 1,
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Create Ecommerce settings
  const ecomSettingsRef = db.collection('settings').doc();
  await ecomSettingsRef.set({
    companyId,
    type: 'ecommerce',
    config: {
      storeName: '',
      storeDescription: '',
      currency: 'USD',
      taxRate: 0,
      shipping: {
        enabled: true,
        freeShippingThreshold: 100,
        rates: [],
      },
      paymentMethods: ['card', 'mpesa'],
      theme: 'default',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
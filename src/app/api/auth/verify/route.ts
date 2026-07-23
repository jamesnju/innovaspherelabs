// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth';
import { db } from '@/src/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token required' },
        { status: 400 }
      );
    }

    // Verify email
    const userRef = db.collection('users').doc(session.user.id);
    await userRef.update({
      emailVerified: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Update token
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        email: userData?.email,
        emailVerified: userData?.emailVerified,
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
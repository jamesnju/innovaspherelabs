// src/app/api/apps/upgrade/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/src/app/services/auth.server';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { appId, plan, userId } = body;

    // Validate required fields
    if (!appId || !plan) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upgrade subscription
    // const subscription = await upgradeSubscription({
    //   userId: user.id,
    //   appId,
    //   plan,
    // });

    // return NextResponse.json({
    //   success: true,
    //   subscription,
    //   message: 'Subscription upgraded successfully'
    // });

  } catch (error: any) {
    console.error('Upgrade error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/src/lib/email';
import { db } from '@/src/lib/firebase/admin';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user
    const usersRef = db.collection('users');
    const snapshot = await usersRef
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      // Return success even if user doesn't exist (security)
      return NextResponse.json({
        success: true,
        message: 'If an account exists, you will receive a password reset email',
      });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token to user document
    await userDoc.ref.update({
      resetToken,
      resetTokenExpiry: resetTokenExpiry.toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Send reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
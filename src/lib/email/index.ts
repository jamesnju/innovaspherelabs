// src/lib/email/index.ts
// Email utility functions

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

/**
 * Send email using Resend or other email service
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // For demo purposes, log the email
    console.log('Sending email:', {
      to: options.to,
      subject: options.subject,
      html: options.html.substring(0, 100) + '...',
    });

    // If you have Resend configured, use it
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const result = await resend.emails.send({
        from: options.from || process.env.EMAIL_FROM || 'noreply@yourdomain.com',
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
        cc: options.cc,
        bcc: options.bcc,
      });

      return !!result;
    }

    // Fallback to console log
    console.log('Email would be sent to:', options.to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; padding: 20px 0;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4F46E5, #F59E0B); border-radius: 12px; margin: 0 auto;"></div>
        <h1 style="color: #1A2B4A; margin-top: 20px;">Welcome to Multi-SaaS Platform</h1>
      </div>
      <div style="background: #F8FAFC; border-radius: 12px; padding: 30px; margin: 20px 0;">
        <p style="font-size: 16px; color: #334155; line-height: 1.6;">
          Hi ${name},
        </p>
        <p style="font-size: 16px; color: #334155; line-height: 1.6;">
          Thank you for joining Multi-SaaS Platform! We're excited to help you grow your business.
        </p>
        <p style="font-size: 16px; color: #334155; line-height: 1.6;">
          Here's what you can do next:
        </p>
        <ul style="font-size: 16px; color: #334155; line-height: 1.6; padding-left: 20px;">
          <li>Set up your business profile</li>
          <li>Explore our POS system</li>
          <li>Configure your e-commerce store</li>
          <li>Invite team members</li>
        </ul>
      </div>
      <div style="text-align: center; padding: 20px 0;">
        <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; padding: 12px 30px; background: #4F46E5; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 500;">
          Get Started
        </a>
      </div>
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 14px; color: #94A3B8;">
        <p>Need help? Contact us at support@yourdomain.com</p>
        <p>&copy; 2024 Multi-SaaS Platform. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Multi-SaaS Platform!',
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #1A2B4A;">Reset Your Password</h1>
      </div>
      <div style="background: #F8FAFC; border-radius: 12px; padding: 30px; margin: 20px 0;">
        <p style="font-size: 16px; color: #334155; line-height: 1.6;">
          You requested a password reset for your account.
        </p>
        <p style="font-size: 16px; color: #334155; line-height: 1.6;">
          Click the button below to reset your password. This link will expire in 1 hour.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background: #4F46E5; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 500;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #64748B; line-height: 1.6;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 14px; color: #94A3B8;">
        <p>&copy; 2024 Multi-SaaS Platform. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html,
  });
}
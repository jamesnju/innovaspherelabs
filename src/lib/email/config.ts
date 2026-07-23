// src/lib/email/config.ts
// Email configuration

export const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
  resendApiKey: process.env.RESEND_API_KEY,
  supportEmail: process.env.SUPPORT_EMAIL || 'support@yourdomain.com',
};

// Email templates
export const emailTemplates = {
  welcome: 'welcome',
  resetPassword: 'reset-password',
  verifyEmail: 'verify-email',
  subscriptionExpired: 'subscription-expired',
  subscriptionRenewed: 'subscription-renewed',
  invoice: 'invoice',
} as const;

export type EmailTemplate = typeof emailTemplates[keyof typeof emailTemplates];
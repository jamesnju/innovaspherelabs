// src/app/(auth)/login/page.tsx
import { Metadata } from 'next';
import { LoginForm } from '../../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Access Your Dashboard',
  description: 'Login to your Multi-SaaS Platform account to manage your business.',
};

export default function LoginPage() {
  return <LoginForm />;
}
// src/app/(auth)/signup/page.tsx
import { Metadata } from 'next';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up - Start Your Free Trial',
  description: 'Create your account and start managing your business with our powerful suite of tools.',
};

export default function SignupPage() {
  return <RegisterForm />;
}
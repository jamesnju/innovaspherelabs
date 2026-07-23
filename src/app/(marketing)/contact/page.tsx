// src/app/(marketing)/contact/page.tsx
import { Metadata } from 'next';
import ContactClient from '../../components/common/marketing/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Multi-SaaS Platform',
  description: 'Get in touch with our team. We\'re here to help you with any questions about our platform and services.',
};

export default function ContactPage() {
  return <ContactClient />;
}
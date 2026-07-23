// src/app/(marketing)/about/page.tsx
import { Metadata } from 'next';
import AboutClient from '../../components/common/marketing/About/AboutClient';

export const metadata: Metadata = {
  title: 'About Us - Multi-SaaS Platform',
  description: 'Learn about Multi-SaaS Platform, our mission, vision, and the team behind the all-in-one business management solution.',
};

export default function AboutPage() {
  return <AboutClient />;
}
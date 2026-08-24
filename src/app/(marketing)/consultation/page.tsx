import { Metadata } from 'next';
import ConsultationClient from '../../components/common/marketing/consultation/ConsultationClient';

export const metadata: Metadata = {
  title: 'Book a Free Consultation | Savo',
  description:
    'Book a free consultation with Savo to discuss your software idea, business challenge, website, mobile app, or custom software project.',
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
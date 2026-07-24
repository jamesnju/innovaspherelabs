// src/app/(marketing)/layout.tsx

import { MarketingLayout } from "../components/common/Layout/MarketingLayout";
import { WhatsAppButton } from "../components/common/WhatsAppButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return(
  <>
    <MarketingLayout>{children}</MarketingLayout>;
    <WhatsAppButton phoneNumber="254100992686" />

  </>);
}

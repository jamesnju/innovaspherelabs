// src/app/(marketing)/layout.tsx

import { MarketingLayout } from "../components/common/Layout/MarketingLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
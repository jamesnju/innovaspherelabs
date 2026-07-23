// src/app/(auth)/layout.tsx

import { AuthLayout } from "../components/common/Layout/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
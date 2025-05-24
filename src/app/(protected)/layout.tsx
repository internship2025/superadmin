"use client";

import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAdminAuth();

  // Если не аутентифицирован, не рендерим контент
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}

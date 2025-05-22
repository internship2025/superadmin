"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";
import { PATH } from "@/shared/constants";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(PATH.LOGIN);
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  // Показываем лоадер при первом рендере
  if (isLoading) {
    return null;
  }

  // Если не аутентифицирован, не рендерим контент
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

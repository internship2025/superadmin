"use client";

import { useEffect } from "react";
import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";
import { AdminLoginModal } from "@/features/ui/auth/ui/adminLoginModal";
import { useRouter, usePathname } from "next/navigation";
import { PATH } from "@/shared/constants";

export const AuthModalProvider = () => {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathname !== PATH.LOGIN) {
      router.replace(PATH.LOGIN);
    }
  }, [isAuthenticated, router, pathname]);

  // Показываем модалку только на странице auth и когда не авторизованы
  if (!isAuthenticated && pathname === PATH.LOGIN) {
    return <AdminLoginModal open={true} onClose={() => {}} />;
  }

  return null;
};

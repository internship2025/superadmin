"use client";

import { useEffect, useState } from "react";
import { AdminLoginModal } from "@/features/ui/auth/ui/adminLoginModal";
import { usePathname } from "next/navigation";
import { PATH } from "@/shared/constants";

export const AuthModalProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Показываем модалку только на странице логина
    setIsOpen(pathname === PATH.LOGIN);
  }, [pathname]);

  if (pathname === PATH.LOGIN) {
    return <AdminLoginModal open={isOpen} onClose={() => setIsOpen(false)} />;
  }

  return null;
};

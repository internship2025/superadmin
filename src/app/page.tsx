"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";
import { PATH } from "@/shared/constants";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(PATH.ROOT);
    } else {
      router.replace(PATH.LOGIN);
    }
  }, [isAuthenticated, router]);

  return null;
}

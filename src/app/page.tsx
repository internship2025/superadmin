"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";
import { PATH } from "@/shared/constants";
import { Spinner } from "@/shared/ui/spinner/Spinner";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(PATH.USERS_LIST);
    } else {
      router.replace(PATH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <Spinner />;
  }
}

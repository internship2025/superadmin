"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAuthenticated(!!auth);
  }, []);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push(PATH.LOGIN);
  };

  return {
    isAuthenticated,
    logout,
  };
};

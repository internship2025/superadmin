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

  const login = () => {
    localStorage.setItem("adminAuth", "true");
    setIsAuthenticated(true);
    router.push(PATH.ROOT);
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push(PATH.LOGIN);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

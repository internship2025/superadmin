"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants";
import { useForm } from "react-hook-form";
import { adminLoginSchema, AdminLoginType } from "@/features/ui/auth/ui/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginType>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  // Проверяем при монтировании
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("adminAuth") === "true");
    setIsLoading(false);
  }, []);

  const handleLogin = handleSubmit((data) => {
    if (data.email === "admin@admin.com" && data.password === "admin") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      router.push(PATH.USERS_LIST);
      return true;
    } else {
      setErrorMessage("Invalid data");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push(PATH.LOGIN);
  };

  return {
    register,
    handleLogin,
    handleSubmit,
    handleLogout,
    isAuthenticated,
    errors,
    errorMessage,
    setIsAuthenticated,
    isLoading,
  };
};

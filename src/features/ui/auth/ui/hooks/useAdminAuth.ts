"use client";

import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { LOGIN_ADMIN } from "@/shared/api/mutations";
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

  const setAuth = (auth: string) => {
    Cookies.set("auth", auth, { sameSite: "Strict" });
  };

  useEffect(() => {
    const auth = Cookies.get("auth");

    if (auth) {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginType>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  const [loginAdmin] = useMutation(LOGIN_ADMIN);

  const handleLogin = async (data: AdminLoginType) => {
    try {
      const { data: responseData } = await loginAdmin({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (responseData?.loginAdmin?.logged) {
        const auth = btoa(`${data.email}:${data.password}`);

        setAuth(auth);
        setIsAuthenticated(true);
        router.push(PATH.USERS_LIST);
      } else {
        setErrorMessage("Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleLogin,
    handleSubmit,
    isAuthenticated,
    errors,
    errorMessage,
    setIsAuthenticated,
    isLoading,
  };
};

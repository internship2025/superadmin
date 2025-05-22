import { useForm } from "react-hook-form";
import { AdminLoginType, adminLoginSchema } from "@/features/ui/auth/ui/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAdminAuth } from "./useAdminAuth";

const ADMIN_CREDENTIALS = {
  email: "admin@admin.com",
  password: "admin",
};

export const useAdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAdminAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginType>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  const handleLogin = handleSubmit((data) => {
    if (
      data.email === ADMIN_CREDENTIALS.email &&
      data.password === ADMIN_CREDENTIALS.password
    ) {
      login();
    } else {
      setErrorMessage("Invalid data");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    errorMessage,
  };
};

import { useForm } from "react-hook-form";
import { AdminLoginType, adminLoginSchema } from "@/features/ui/auth/ui/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants";

const ADMIN_CREDENTIALS = {
  email: "admin@admin.com",
  password: "admin",
};

export const useAdminLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

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
      localStorage.setItem("adminAuth", "true");
      router.push(PATH.ROOT);
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

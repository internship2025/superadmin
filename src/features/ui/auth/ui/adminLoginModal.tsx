"use client";

import React from "react";
import { Input } from "@/shared/ui/input/input";
import styles from "./adminLoginModal.module.css";
import { Button } from "@/shared/ui/button/button";
import { useAdminLogin } from "@/features/ui/auth/ui/hooks/useAdminLogin";
import { Modal } from "@/shared/ui/modal/modal";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export const AdminLoginModal = ({ open, onClose }: Props) => {
  const { register, handleLogin, errors, errorMessage } = useAdminLogin();

  return (
    <>
      <Modal title={"Sign in"} open={open} onClose={onClose}>
        <form onSubmit={handleLogin} className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <Input
              label={"Email"}
              type={"email"}
              error={errors.email?.message}
              fullWidth
              {...register("email")}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              showPassword={true}
              label={"Password"}
              type={"password"}
              error={errors.password?.message}
              fullWidth
              {...register("password")}
            />
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Modal>
    </>
  );
};

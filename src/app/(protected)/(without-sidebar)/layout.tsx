"use client";

import { useAdminAuth } from "@/features/ui/auth/ui/hooks/useAdminAuth";
import { Header } from "@/shared/ui/header/Header";
import { Sidebar } from "@/shared/ui/sidebar/Sidebar";
import styles from "./layout.module.css";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAdminAuth();

  // Если не аутентифицирован, не рендерим контент
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

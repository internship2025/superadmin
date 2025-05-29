"use client";

import { FC } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PATH } from "@/shared/constants";

interface NavItem {
  id: number;
  label: string;
  path: string;
  icon: string;
  component?: React.ReactNode;
  onClick?: () => void;
}

interface SidebarProps {
  isAuthenticated?: boolean;
}

export const Sidebar: FC<SidebarProps> = () => {
  const pathname = usePathname();

  const currentPath = pathname;

  const navItems: NavItem[] = [
    {
      id: 1,
      label: "Users list",
      path: PATH.USERS_LIST,
      icon: "/icons/users-list.svg",
    },
    {
      id: 2,
      label: "Statistics",
      path: PATH.STATISTICS,
      icon: "/icons/statistics.svg",
    },
    {
      id: 3,
      label: "Payments list",
      path: PATH.PAYMENTS_LIST,
      icon: "/icons/payments-list.svg",
    },
    {
      id: 4,
      label: "Posts list",
      path: PATH.POSTS_LIST,
      icon: "/icons/posts-list.svg",
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              {item.onClick ? (
                <button
                  className={`${styles.navLink} ${styles.navButton}`}
                  onClick={item.onClick}
                >
                  <span className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${currentPath === item.path ? styles.active : ""}`}
                  onClick={(e) => item.component && e.preventDefault()}
                >
                  <span className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                  </span>
                  {item.component || (
                    <span className={styles.label}>{item.label}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

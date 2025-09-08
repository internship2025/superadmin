import { JSX, ReactNode } from "react";
import styles from "./Typography.module.css";
import { clsx } from "clsx";

type TypographyProps = {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small" | "span";
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "error" | "warning" | "success";
  align?: "left" | "center" | "right";
};

export const Typography = ({
  variant = "p",
  children,
  className = "",
  color,
  align,
}: TypographyProps) => {
  const Tag = variant as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={clsx(
        styles.typography,
        styles[variant],
        color && styles[color],
        align && styles[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

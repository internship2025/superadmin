"use client";

import * as React from "react";
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.css";
import MoreHorizontalOutline from "@/assets/icons/components/MoreHorizontalOutline";

type DropdownMenuItemProps = {
  icon: ReactNode;
  label: string;
};

type Props = {
  className?: string;
  items: DropdownMenuItemProps[];
  onClick: (label: string) => void;
} & ComponentPropsWithoutRef<typeof DropdownMenu>;

export const Dropdown = ({ className, items, onClick }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger className={styles.trigger}>
        <MoreHorizontalOutline
          className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"end"}
        className={`${styles.content} ${className || ""}`}
      >
        {items.map((item, i) => (
          <DropdownMenuItem key={i}>
            <button
              className={styles.menuButton}
              onClick={() => onClick(item.label)}
            >
              <span className={styles.iconWrapper}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={`${styles.content} ${className || ""}`}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  {
    inset?: boolean;
  } & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={`${styles.menuItem} ${inset ? styles.menuItemInset : ""} ${className || ""}`}
    ref={ref}
    {...props}
  />
));

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

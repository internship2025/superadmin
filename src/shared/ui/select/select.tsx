"use client";
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./select.module.css";
import image2 from "../../../../public/cornerDown.svg";
import image1 from "../../../../public/cornerTop.svg";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
};

type SelectDemo = {
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  variant?: "var1" | "var2";
  className?: string;
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
};

export const SelectDemo = ({
  className,
  disabled = false,
  onValueChange,
  variant = "var1",
  options,
  placeholder = "Выберите значение",
  defaultValue,
}: SelectDemo) => {
  const [open, isOpen] = React.useState(false);

  return (
    <Select.Root
      onOpenChange={(open) => isOpen(open)}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <Select.Trigger
        style={{ marginLeft: "20px" }}
        className={`${styles.Trigger} ${open ? styles.open : ""}  ${styles[variant]} ${disabled ? styles.disabled : ""} ${className}`}
        disabled={disabled}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.Icon}>
          <Image
            src={open ? image2.src : image1.src}
            alt="Custom Icon"
            className={styles.CustomIcon}
            width={20}
            height={20}
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          sideOffset={-1}
          position="popper"
          className={styles.Content}
        >
          <Select.ScrollUpButton className={styles.ScrollButton} />
          <Select.Viewport className={styles.Viewport}>
            <Select.Group>
              {options.map((option) => (
                <Select.Item key={option.value} className={styles.Item} value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.ScrollButton} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

import { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "small" | "medium" | "large";
export type IconButtonVariant = "filled" | "outline" | "ghost";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default "filled" */
  variant?: IconButtonVariant;
  /** Size of the button. @default "medium" */
  size?: IconButtonSize;
  /** Icon element to render inside the button */
  icon: ReactNode;
  /** Label text shown below the icon */
  label?: string;
  /** Badge count shown on the top-right corner of the button */
  badge?: number;
  /** Additional CSS class names to apply to the button */
  className?: string;
}

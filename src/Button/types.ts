import { ButtonHTMLAttributes } from "react";

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  /**
   * The content to display in the button
   */
  text: string;
  /**
   * The button hierarchy
   */
  variant?: "primary" | "secondary" | "tertiary";
  /**
   * The button size
   */
  size?: "small" | "medium" | "large";
  /**
   * Custom style
   */
  className?: string;
  /**
   * Show loading state
   */
  isLoading?: boolean;
  /**
   * Disable the button
   */
  isDisabled?: boolean;
  /**
   * Show a chevron-down icon — turns the button into a menu trigger
   */
  menu?: MenuItem[];
  /**
   * Optional icon to display before the button text
   */
  leadingIcon?: React.ReactNode;
  /**
   * Optional icon to display after the button text
   */
  trailingIcon?: React.ReactNode;
}

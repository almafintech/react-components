import { ButtonProps as NextUIButtonProps } from "@nextui-org/button";

export interface ButtonProps
  extends Omit<NextUIButtonProps, "variant" | "color" | "size"> {
  /**
   * The content to display in the button
   */
  text: string;
  /**
   * The button appearance style
   */
  variant?: "primary" | "secondary" | "tertiary";
  /**
   * The button size
   */
  size?: "desktop" | "mobile";
  /**
   * Custom style
   */
  className?: string;
}

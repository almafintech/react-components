import { ButtonProps as HeroUIButtonProps } from "@heroui/button";
import { WithTheme } from "..";

export interface ButtonProps
  extends Omit<HeroUIButtonProps, "variant" | "color" | "size">,
    WithTheme {
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

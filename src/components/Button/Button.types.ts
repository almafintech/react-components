import { ButtonProps as NextUIButtonProps } from "@nextui-org/button";

export interface ButtonProps
  extends Omit<NextUIButtonProps, "variant" | "color" | "size"> {
  text: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "desktop" | "mobile";
  className?: string;
}

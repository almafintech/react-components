import { WithTheme } from "..";

export interface MessageProps extends WithTheme {
  message: string;
  className?: string;
  variant: "error" | "success" | "info";
}

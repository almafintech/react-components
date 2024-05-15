import { ButtonProps } from "@nextui-org/button";
import { ReactElement } from "react";

export interface RoundedButtonProps
  extends Pick<ButtonProps, "isDisabled" | "onClick"> {
  /**
   *  The icon of the RoundedButton
   */
  icon:
    | "share"
    | "download"
    | "whatsapp"
    | "email"
    | "edit"
    | "trash"
    | "pause"
    | "play"
    | "nominal-rate"
    | ReactElement;
  /**
   *  To style RoundedButton background
   */
  buttonType: "squared" | "rounded" | "rectangular" | "empty";
  /**
   *  To add custom style to RoundedButton
   */
  className?: string;
}

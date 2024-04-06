import { ButtonProps } from "@nextui-org/button";
import { ReactElement } from "react";

export interface RoundedButtonProps
  extends Pick<ButtonProps, "isDisabled" | "onClick"> {
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
  buttonType: "squared" | "rounded" | "rectangular" | "empty";
  className?: string;
}

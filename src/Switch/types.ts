import { SwitchProps as NextUiSwitchProps } from "@nextui-org/switch";
import { WithTheme } from "..";

export interface SwitchProps extends NextUiSwitchProps, WithTheme {
  isLoading?: boolean;
}

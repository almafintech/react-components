import { SwitchProps as HeroUISwitchProps } from "@heroui/switch";
import { WithTheme } from "..";

export interface SwitchProps extends HeroUISwitchProps, WithTheme {
  isLoading?: boolean;
}

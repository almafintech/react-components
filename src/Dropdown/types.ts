import {
  DropdownProps as HeroUIDropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
} from "@heroui/dropdown";
import { WithTheme } from "..";

export type DropdownOption = {
  key: string;
  label: string;
  action: () => void;
};

export type DropdownProps = Pick<
  DropdownMenuProps<DropdownOption>,
  | "items"
  | "selectionMode"
  | "onSelectionChange"
  | "selectedKeys"
  | "disallowEmptySelection"
> &
  Omit<HeroUIDropdownProps, "children"> &
  DropdownTriggerProps &
  WithTheme;

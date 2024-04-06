import {
  DropdownProps as NextUIDropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
} from "@nextui-org/dropdown";

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
  Omit<NextUIDropdownProps, "children"> &
  DropdownTriggerProps;

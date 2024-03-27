import {
  Dropdown as NextUiDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
} from "@nextui-org/dropdown";
import styles from "./Dropdown.module.scss";

type DropdownOption = {
  key: string;
  label: string;
  action: () => void;
};

type Props = Pick<
  DropdownMenuProps<DropdownOption>,
  | "items"
  | "selectionMode"
  | "onSelectionChange"
  | "selectedKeys"
  | "disallowEmptySelection"
> &
  Omit<DropdownProps, "children"> &
  DropdownTriggerProps;

const Dropdown = ({
  items,
  selectionMode = "single",
  onSelectionChange,
  selectedKeys,
  children,
  disallowEmptySelection = false,
  ...rest
}: Props) => {
  const { dropdownContent, dropdownMenuBase, dropdownMenuList, dropdownItem } =
    styles;

  return (
    <NextUiDropdown
      {...rest}
      classNames={{
        content: dropdownContent,
      }}
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        aria-label="dropdown-menu"
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        selectionMode={selectionMode}
        items={items}
        closeOnSelect={selectionMode !== "multiple"}
        hideSelectedIcon
        disallowEmptySelection={disallowEmptySelection}
        classNames={{
          base: dropdownMenuBase,
          list: dropdownMenuList,
        }}
        itemClasses={{ base: `${dropdownItem}` }}
        onAction={(key) => {
          items &&
            Array.from(items)
              ?.find((i: DropdownOption) => i.key === key)
              ?.action();
        }}
      >
        {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </NextUiDropdown>
  );
};

export default Dropdown;

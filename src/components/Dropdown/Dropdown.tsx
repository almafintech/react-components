import {
  Dropdown as NextUiDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { DropdownProps, DropdownOption } from "./types";
import styles from "./Dropdown.module.scss";

const Dropdown = ({
  items,
  selectionMode = "single",
  onSelectionChange,
  selectedKeys,
  children,
  disallowEmptySelection = false,
  ...rest
}: DropdownProps) => {
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

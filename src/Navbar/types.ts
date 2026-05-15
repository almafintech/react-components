import { ReactNode } from "react";

export interface NavbarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  disabled?: boolean;
}

export interface NavbarProps {
  items: NavbarItem[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  className?: string;
  ariaLabel?: string;
}

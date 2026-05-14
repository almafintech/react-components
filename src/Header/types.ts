import { ReactNode } from "react";

export interface HeaderUserDropdownItem {
  /**
   * Unique key for the item
   */
  key: string;
  /**
   * Label shown for the item
   */
  label: string;
  /**
   * Optional leading icon
   */
  icon?: ReactNode;
  /**
   * Click handler
   */
  onClick: () => void;
}

export interface HeaderProps {
  /**
   * Logo element shown on the left of the header
   */
  logo?: ReactNode;
  /**
   * Full name of the logged-in user (e.g., "Nombre Apellido")
   */
  userName: string;
  /**
   * Initials shown inside the avatar (e.g., "NA")
   */
  userInitials: string;
  /**
   * Show the tag next to the user info
   */
  hasTag?: boolean;
  /**
   * Tag label (only used when hasTag is true)
   */
  tagLabel?: string;
  /**
   * Show the user dropdown trigger (avatar + name + chevron)
   */
  showDropdown?: boolean;
  /**
   * Items shown in the user dropdown menu
   */
  dropdownItems?: HeaderUserDropdownItem[];
  /**
   * Custom container class
   */
  className?: string;
}

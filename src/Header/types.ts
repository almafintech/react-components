import { ReactNode } from "react";
import { DropdownProps } from "../Dropdown";

export interface HeaderProps {
  /**
   * Logo element shown on the left of the header
   */
  logo?: ReactNode;
  /**
   * First name of the logged-in user (e.g., "Nombre"). The first letter is
   * used as the first character of the avatar initials.
   */
  name: string;
  /**
   * Last name of the logged-in user (e.g., "Apellido"). The first letter is
   * used as the second character of the avatar initials.
   */
  lastName: string;
  /**
   * Free-form content rendered between the logo and the user info — e.g. a
   * status tag, a notifications bell, or any custom node.
   */
  children?: ReactNode;
  /**
   * Dropdown configuration for the user menu. When omitted, the user info is
   * rendered as a static block without a trigger.
   */
  dropdown?: DropdownProps;
  /**
   * Custom container class
   */
  className?: string;
}

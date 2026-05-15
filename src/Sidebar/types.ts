import { ReactNode } from "react";

export type SidebarDevice = "desktop" | "mobile";

export interface SidebarMenuItem {
  /**
   * Unique React key for the menu item.
   */
  key: string;
  /**
   * Visible label.
   */
  label: string;
  /**
   * Optional leading icon.
   */
  icon?: ReactNode;
  /**
   * Click handler.
   */
  onClick?: () => void;
}

export interface SidebarUser {
  /**
   * Full name shown on the top row (e.g. "Nombre Apellido (PF)").
   */
  name: string;
  /**
   * Email shown under the name.
   */
  email: string;
  /**
   * Leading icon — typically an avatar or user-type glyph.
   */
  icon?: ReactNode;
  /**
   * Menu items shown when the row is clicked. The mobile click is a
   * placeholder for a future bottomsheet. When omitted the row is rendered
   * as a static block (no chevron).
   */
  menu?: SidebarMenuItem[];
}

export interface SidebarAccount {
  /**
   * Account display label (e.g. "Cuenta (ej Almarena SA)").
   */
  label: string;
  /**
   * Menu items shown when the account button is clicked.
   */
  menu?: SidebarMenuItem[];
}

export interface SidebarBanner {
  /**
   * Unique React key for the banner.
   */
  key: string;
  /**
   * Background image URL.
   */
  image?: string;
  /**
   * Optional overlay text shown centered on the banner.
   */
  label?: string;
  /**
   * Click handler. When omitted the banner is rendered as a static block.
   */
  onClick?: () => void;
}

export interface SidebarItem {
  /**
   * Unique React key for the item.
   */
  key: string;
  /**
   * Visible label.
   */
  label: string;
  /**
   * Leading icon.
   */
  icon?: ReactNode;
  /**
   * Marks the item as initially active. The Sidebar tracks the active item
   * internally after the first click — pass this on at most one leaf item
   * to set the starting selection.
   */
  isActive?: boolean;
  /**
   * Click handler. Ignored when `children` is non-empty — in that case the
   * click toggles the accordion instead.
   */
  onClick?: () => void;
  /**
   * Nested items. When present, the item expands to show children inline.
   */
  children?: SidebarItem[];
}

export interface SidebarFooter {
  /**
   * Footer title (e.g. "Accedé al mercado").
   */
  title: string;
  /**
   * Optional subtitle shown under the title (e.g. "Ir a Allaria").
   */
  subtitle?: string;
  /**
   * Leading image or icon (e.g. brand glyph).
   */
  icon?: ReactNode;
  /**
   * Trailing icon. Defaults to an arrow indicating an outbound action.
   */
  trailingIcon?: ReactNode;
  /**
   * Click handler. When omitted the footer renders as a static block.
   */
  onClick?: () => void;
}

export interface SidebarProps {
  /**
   * Layout variant. Drives which subsections render and how they scroll.
   * @default "desktop"
   */
  device?: SidebarDevice;
  /**
   * Title shown in the top row (desktop only).
   * @default "Menú"
   */
  title?: string;
  /**
   * User shown on the top row. Mobile only — ignored on desktop.
   */
  user?: SidebarUser;
  /**
   * Account selector. Mobile only — ignored on desktop.
   */
  account?: SidebarAccount;
  /**
   * Banners shown above the navigation list. Mobile only — ignored on desktop.
   * On mobile they stack vertically and don't scroll; the item list is the
   * scrollable region.
   */
  banners?: SidebarBanner[];
  /**
   * Navigation items.
   */
  items: SidebarItem[];
  /**
   * Optional footer card pinned to the bottom of the sidebar.
   */
  footer?: SidebarFooter;
  /**
   * Initial collapsed state on desktop. Ignored on mobile.
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * Notified whenever the collapsed state changes (desktop only).
   */
  onCollapseChange?: (collapsed: boolean) => void;
  /**
   * Notified whenever the active item changes. Receives the newly active
   * item's `key` — useful for syncing with router state.
   */
  onActiveChange?: (key: string) => void;
  /**
   * Custom container class.
   */
  className?: string;
}
